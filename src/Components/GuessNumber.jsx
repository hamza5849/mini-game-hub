// GuessNumber.jsx
// A robust Guess-the-number game with limited attempts and progress bar.
// This file replaces the older NumberGuessingGame to match App.jsx import.
import React, { useState, useEffect } from "react";

function GuessNumber({ onBack, theme }) {
  // generate a number on mount & when restarting
  const generate = () => Math.floor(Math.random() * 100) + 1;
  const [number, setNumber] = useState(generate);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100!");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const maxAttempts = 10;

  // when user submits a guess
  const handleGuess = () => {
    if (gameOver) return;
    if (guess.trim() === "") {
      setMessage("⚠️ Please enter a number!");
      return;
    }
    const num = parseInt(guess, 10);
    if (isNaN(num)) {
      setMessage("⚠️ That's not a valid number.");
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (num === number) {
      setMessage(`🎉 Correct! The number was ${number}.`);
      setGameOver(true);
    } else if (nextAttempts >= maxAttempts) {
      setMessage(`💀 You lost! The number was ${number}.`);
      setGameOver(true);
    } else if (num < number) {
      setMessage("📉 Too low! Try again.");
    } else {
      setMessage("📈 Too high! Try again.");
    }
    setGuess("");
  };

  // Restart without full reload
  const handleRestart = () => {
    setNumber(generate());
    setGuess("");
    setMessage("Guess a number between 1 and 100!");
    setAttempts(0);
    setGameOver(false);
  };

  const progress = Math.max(0, ((maxAttempts - attempts) / maxAttempts) * 100);

  // allow enter key to submit
  useEffect(() => {
    const handler = (e) => { if (e.key === "Enter") handleGuess(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [guess, attempts, number, gameOver]);

  return (
    <div className="container text-center mt-4">
      <h2>🎯 Guess the Number</h2>
      <p className="mb-2">Try to guess the number between 1 and 100!</p>

      <div className="progress mb-2" style={{ height: 12 }}>
        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <p>Attempts left: <strong>{maxAttempts - attempts}</strong></p>

      <div className="d-flex justify-content-center gap-2 mb-3">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="form-control w-50"
          placeholder="Enter your guess"
          disabled={gameOver}
        />
        <button className="btn btn-primary" onClick={handleGuess} disabled={gameOver}>Submit</button>
      </div>

      <p className={`fw-bold ${gameOver ? "text-danger" : ""}`}>{message}</p>

      <div className="d-flex justify-content-center gap-2 mt-3">
        <button className="btn btn-success" onClick={handleRestart}>🔄 Restart</button>
        <button className="btn btn-secondary" onClick={onBack}>⬅ Back</button>
      </div>
    </div>
  );
}

export default GuessNumber;
