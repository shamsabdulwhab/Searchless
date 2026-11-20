import { useEffect, useRef } from "react";
import { Cover } from "./Cover";

export function DetailPanel({ card, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.body.classList.add("detail-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("detail-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Cover id={card.id} image={card.image} />
        <div className="dialog-body">
          <div className="card-heading">
            <h2 id="detail-title">{card.title}</h2>
            <p className="card-type">
              {card.type}
              {card.sample ? " · Sample" : ""}
            </p>
          </div>
          <p className="detail-copy">{card.detail}</p>
          {(card.when || card.where) && (
            <dl className="facts">
              {card.when && (
                <>
                  <dt>When</dt>
                  <dd>{card.when}</dd>
                </>
              )}
              {card.where && (
                <>
                  <dt>Where</dt>
                  <dd>{card.where}</dd>
                </>
              )}
            </dl>
          )}
          <p className="because">{card.because}</p>
          {card.sample && (
            <p className="notice">
              Sample content for this prototype. It is not a confirmed current listing.
            </p>
          )}
          {card.facet && (
            <p className="notice">
              Part of a real library offering, shown here so it can be explored. It is not its own event.
            </p>
          )}
          <button ref={closeRef} type="button" className="text-link" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
