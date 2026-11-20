import { Cover } from "./Cover";

function Face({ card }) {
  return (
    <>
      <Cover id={card.id} image={card.image} />
      <div className="card-copy">
        <div className="card-heading">
          <h3>{card.title}</h3>
          <p className="card-type">
            {card.type}
            {card.sample ? " · Sample" : ""}
          </p>
        </div>
        <p className="card-teaser">{card.teaser}</p>
      </div>
    </>
  );
}

export function Card({ card, selected, canBranch, onChoose, onDetails }) {

  return (
    <article
      className={`card${selected ? " is-selected" : ""}`}
      data-card-id={card.id}
    >
      {canBranch ? (
        <button
          type="button"
          className="card-open"
          aria-expanded={selected}
          onClick={() => onChoose(card)}
        >
          <Face card={card} />
        </button>
      ) : (
        <div className="card-open is-static">
          <Face card={card} />
        </div>
      )}
      <div className="card-action">
        <button type="button" className="text-link" onClick={() => onDetails(card)}>
          See More
        </button>
      </div>
    </article>
  );
}
