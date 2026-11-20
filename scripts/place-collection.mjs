import { writeFile } from "node:fs/promises";
import { pictures } from "../src/collection/pictures.js";

function shortTitle(title) {
  const english = title.match(/label QS:Len,"([^"]+)"/);
  if (english) return english[1].trim();
  const named = title.match(/title QS:P1476,[a-z-]+:"([^"]+)"/i);
  if (named) return named[1].trim();
  return title
    .split(" label QS:")[0]
    .replace(/^(Dutch|French|German|English|Spanish):\s*/i, "")
    .replace(/, Bestanddeelnr.*/i, "")
    .trim();
}

function artistName(artist) {
  return artist.replace(/Unknown author/g, "").replace(/\s+/g, " ").trim() || "Unknown";
}

function overlaps(a, b, gap) {
  return !(
    a.x + a.w + gap <= b.x ||
    b.x + b.w + gap <= a.x ||
    a.y + a.h + gap <= b.y ||
    b.y + b.h + gap <= a.y
  );
}

const drop = /foto van|reproducties van|bestanddeelnr|devant |und hodler/i;
const kept = pictures.filter((item) => !drop.test(item.title));
const labels = [
  { id: "quiet", lines: ["Quiet", "rooms"], x: -430, y: -80, w: 230, h: 110 },
  { id: "colour", lines: ["Colour", "and light"], x: 560, y: -520, w: 250, h: 110 },
  { id: "told", lines: ["Told", "slowly"], x: 620, y: 40, w: 210, h: 110 },
  { id: "paper", lines: ["Paper", "and paint"], x: -40, y: 430, w: 240, h: 110 },
  { id: "faces", lines: ["Small", "faces"], x: -980, y: 280, w: 210, h: 110 },
];
const points = [];
for (let row = 0; row < 10; row += 1) {
  for (let col = 0; col < 14; col += 1) {
    const x = -1180 + col * 172 + ((row * 19 + col * 7) % 46) - 18;
    const y = -760 + row * 150 + ((col * 11 + row * 5) % 40) - 16;
    const probe = { x, y, w: 90, h: 76 };
    if (labels.some((label) => overlaps(probe, label, 22))) continue;
    points.push({ x, y });
  }
}

const placed = [];
let misses = 0;
kept.forEach((item, index) => {
  const aspect = item.w / item.h || 1;
  const edge = index % 9 === 0 ? 150 : 74 + ((index * 29) % 6) * 12;
  let w;
  let h;
  if (aspect >= 1) {
    w = Math.round(edge * Math.min(aspect, 1.4));
    h = edge;
  } else {
    w = Math.round(edge * Math.max(aspect, 0.7));
    h = edge;
  }
  w = Math.max(64, Math.min(w, 176));
  h = Math.max(60, Math.min(h, 176));
  let chosen = null;
  for (let i = 0; i < points.length; i += 1) {
    const rect = { x: points[i].x, y: points[i].y, w, h };
    if (placed.some((other) => overlaps(rect, other, 16))) continue;
    if (labels.some((label) => overlaps(rect, label, 18))) continue;
    chosen = rect;
    points.splice(i, 1);
    break;
  }
  if (!chosen) {
    misses += 1;
    return;
  }
  placed.push({
    id: item.id,
    src: item.src,
    title: shortTitle(item.title),
    artist: artistName(item.artist),
    license: item.license,
    page: item.page,
    ...chosen,
  });
});

let pairs = 0;
for (let i = 0; i < placed.length; i += 1) {
  for (let j = i + 1; j < placed.length; j += 1) {
    if (overlaps(placed[i], placed[j], 8)) pairs += 1;
  }
}

const body = `export const pictures = ${JSON.stringify(placed, null, 2)};\n\nexport const labels = ${JSON.stringify(
  labels.map(({ w, h, ...label }) => label),
  null,
  2
)};\n`;
await writeFile(new URL("../src/collection/pictures.js", import.meta.url), body);
console.log("kept", placed.length, "dropped", pictures.length - kept.length, "misses", misses, "overlaps", pairs);
