// NumberGuessingGame.jsx
import React, { useState } from "react";

function NumberGuessingGame({ onBack }) {
  const generateNumber = () => Math.floor(Math.random() * 100) + 1;

  const [target, setTarget] = useState(generateNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const checkGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage("⚠️ Please enter a valid number.");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (num === target) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
    } else if (num < target) {
      setMessage("📉 Too low! Try again.");
    } else {
      setMessage("📈 Too high! Try again.");
    }

    setGuess("");
  };

  const resetGame = () => {
    setTarget(generateNumber());
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <div className="container text-center mt-4">
      <h2> Number Guessing Game</h2>
      <p>Guess a number between 1 and 100!</p>

      <div className="row justify-content-center mb-3">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 d-flex gap-2">
          <input
            type="number"
            className="form-control"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
          />
          <button className="btn btn-primary flex-shrink-0" onClick={checkGuess}>
            Guess
          </button>
        </div>
      </div>

      <p className={`fw-bold ${message.includes("Correct") ? "text-success" : "text-danger"}`}>
        {message}
      </p>

      <p>Attempts: <strong>{attempts}</strong></p>

      <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
        <button className="btn btn-success" onClick={resetGame}>
          🔄 Restart
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default NumberGuessingGame;
