import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const headers = {
  "User-Agent": "SearchlessLibrary/1.0 (educational prototype; local)",
  Accept: "application/json",
};
const queries = ["street festival crowd dancing", "farmers market people", "outdoor concert audience picnic"];
const root = path.resolve("public/images/community");
const dataPath = path.resolve("src/collection/community.js");

function allowedLicense(name) {
  const text = (name || "").toLowerCase();
  if (!text) return false;
  if (/non-commercial|\bnc\b|all rights reserved|copyrighted/.test(text)) return false;
  return /public domain|cc0|cc by|no restrictions|pd-/.test(text);
}
function clean(value) {
  return String(value || "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
function keep(title) {
  const text = title.toLowerCase();
  if (/uscis|funeral|army|navy|nsa |soldier|rifle|weapon|police|garrison|military/.test(text)) return false;
  return /festival|market|concert|crowd|picnic|dance|audience|people|street/.test(text);
}

const current = await readFile(dataPath, "utf8");
const seen = new Set([...current.matchAll(/File:([^"\\]+)/g)].map((match) => decodeURIComponent(match[1])));
let index = 18;
const saved = [];
for (const query of queries) {
  if (saved.length >= 8) break;
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    continue;
  }
  const data = await response.json();
  for (const page of Object.values(data.query?.pages || {})) {
    if (saved.length >= 8) break;
    const info = page.imageinfo?.[0];
    const file = page.title.replace(/^File:/, "");
    if (!info?.thumburl || !/^image\/jpe?g$/.test(info.mime || "")) continue;
    if (seen.has(file) || !keep(file)) continue;
    const license = clean(info.extmetadata?.LicenseShortName?.value);
    if (!allowedLicense(license)) continue;
    seen.add(file);
    const image = await fetch(info.thumburl, { headers });
    if (!image.ok) continue;
    const bytes = Buffer.from(await image.arrayBuffer());
    if (bytes[0] !== 0xff || bytes.length < 14000) continue;
    index += 1;
    const id = `community-${String(index).padStart(2, "0")}`;
    await writeFile(path.join(root, `${id}.jpg`), bytes);
    saved.push({
      id,
      src: `/images/community/${id}.jpg`,
      title: file.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " ").slice(0, 90),
      artist: clean(info.extmetadata?.Artist?.value) || "Unknown",
      license,
      page: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
    });
    process.stdout.write(".");
  }
  console.log("\n", query, saved.length);
  await new Promise((resolve) => setTimeout(resolve, 800));
}
if (saved.length) {
  const insert = JSON.stringify(saved, null, 2).replace(/^\[/, "").replace(/\]$/, "");
  await writeFile(dataPath, current.replace(/\n\];\s*$/, `,\n${insert}];\n`));
}
console.log("added", saved.length);
