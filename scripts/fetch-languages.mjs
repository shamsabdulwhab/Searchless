import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/images/languages");
const headers = {
  "User-Agent": "SearchlessLibrary/1.0 (educational prototype; local)",
  Accept: "application/json",
};

const queries = [
  "language class students",
  "foreign language lesson",
  "language school classroom",
  "dictionary open book",
  "bilingual children books",
  "calligraphy writing",
  "arabic calligraphy",
  "chinese calligraphy brush",
  "japanese calligraphy",
  "alphabet letters wooden",
  "people speaking conversation",
  "sign language hands",
  "library foreign books",
  "reading together books",
  "translation dictionary",
  "hebrew letters manuscript",
  "korean hangul",
  "language exchange meetup",
];

function allowedLicense(name) {
  const text = (name || "").toLowerCase();
  if (!text) return false;
  if (/non-commercial|\bnc\b|no derivatives|\bnd\b|all rights reserved|copyrighted/.test(text)) return false;
  return /public domain|cc0|cc by|no restrictions|pd-/.test(text);
}

function clean(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function relevant(title) {
  const text = title.toLowerCase();
  if (/railway|locomotive|viaduct|gwr |renfe|hst |aircraft|warship|painting by|van gogh|monet|cezanne/.test(text)) return false;
  return /language|lingu|dictionary|calligraphy|alphabet|bilingual|conversation|translat|hangul|hebrew|arabic|chinese|japanese|korean|letter|script|reading|bookshelf|books|sign language|lesson|classroom|school/.test(text);
}

async function search(query) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrsearch", query);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "12");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime|size|extmetadata");
  url.searchParams.set("iiurlwidth", "720");
  url.searchParams.set("format", "json");
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${query} ${response.status}`);
  const data = await response.json();
  return Object.values(data.query?.pages || {});
}

const seen = new Set();
const candidates = [];
for (const query of queries) {
  try {
    const pages = await search(query);
    for (const page of pages) {
      const info = page.imageinfo?.[0];
      const title = page.title.replace(/^File:/, "");
      if (!info?.thumburl || !/^image\/(jpeg|png)$/.test(info.mime || "")) continue;
      if ((info.thumbwidth || 0) < 360 || (info.thumbheight || 0) < 240) continue;
      if (!relevant(title)) continue;
      const license = clean(info.extmetadata?.LicenseShortName?.value);
      if (!allowedLicense(license)) continue;
      if (seen.has(title)) continue;
      seen.add(title);
      const objectName = clean(info.extmetadata?.ObjectName?.value);
      candidates.push({
        title: (objectName && !/label QS:/.test(objectName) ? objectName : title.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ")).slice(0, 90),
        artist: clean(info.extmetadata?.Artist?.value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "Unknown",
        license,
        thumburl: info.thumburl,
        page: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title)}`,
      });
    }
    console.log(query, candidates.length);
  } catch (error) {
    console.log("skip", query, error.message);
  }
  await new Promise((resolve) => setTimeout(resolve, 350));
}

await mkdir(root, { recursive: true });
await mkdir(path.resolve("src/collection"), { recursive: true });
const saved = [];
for (const item of candidates.slice(0, 32)) {
  const id = `lang-${String(saved.length + 1).padStart(2, "0")}`;
  try {
    const response = await fetch(item.thumburl, { headers });
    if (!response.ok) throw new Error(String(response.status));
    const bytes = Buffer.from(await response.arrayBuffer());
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
    const png = bytes[0] === 0x89 && bytes[1] === 0x50;
    if (!jpeg && !png) throw new Error("not an image");
    if (bytes.length < 12000) throw new Error("too small");
    const ext = jpeg ? "jpg" : "png";
    const file = `${id}.${ext}`;
    await writeFile(path.join(root, file), bytes);
    saved.push({ id, src: `/images/languages/${file}`, title: item.title, artist: item.artist, license: item.license, page: item.page });
    process.stdout.write(".");
  } catch {
    process.stdout.write("x");
  }
  await new Promise((resolve) => setTimeout(resolve, 150));
}

const body = `export const languages = ${JSON.stringify(saved, null, 2)};\n`;
await writeFile(path.resolve("src/collection/languages.js"), body);
await writeFile(
  path.join(root, "CREDITS.md"),
  saved.map((item) => `- ${item.src} — ${item.title}. ${item.artist}. ${item.license}. ${item.page}`).join("\n") + "\n"
);
console.log(`\nsaved ${saved.length}`);
