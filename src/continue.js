import { pictures } from "./collection/pictures";

/** Opening row plus 24 further rows. */
export const DISCOVERY_LEVELS = 25;

const history = pictures.map((picture) => ({
  src: picture.src,
  title: picture.title,
  artist: picture.artist,
  license: picture.license,
}));

const kinds = [
  { type: "Book", weight: 60 },
  { type: "Workshop", weight: 30 },
  { type: "Event", weight: 20 },
];

const weightTotal = kinds.reduce((sum, kind) => sum + kind.weight, 0);
const sessionSeed = (Math.random() * 0x100000000) >>> 0;

function randomFor(depth) {
  let state = (sessionSeed + depth * 0x9e3779b9) >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function pickKind(random) {
  let roll = random() * weightTotal;
  for (const kind of kinds) {
    roll -= kind.weight;
    if (roll < 0) return kind;
  }
  return kinds[0];
}

function cardsForDepth(depth, parent) {
  const random = randomFor(depth);
  return [0, 1, 2].map((index) => {
    const kind = pickKind(random);
    const picture = history[(depth * 3 + index) % history.length];
    const from = parent ? ` It follows ${parent.title}.` : "";
    return {
      id: `mix-${depth}-${index}`,
      title: picture.title,
      type: kind.type,
      sample: true,
      image: picture.src,
      teaser: `${picture.artist}. A picture from the history collection.`,
      detail: `${picture.title} by ${picture.artist}. ${picture.license}. Shown here as a sample ${kind.type.toLowerCase()} on the discovery trail.${from} It is not a confirmed listing at Bibliotheek Eindhoven.`,
      because: parent ? `Chosen after ${parent.title}.` : "Opening picture from the history collection.",
    };
  });
}

export function nextCards(card, depth) {
  if (depth >= DISCOVERY_LEVELS - 1) return null;
  return cardsForDepth(depth + 1, card);
}

export function rowsFromPath(path) {
  const rows = [];
  let cards = cardsForDepth(0, null);
  rows.push({ parent: null, cards });
  for (let depth = 0; depth < path.length; depth += 1) {
    const parent = cards.find((card) => card.id === path[depth]);
    const next = parent ? nextCards(parent, depth) : null;
    if (!next) break;
    rows.push({ parent, cards: next });
    cards = next;
  }
  return rows;
}
