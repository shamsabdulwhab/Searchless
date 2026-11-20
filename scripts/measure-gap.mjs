import { community } from "../src/collection/community.js";
import { gap } from "../src/collection/gap.js";
import { languages } from "../src/collection/languages.js";
import { pictures } from "../src/collection/pictures.js";
import { planting } from "../src/collection/planting.js";
import { fillVerticalGaps, offerings, place } from "../src/scrolling/offerings.js";

const S = { w: 300, h: 220 };
const bounds = (items) =>
  items.reduce(
    (b, it) => ({
      left: Math.min(b.left, it.x),
      top: Math.min(b.top, it.y),
      right: Math.max(b.right, it.x + (it.w || 0)),
      bottom: Math.max(b.bottom, it.y + (it.h || 0)),
    }),
    { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity }
  );
function contentEdge(items, left, right, edge) {
  const span = items.filter((card) => card.x + (card.w || 0) > left && card.x < right);
  const box = bounds(span.length ? span : items);
  return edge === "top" ? box.top : box.bottom;
}

const offerBounds = bounds(offerings);
const offerCenterY = (offerBounds.top + offerBounds.bottom) / 2;
const placedLanguages = place(
  languages.filter((i) => i.id !== "lang-10" && i.id !== "lang-13").map((i) => ({ ...i, ...S })),
  { x: -210, y: -80, w: 420, h: 160 }
);
const languageBounds = bounds(placedLanguages);
const languageShift = {
  x: offerBounds.right + 420 - languageBounds.left,
  y: offerCenterY - (languageBounds.top + languageBounds.bottom) / 2,
};
const clusteredLanguages = placedLanguages.map((i) => ({ ...i, x: i.x + languageShift.x, y: i.y + languageShift.y }));
const placedPictures = place(pictures.map((p) => ({ ...p, ...S })), { x: -230, y: -110, w: 460, h: 220 });
const pictureBounds = bounds(placedPictures);
const clusterShift = {
  x: languageBounds.right + languageShift.x + 420 - pictureBounds.left,
  y: offerCenterY - (pictureBounds.top + pictureBounds.bottom) / 2,
};
const clusteredPictures = placedPictures.map((i) => ({ ...i, x: i.x + clusterShift.x, y: i.y + clusterShift.y }));
const rowCards = [...offerings, ...clusteredLanguages, ...clusteredPictures];
const rowCenterX = (offerBounds.left + pictureBounds.right + clusterShift.x) / 2;
const placedPlanting = place(
  planting.filter((i) => i.id !== "plant-07").map((i) => ({ ...i, ...S })),
  { x: -210, y: -80, w: 420, h: 160 }
);
const plantingBounds = bounds(placedPlanting);
const plantingShiftX = rowCenterX - (plantingBounds.left + plantingBounds.right) / 2;
const plantingShiftY =
  contentEdge(rowCards, plantingBounds.left + plantingShiftX, plantingBounds.right + plantingShiftX, "top") + 120 - plantingBounds.bottom;
const clusteredPlanting = placedPlanting.map((i) => ({ ...i, x: i.x + plantingShiftX, y: i.y + plantingShiftY }));
const filled = fillVerticalGaps(clusteredPlanting, rowCards, [...clusteredPlanting, ...rowCards], gap);
console.log("placed", filled.length, "of", gap.length);
console.log(filled.map((item) => `${item.id} @ ${item.x},${item.y}`).join("\n"));
void community;
