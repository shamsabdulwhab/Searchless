import { useEffect, useRef, useState } from "react";
import { community } from "../collection/community";
import { gap } from "../collection/gap";
import { languages } from "../collection/languages";
import { pictures } from "../collection/pictures";
import { planting } from "../collection/planting";
import { fillVerticalGaps, offerings, openingFocus, place, technologyHole } from "../scrolling/offerings";
import "./FreeScrolling.css";

const PICTURE_SIZE = { w: 300, h: 220 };
const KIND_LABEL = { book: "Book", workshop: "Workshop", event: "Event" };

function hashString(value) {
  let hash = 2166136261;
  const text = String(value);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function assignContentTypes(items, cluster) {
  const count = items.length;
  if (!count) return items;
  let books = Math.round(count * 0.8);
  let workshops = Math.round(count * 0.1);
  let events = count - books - workshops;
  if (events < 0) {
    books += events;
    events = 0;
  }
  if (count >= 8 && workshops < 1) {
    workshops = 1;
    books -= 1;
  }
  if (count >= 8 && events < 1) {
    events = 1;
    books -= 1;
  }
  const seed = hashString(cluster);
  const order = items.map((item, index) => index);
  order.sort((a, b) => (hashString(items[a].id) ^ seed) - (hashString(items[b].id) ^ seed));
  const types = [...Array(books).fill("book"), ...Array(workshops).fill("workshop"), ...Array(events).fill("event")];
  const assigned = items.map((item) => ({ ...item }));
  order.forEach((index, rank) => {
    assigned[index].contentType = types[rank];
  });
  return assigned;
}

function contentEdge(items, left, right, edge) {
  const span = items.filter((card) => card.x + (card.w || 0) > left && card.x < right);
  const box = groupBounds(span.length ? span : items);
  return edge === "top" ? box.top : box.bottom;
}

function groupBounds(items) {
  return items.reduce(
    (box, item) => ({
      left: Math.min(box.left, item.x),
      top: Math.min(box.top, item.y),
      right: Math.max(box.right, item.x + (item.w || 0)),
      bottom: Math.max(box.bottom, item.y + (item.h || 0)),
    }),
    { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity }
  );
}

const historyHole = { x: -230, y: -110, w: 460, h: 220 };
const languagesHole = { x: -210, y: -80, w: 420, h: 160 };
const offerBounds = groupBounds(offerings);
const offerCenterY = (offerBounds.top + offerBounds.bottom) / 2;

const placedLanguages = place(
  languages
    .filter((item) => item.id !== "lang-10" && item.id !== "lang-13")
    .map((item) => ({ ...item, ...PICTURE_SIZE })),
  languagesHole
);
const languageBounds = groupBounds(placedLanguages);
const languageShift = {
  x: offerBounds.right + 420 - languageBounds.left,
  y: offerCenterY - (languageBounds.top + languageBounds.bottom) / 2,
};
const clusteredLanguages = placedLanguages.map((item) => ({
  ...item,
  x: item.x + languageShift.x,
  y: item.y + languageShift.y,
}));
const languagesText = {
  x: languagesHole.x + languageShift.x,
  y: languagesHole.y + languageShift.y,
  w: languagesHole.w,
  h: languagesHole.h,
};

const placedPictures = place(
  pictures.map((picture) => ({ ...picture, ...PICTURE_SIZE })),
  historyHole
);
const pictureBounds = groupBounds(placedPictures);
const clusterShift = {
  x: languageBounds.right + languageShift.x + 420 - pictureBounds.left,
  y: offerCenterY - (pictureBounds.top + pictureBounds.bottom) / 2,
};
const clusteredPictures = placedPictures.map((picture) => ({
  ...picture,
  x: picture.x + clusterShift.x,
  y: picture.y + clusterShift.y,
}));
const historyText = {
  x: historyHole.x + clusterShift.x,
  y: historyHole.y + clusterShift.y,
  w: historyHole.w,
  h: historyHole.h,
};
function pairInGap(items, left, right) {
  const w = PICTURE_SIZE.w;
  const h = PICTURE_SIZE.h;
  return items.map((source, index) => ({
    ...source,
    w,
    h,
    x: (left + right) / 2 - w / 2,
    y: offerCenterY - h - 18 + index * (h + 36),
  }));
}

const betweenImages = [
  ...pairInGap(
    [
      {
        id: "bridge-tech-1",
        src: "/images/collection/c002.jpg",
        title: "A drawing after Van Gogh",
        artist: "Willem van de Poll",
        license: "CC0",
      },
      {
        id: "bridge-tech-2",
        src: "/images/collection/c003.jpg",
        title: "Reproductions of Van Gogh drawings",
        artist: "Willem van de Poll",
        license: "CC0",
      },
    ],
    offerBounds.right,
    languageBounds.left + languageShift.x
  ),
  ...pairInGap(
    ["lang-10", "lang-13"].map((id) => languages.find((item) => item.id === id)),
    languageBounds.right + languageShift.x,
    pictureBounds.left + clusterShift.x
  ),
];

const plantingHole = { x: -210, y: -80, w: 420, h: 160 };
const placedPlanting = place(
  planting.filter((item) => item.id !== "plant-07").map((item) => ({ ...item, ...PICTURE_SIZE })),
  plantingHole
);
const plantingBounds = groupBounds(placedPlanting);
const rowCards = [...offerings, ...clusteredLanguages, ...clusteredPictures];
const rowCenterX = (offerBounds.left + pictureBounds.right + clusterShift.x) / 2;
const plantingShiftX = rowCenterX - (plantingBounds.left + plantingBounds.right) / 2;
const plantingShift = {
  x: plantingShiftX,
  y: contentEdge(rowCards, plantingBounds.left + plantingShiftX, plantingBounds.right + plantingShiftX, "top") + 120 - plantingBounds.bottom,
};
const clusteredPlanting = placedPlanting.map((item) => ({
  ...item,
  x: item.x + plantingShift.x,
  y: item.y + plantingShift.y,
}));
const plantingText = {
  x: plantingHole.x + plantingShift.x,
  y: plantingHole.y + plantingShift.y,
  w: plantingHole.w,
  h: plantingHole.h,
};

const communityHole = { x: -210, y: -80, w: 420, h: 160 };
const placedCommunity = place(
  community
    .filter((item) => !/uscis|funeral|army|navy|nsa |soldier|rifle|weapon|police|garrison|military/i.test(item.title))
    .map((item) => ({ ...item, ...PICTURE_SIZE })),
  communityHole
);
const communityBounds = groupBounds(placedCommunity);
const paperCard = offerings.find((card) => card.id === "exhibition");
const communityShiftX = paperCard.x + paperCard.w / 2 - (communityBounds.left + communityBounds.right) / 2;
const communityUnderCard = placedCommunity.filter(
  (item) => item.x + communityShiftX < paperCard.x + paperCard.w && item.x + communityShiftX + item.w > paperCard.x
);
const communityTop = Math.min(...communityUnderCard.map((item) => item.y));
const communityShift = {
  x: communityShiftX,
  y: paperCard.y + paperCard.h + 24 - communityTop,
};
const clusteredCommunity = placedCommunity.map((item) => ({
  ...item,
  x: item.x + communityShift.x,
  y: item.y + communityShift.y,
}));
const communityText = {
  x: communityHole.x + communityShift.x,
  y: communityHole.y + communityShift.y,
  w: communityHole.w,
  h: communityHole.h,
};
const brushCard = clusteredLanguages.find((item) => item.id === "lang-38");
const emptySpot = {
  id: "spot-1",
  src: "/images/collection/c020.jpg",
  title: "Christian Tetzen-Lund with three paintings",
  artist: "Unknown",
  license: "Public domain",
  ...PICTURE_SIZE,
  x: Math.round(brushCard.x - 80),
  y: Math.round(brushCard.y + brushCard.h + 20),
};
const emptySpot2 = {
  id: "spot-2",
  src: "/images/collection/c019.jpg",
  title: "Cézanne und Hodler",
  artist: "Fritz Burger",
  license: "Public domain",
  ...PICTURE_SIZE,
  x: Math.round(paperCard.x + paperCard.w + 80),
  y: Math.round(brushCard.y),
};
const gapPictures = fillVerticalGaps(
  clusteredPlanting,
  rowCards,
  [...clusteredPlanting, ...rowCards, ...betweenImages, plantingText, languagesText, historyText],
  gap
);
const typedOfferings = assignContentTypes(offerings, "technology");
const typedPlanting = assignContentTypes(clusteredPlanting, "planting");
const typedLanguages = assignContentTypes(clusteredLanguages, "languages");
const typedHistory = assignContentTypes(clusteredPictures, "history");
const typedCommunity = assignContentTypes(clusteredCommunity, "community");
const typedGaps = assignContentTypes(gapPictures, "nature");
const typedBridges = assignContentTypes([...betweenImages, emptySpot, emptySpot2], "bridges");

function PictureCard({ picture, note, onSelect }) {
  const kind = picture.contentType || "book";
  const label = KIND_LABEL[kind];
  return (
    <article
      className="scroll-picture"
      data-kind={kind}
      style={{ width: picture.w, height: picture.h, left: picture.x, top: picture.y }}
    >
      <button
        type="button"
        onClick={() =>
          onSelect({
            image: picture.src,
            type: label,
            title: picture.title,
            detail: `${picture.artist}. ${picture.license}. ${note}`,
            sample: true,
          })
        }
        aria-label={`${picture.title}, ${label}`}
      >
        <img src={picture.src} alt="" width={picture.w} height={picture.h} loading="lazy" decoding="async" />
        <span className="scroll-caption">
          <span className="scroll-caption-kind">{label}</span>
          {picture.title}
        </span>
      </button>
    </article>
  );
}

const MIN_SCALE = 0.18;
const MAX_SCALE = 6;
const WHEEL_ZOOM = 0.016;
const focus = openingFocus(offerings);

function clampScale(value) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

export default function FreeScrolling() {
  const stageRef = useRef(null);
  const dragRef = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, scale: 0.9 });
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const previous = document.title;
    document.title = "Searchless Library";
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const rect = stage.getBoundingClientRect();
    const start = {
      x: rect.width / 2 - focus.cx * 0.9,
      y: rect.height / 2 - focus.cy * 0.9,
      scale: 0.9,
    };
    setView(start);

    function onWheel(event) {
      event.preventDefault();
      const bounds = stage.getBoundingClientRect();
      const px = event.clientX - bounds.left;
      const py = event.clientY - bounds.top;
      if (event.ctrlKey || event.metaKey) {
        let delta = event.deltaY;
        if (event.deltaMode === 1) delta *= 100;
        else if (event.deltaMode === 2) delta *= 800;
        const factor = Math.exp(-delta * WHEEL_ZOOM);
        setView((current) => {
          const scale = clampScale(current.scale * factor);
          const ratio = scale / current.scale;
          return {
            scale,
            x: px - (px - current.x) * ratio,
            y: py - (py - current.y) * ratio,
          };
        });
        return;
      }
      setView((current) => ({
        ...current,
        x: current.x - event.deltaX,
        y: current.y - event.deltaY,
      }));
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(event) {
    if (event.button !== 0) return;
    if (event.target.closest(".scroll-card, .scroll-picture, .scroll-ui, .scroll-detail")) return;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      vx: view.x,
      vy: view.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function onPointerMove(event) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    setView((current) => ({
      ...current,
      x: drag.vx + (event.clientX - drag.x),
      y: drag.vy + (event.clientY - drag.y),
    }));
  }

  function endDrag(event) {
    if (!dragRef.current || dragRef.current.id !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
  }

  useEffect(() => {
    if (!selected) return undefined;
    function onKey(event) {
      if (event.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="free-scroll">
      <header className="scroll-ui scroll-top">
        <div>
          <p className="scroll-kicker">Searchless Library</p>
        </div>
        <nav className="scroll-nav">
          <a className="scroll-link" href="/">
            Branching Discovery
          </a>
        </nav>
      </header>

      <div
        ref={stageRef}
        className={`scroll-stage${dragging ? " is-dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="scroll-world"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          }}
        >
          <p
            className="scroll-history"
            style={{
              left: technologyHole.x,
              top: technologyHole.y,
              width: technologyHole.w,
              height: technologyHole.h,
            }}
          >
            <span>Technology</span>
          </p>
          <p
            className="scroll-history"
            style={{
              left: plantingText.x,
              top: plantingText.y,
              width: plantingText.w,
              height: plantingText.h,
            }}
          >
            <span>Planting</span>
          </p>
          <p
            className="scroll-history"
            style={{
              left: communityText.x,
              top: communityText.y,
              width: communityText.w,
              height: communityText.h,
            }}
          >
            <span>Community</span>
          </p>
          <p
            className="scroll-history"
            style={{
              left: languagesText.x,
              top: languagesText.y,
              width: languagesText.w,
              height: languagesText.h,
            }}
          >
            <span>Languages</span>
          </p>
          <p
            className="scroll-history"
            style={{ left: historyText.x, top: historyText.y, width: historyText.w, height: historyText.h }}
          >
            <span>History</span>
            Pictures from earlier centuries, gathered here to be found by looking.
          </p>
          {typedCommunity.map((picture) => (
            <PictureCard
              key={picture.id}
              picture={picture}
              note="A picture in the Community collection. It is not a confirmed community programme at Bibliotheek Eindhoven."
              onSelect={setSelected}
            />
          ))}
          {typedPlanting.map((picture) => (
            <PictureCard
              key={picture.id}
              picture={picture}
              note="A picture in the Planting collection. It is not a confirmed garden programme at Bibliotheek Eindhoven."
              onSelect={setSelected}
            />
          ))}
          {typedGaps.map((picture) => (
            <PictureCard
              key={picture.id}
              picture={picture}
              note="A picture in the open space between Planting and the collections beside it. It is not a confirmed programme at Bibliotheek Eindhoven."
              onSelect={setSelected}
            />
          ))}
          {typedBridges.map((picture) => (
            <PictureCard
              key={picture.id}
              picture={picture}
              note="A picture placed in the space between two collections."
              onSelect={setSelected}
            />
          ))}
          {typedLanguages.map((picture) => (
            <PictureCard
              key={picture.id}
              picture={picture}
              note="A picture in the Languages collection. It is not a confirmed language course at Bibliotheek Eindhoven."
              onSelect={setSelected}
            />
          ))}
          {typedHistory.map((picture) => (
            <PictureCard
              key={picture.id}
              picture={picture}
              note="A picture in the History collection. It is not a book or event at Bibliotheek Eindhoven."
              onSelect={setSelected}
            />
          ))}
          {typedOfferings.map((card, index) => (
            <article
              key={card.id}
              className="scroll-card"
              data-kind={card.contentType}
              style={{ width: card.w, height: card.h, left: card.x, top: card.y }}
            >
              <button type="button" className="scroll-card-hit" onClick={() => setSelected(card)}>
                <img
                  src={card.image}
                  alt=""
                  width={card.w}
                  height={card.h}
                  loading={index < 8 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="scroll-card-copy">
                  <p className="scroll-type">
                    {KIND_LABEL[card.contentType]}
                    {card.sample ? " · Sample" : ""}
                  </p>
                  <h2>{card.title}</h2>
                  <p className="scroll-teaser">{card.teaser}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <p className="scroll-ui scroll-hint">
        Drag to move. Scroll to travel. Ctrl and scroll to zoom.
      </p>
      <ul className="scroll-ui scroll-legend" aria-label="Content types">
        <li>
          <i data-kind="book" />
          Books
        </li>
        <li>
          <i data-kind="workshop" />
          Workshops
        </li>
        <li>
          <i data-kind="event" />
          Events & Activities
        </li>
      </ul>

      {selected && (
        <div className="scroll-detail" onClick={() => setSelected(null)}>
          <div
            className="scroll-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scroll-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selected.image} alt="" />
            <div className="scroll-sheet-body">
              <p className="scroll-type">
                {selected.contentType ? KIND_LABEL[selected.contentType] : selected.type}
                {selected.sample ? " · Sample" : ""}
              </p>
              <h2 id="scroll-detail-title">{selected.title}</h2>
              <p>{selected.detail}</p>
              {selected.sample && (
                <p className="scroll-note">Sample content. Not a confirmed current listing.</p>
              )}
              <button type="button" className="scroll-close" onClick={() => setSelected(null)}>
                Back to the space
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
