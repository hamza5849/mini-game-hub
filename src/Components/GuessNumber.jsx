// GuessNumber.jsx
import React, { useState } from "react";
import "../App.css";


function GuessNumber({ onBack }) {
  const [number] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100!");
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(""); // for animations
  const [gameOver, setGameOver] = useState(false);

  const maxAttempts = 10;

  const handleGuess = () => {
    if (gameOver) return;

    if (!guess) {
      setMessage("⚠️ Please enter a number!");
      setStatus("error");
      return;
    }

    const num = parseInt(guess);
    setAttempts(attempts + 1);

    if (num === number) {
      setMessage(`🎉 Correct! The number was ${number}`);
      setStatus("win");
      setGameOver(true);
    } else if (attempts + 1 >= maxAttempts) {
      setMessage(`💀 You lost! The number was ${number}`);
      setStatus("lose");
      setGameOver(true);
    } else if (num < number) {
      setMessage("📉 Too low! Try again.");
      setStatus("low");
    } else {
      setMessage("📈 Too high! Try again.");
      setStatus("high");
    }
    setGuess("");
  };

  const handleRestart = () => {
    setGuess("");
    setMessage("Guess a number between 1 and 100!");
    setAttempts(0);
    setStatus("");
    setGameOver(false);
  };

  const progress = ((maxAttempts - attempts) / maxAttempts) * 100;

  return (
    <div className="game-container">
      <h2>🎯 Guess the Number</h2>
      <p>Try to guess the number between 1 and 100!</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="attempts-left">
        Attempts left: {maxAttempts - attempts}
      </p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="guess-input"
        placeholder="Enter your guess"
        disabled={gameOver}
      />
      <button onClick={handleGuess} className="btn btn-primary" disabled={gameOver}>
        Submit Guess
      </button>
      <p className={`game-message ${status}`}>{message}</p>

      {gameOver && (
        <button onClick={handleRestart} className="btn btn-success">
          🔄 Restart Game
        </button>
      )}

      <button onClick={onBack} className="btn btn-secondary mt-2">
        Back
      </button>
    </div>
  );
}

export default GuessNumber;
