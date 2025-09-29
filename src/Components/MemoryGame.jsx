// MemoryGame.jsx
// Classic memory matching game with attempts counter and reset.
import React, { useState } from "react";

// initial set of pairs
const initialCards = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓"];

// simple shuffle (ok for a small deck)
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function MemoryGame({ onBack, theme }) {
  const [cards, setCards] = useState(shuffle([...initialCards]));
  const [flipped, setFlipped] = useState([]); // indices currently flipped
  const [matched, setMatched] = useState([]); // matched indices
  const [attempts, setAttempts] = useState(0);

  const handleClick = (index) => {
    if (flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts((a) => a + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((m) => [...m, first, second]);
      }
      setTimeout(() => setFlipped([]), 750);
    }
  };

  const handleReset = () => {
    setCards(shuffle([...initialCards]));
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
  };

  return (
    <div className="container text-center mt-4">
      <h2>Memory Game</h2>
      <h5 className="mb-3">Attempts: {attempts}</h5>

      {/* Responsive grid */}
      <div className="memory-grid mx-auto d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))", maxWidth: "400px" }}>
        {cards.map((card, index) => (
          <button
            key={index}
            className={`memory-card btn ${theme === "dark" ? "btn-dark" : "btn-light"}`}
            onClick={() => handleClick(index)}
            aria-label={`card-${index}`}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "❓"}
          </button>
        ))}
      </div>

      {matched.length === cards.length && (
        <h3 className="text-success mt-3">🎉 You Win!</h3>
      )}

      <div className="mt-3 d-flex justify-content-center gap-2 flex-wrap">
        <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
        <button className="btn btn-dark" onClick={onBack}>Back to Hub</button>
      </div>
    </div>
  );
}

export default MemoryGame;
