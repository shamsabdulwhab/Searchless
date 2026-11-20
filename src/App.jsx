import { useEffect, useMemo, useState } from "react";
import { Card } from "./components/Card";
import { DetailPanel } from "./components/DetailPanel";
import { DISCOVERY_LEVELS, rowsFromPath } from "./continue";

export default function App() {
  const [path, setPath] = useState([]);
  const [detail, setDetail] = useState(null);
  const rows = useMemo(() => rowsFromPath(path), [path]);

  useEffect(() => {
    if (path.length === 0) return;
    document.getElementById("branch-latest")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [path]);

  useEffect(() => {
    if (!detail) return;
    const stillVisible = rows.some((row) => row.cards.some((card) => card.id === detail.id));
    if (!stillVisible) setDetail(null);
  }, [rows, detail]);

  function choose(card, depth) {
    if (depth >= DISCOVERY_LEVELS - 1) return;
    setPath((current) => {
      if (current[depth] === card.id) return current;
      return [...current.slice(0, depth), card.id];
    });
  }

  function goBack() {
    setPath((current) => current.slice(0, -1));
  }

  const latestParent = rows[rows.length - 1].parent;
  const status =
    rows.length === 1
      ? `Showing level 1 of ${DISCOVERY_LEVELS}.`
      : `Level ${rows.length} of ${DISCOVERY_LEVELS}, related to ${latestParent.title}.`;

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <h1>Searchless Library</h1>
            <p className="subtitle">Branching Discovery</p>
          </div>
          <button
            type="button"
            className="text-link back"
            onClick={goBack}
            disabled={path.length === 0}
          >
            Back
          </button>
        </div>
      </header>

      <main>
        <p className="lede">
          Click a card to reveal exactly three related offerings in the next row.
          The trail continues for 25 levels. Earlier rows stay on the page. Hover
          only highlights a card. See More opens details and never adds a row.
          Nothing moves until you click.
        </p>
        <p className="visually-hidden" aria-live="polite">
          {status}
        </p>

        {rows.map((row, index) => {
          const isLatest = index === rows.length - 1;
          return (
            <section
              key={row.parent ? row.parent.id : "start"}
              id={isLatest && index > 0 ? "branch-latest" : undefined}
              className={index === 0 ? "branch-row" : "branch-row row-enter"}
              aria-label={row.parent ? `Related to ${row.parent.title}` : "Starting row"}
            >
              <h2>{row.parent ? `Related to ${row.parent.title}` : "Start here"}</h2>
              <div className="card-grid">
                {row.cards.map((card) => (
                  <Card
                    key={card.id}
                    card={card}
                    selected={path[index] === card.id}
                    canBranch={index < DISCOVERY_LEVELS - 1}
                    onChoose={(chosen) => choose(chosen, index)}
                    onDetails={setDetail}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <footer>
        <p>
          Early prototype. MakersClub, MakersPlaats, CoderDojo, and DigiCafé follow
          public listings. Cards marked Sample were written for this demo and are
          not confirmed current services.
        </p>
      </footer>

      {detail && <DetailPanel card={detail} onClose={() => setDetail(null)} />}
    </>
  );
}
