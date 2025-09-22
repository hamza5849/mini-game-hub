import React, { useState } from "react";

const initialCards = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓"];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function MemoryGame({ onBack, theme }) {
  const [cards, setCards] = useState(shuffle([...initialCards]));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);

  const handleClick = (index) => {
    if (flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(attempts + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 1000); // flip back after 1s
    }
  };

  const handleReset = () => {
    setCards(shuffle([...initialCards]));
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
  };

  return (
    <div className="container text-center mt-5">
      <h2>Memory Game</h2>
      <h4>Attempts: {attempts}</h4>

      <div className="d-grid gap-2 mt-4 mx-auto" style={{ gridTemplateColumns: "repeat(4, 80px)" }}>
        {cards.map((card, index) => (
          <button
            key={index}
            className={`memory-card btn ${theme === "dark" ? "btn-dark" : "btn-light"}`}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "❓"}
          </button>
        ))}
      </div>

      {matched.length === cards.length && (
        <h3 className="text-success mt-3">You Win!</h3>
      )}

      <div className="mt-3">
        <button className="btn btn-secondary me-2" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-dark" onClick={onBack}>
          Back to Hub
        </button>
      </div>
    </div>
  );
}

export default MemoryGame;
