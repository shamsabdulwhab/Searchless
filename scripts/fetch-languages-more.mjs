import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const headers = {
  "User-Agent": "SearchlessLibrary/1.0 (educational prototype; local)",
  Accept: "application/json",
};
const queries = ["chinese calligraphy brush", "japanese calligraphy", "open dictionary pages", "wooden alphabet letters", "bilingual picture book"];
const root = path.resolve("public/images/languages");
const dataPath = path.resolve("src/collection/languages.js");

function allowedLicense(name) {
  const text = (name || "").toLowerCase();
  if (!text) return false;
  if (/non-commercial|\bnc\b|all rights reserved|copyrighted/.test(text)) return false;
  return /public domain|cc0|cc by|no restrictions|pd-/.test(text);
}
function clean(value) {
  return String(value || "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
function relevant(title) {
  return /calligraphy|dictionary|alphabet|bilingual|hangul|script|letters|book/.test(title.toLowerCase());
}

const current = await readFile(dataPath, "utf8");
const existing = new Set([...current.matchAll(/File:([^"\\]+)/g)].map((match) => decodeURIComponent(match[1])));
const saved = [];
let index = (current.match(/lang-\d+/g) || []).length;

for (const query of queries) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("generator", "search");
  url.searchParams.set("gsrsearch", query);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "8");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime|extmetadata");
  url.searchParams.set("iiurlwidth", "720");
  url.searchParams.set("format", "json");
  const response = await fetch(url, { headers });
  if (!response.ok) {
    console.log("skip", query, response.status);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    continue;
  }
  const data = await response.json();
  for (const page of Object.values(data.query?.pages || {})) {
    if (saved.length >= 12) break;
    const info = page.imageinfo?.[0];
    const file = page.title.replace(/^File:/, "");
    if (!info?.thumburl || !/^image\/jpe?g$/.test(info.mime || "")) continue;
    if (existing.has(file) || !relevant(file)) continue;
    const license = clean(info.extmetadata?.LicenseShortName?.value);
    if (!allowedLicense(license)) continue;
    existing.add(file);
    const image = await fetch(info.thumburl, { headers });
    if (!image.ok) {
      process.stdout.write("x");
      continue;
    }
    const bytes = Buffer.from(await image.arrayBuffer());
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes.length < 15000) {
      process.stdout.write("x");
      continue;
    }
    index += 1;
    const id = `lang-${String(index).padStart(2, "0")}`;
    await writeFile(path.join(root, `${id}.jpg`), bytes);
    saved.push({
      id,
      src: `/images/languages/${id}.jpg`,
      title: file.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ").slice(0, 90),
      artist: clean(info.extmetadata?.Artist?.value) || "Unknown",
      license,
      page: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
    });
    process.stdout.write(".");
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  console.log("\n", query, saved.length);
  await new Promise((resolve) => setTimeout(resolve, 800));
}

if (saved.length) {
  const insert = JSON.stringify(saved, null, 2).replace(/^\[/, "").replace(/\]$/, "");
  const next = current.replace(/\n\];\s*$/, `,\n${insert}];\n`);
  await writeFile(dataPath, next);
}
console.log("added", saved.length);
