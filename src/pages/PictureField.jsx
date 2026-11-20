import { useEffect, useRef, useState } from "react";
import { labels, pictures } from "../collection/pictures";
import "./PictureField.css";

const MIN_SCALE = 0.28;
const MAX_SCALE = 5;
const WHEEL_ZOOM = 0.016;

function clampScale(value) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

function boundsOf(items) {
  const left = Math.min(...items.map((item) => item.x));
  const top = Math.min(...items.map((item) => item.y));
  const right = Math.max(...items.map((item) => item.x + item.w));
  const bottom = Math.max(...items.map((item) => item.y + item.h));
  return { x: left - 80, y: top - 70, w: right - left + 160, h: bottom - top + 150 };
}

const field = boundsOf(pictures);

export default function PictureField() {
  const stageRef = useRef(null);
  const dragRef = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, scale: 0.55 });
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const previous = document.title;
    document.title = "Searchless Library — Picture Field";
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const rect = stage.getBoundingClientRect();
    const scale = clampScale(Math.min(rect.width / field.w, rect.height / field.h) * 0.96);
    const start = {
      scale,
      x: rect.width / 2 - (field.x + field.w / 2) * scale,
      y: rect.height / 2 - (field.y + field.h / 2) * scale,
    };
    setView(start);

    function onWheel(event) {
      event.preventDefault();
      const bounds = stage.getBoundingClientRect();
      const px = event.clientX - bounds.left;
      const py = event.clientY - bounds.top;
      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 100;
      else if (event.deltaMode === 2) delta *= 800;
      const factor = Math.exp(-delta * WHEEL_ZOOM);
      setView((current) => {
        const next = clampScale(current.scale * factor);
        const ratio = next / current.scale;
        return {
          scale: next,
          x: px - (px - current.x) * ratio,
          y: py - (py - current.y) * ratio,
        };
      });
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(event) {
    if (event.button !== 0) return;
    if (event.target.closest(".field-pic, .field-ui, .field-detail")) return;
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
    <div className="picture-field">
      <header className="field-ui field-top">
        <div>
          <p className="field-kicker">Searchless Library</p>
          <h1>Picture Field</h1>
          <p className="field-note">Public-domain pictures for looking. Not items from Bibliotheek Eindhoven.</p>
        </div>
        <nav>
          <a href="/scrolling">Free Scrolling</a>
          <a href="/">Branching Discovery</a>
        </nav>
      </header>

      <div
        ref={stageRef}
        className={`field-stage${dragging ? " is-dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="field-world"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
        >
          {labels.map((label) => (
            <p key={label.id} className="field-label" style={{ left: label.x, top: label.y }}>
              {label.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          ))}
          {pictures.map((picture, index) => (
            <article
              key={picture.id}
              className="field-pic"
              style={{ left: picture.x, top: picture.y, width: picture.w, height: picture.h }}
            >
              <button type="button" onClick={() => setSelected(picture)} aria-label={picture.title}>
                <img
                  src={picture.src}
                  alt=""
                  width={picture.w}
                  height={picture.h}
                  loading={index < 24 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="field-name">{picture.title}</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <p className="field-ui field-hint">Drag to move. Scroll to zoom.</p>

      {selected && (
        <div className="field-detail" onClick={() => setSelected(null)}>
          <div
            className="field-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="field-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selected.src} alt="" />
            <div className="field-sheet-body">
              <h2 id="field-detail-title">{selected.title}</h2>
              <p>{selected.artist}</p>
              <p className="field-license">{selected.license}. A picture for this field, not a library holding.</p>
              <button type="button" onClick={() => setSelected(null)}>
                Back to the field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
