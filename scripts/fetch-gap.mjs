import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { community } from "../src/collection/community.js";
import { languages } from "../src/collection/languages.js";
import { pictures } from "../src/collection/pictures.js";
import { planting } from "../src/collection/planting.js";

const root = path.resolve("public/images/gap");
const headers = {
  "User-Agent": "SearchlessLibrary/1.0 (educational prototype; local)",
  Accept: "application/json",
};
const queries = [
  "botanical illustration flower",
  "herbarium specimen sheet",
  "garden flower photograph",
  "children reading book outdoors",
  "botanical print rose",
  "vegetable garden illustration",
];
const used = new Set(
  [...community, ...languages, ...pictures, ...planting].map((item) => decodeURIComponent(item.page || "").toLowerCase())
);

function allowedLicense(name) {
  const text = (name || "").toLowerCase();
  if (!text) return false;
  if (/non-commercial|\bnc\b|all rights reserved|copyrighted/.test(text)) return false;
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
  if (/uscis|funeral|army|navy|soldier|rifle|weapon|military|nude|erotic/.test(text)) return false;
  return /botan|herbarium|flower|garden|rose|plant|seed|reading|book|illustration|lily|tulip|sunflower|violet/.test(text);
}

const seen = new Set();
const saved = [];
for (const query of queries) {
  if (saved.length >= 16) break;
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrsearch", `${query} filetype:bitmap`);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "12");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime|extmetadata");
  url.searchParams.set("iiurlwidth", "720");
  url.searchParams.set("format", "json");
  const response = await fetch(url, { headers });
  if (!response.ok) {
    console.log("skip", query, response.status);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    continue;
  }
  const data = await response.json();
  for (const page of Object.values(data.query?.pages || {})) {
    if (saved.length >= 16) break;
    const info = page.imageinfo?.[0];
    const file = page.title.replace(/^File:/, "");
    const pageUrl = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
    if (!info?.thumburl || !/^image\/jpe?g$/.test(info.mime || "")) continue;
    if (seen.has(file) || used.has(pageUrl.toLowerCase()) || !relevant(file)) continue;
    const license = clean(info.extmetadata?.LicenseShortName?.value);
    if (!allowedLicense(license)) continue;
    seen.add(file);
    const image = await fetch(info.thumburl, { headers });
    if (!image.ok) {
      process.stdout.write("x");
      continue;
    }
    const bytes = Buffer.from(await image.arrayBuffer());
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes.length < 14000) {
      process.stdout.write("x");
      continue;
    }
    const id = `gap-${String(saved.length + 1).padStart(2, "0")}`;
    await mkdir(root, { recursive: true });
    await writeFile(path.join(root, `${id}.jpg`), bytes);
    saved.push({
      id,
      src: `/images/gap/${id}.jpg`,
      title: file.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ").slice(0, 90),
      artist: clean(info.extmetadata?.Artist?.value).slice(0, 80) || "Unknown",
      license,
      page: pageUrl,
    });
    process.stdout.write(".");
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  console.log("\n", query, saved.length);
  await new Promise((resolve) => setTimeout(resolve, 800));
}

await mkdir(path.resolve("src/collection"), { recursive: true });
await writeFile(path.resolve("src/collection/gap.js"), `export const gap = ${JSON.stringify(saved, null, 2)};\n`);
await writeFile(
  path.join(root, "CREDITS.md"),
  saved.map((item) => `- ${item.src} — ${item.title}. ${item.artist}. ${item.license}. ${item.page}`).join("\n") + "\n"
);
console.log("saved", saved.length);
