import React, { useState } from "react";

function NumberGuessingGame({ onBack }) {
  const [target] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const checkGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage("Please enter a valid number.");
      return;
    }
    setAttempts(attempts + 1);

    if (num === target) {
      setMessage(`🎉 Correct! You guessed in ${attempts + 1} tries.`);
    } else if (num < target) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }
  };

  const resetGame = () => {
    window.location.reload();
  };

  return (
    <div className="guess-container text-center">
      <h2 className="mb-4">Number Guessing Game</h2>
      <p>Guess a number between 1 and 100!</p>

      <div className="input-group mb-3 guess-input">
        <input
          type="number"
          className="form-control"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button className="btn btn-primary" onClick={checkGuess}>
          Guess
        </button>
      </div>

      <p className="fw-bold">{message}</p>

      <div className="mt-3">
        <button className="btn btn-secondary me-2" onClick={resetGame}>
          Reset
        </button>
        <button className="btn btn-dark" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default NumberGuessingGame;
