import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

function RockPaperScissors({ onBack }) {
  const choices = [
    { name: "Rock", icon: <FaHandRock size={40} /> },
    { name: "Paper", icon: <FaHandPaper size={40} /> },
    { name: "Scissors", icon: <FaHandScissors size={40} /> },
  ];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const play = (choice) => {
    const compChoice = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);

    setTimeout(() => {
      setComputerChoice(compChoice);

      if (choice.name === compChoice.name) {
        setResult("It's a Draw!");
      } else if (
        (choice.name === "Rock" && compChoice.name === "Scissors") ||
        (choice.name === "Paper" && compChoice.name === "Rock") ||
        (choice.name === "Scissors" && compChoice.name === "Paper")
      ) {
        setResult("You Win!");
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
      } else {
        setResult("You Lose!");
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
      }
    }, 500); // delay for "thinking"
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="rps-container text-center">
      <h2 className="mb-4">🎮 Rock Paper Scissors</h2>

      {/* Scoreboard */}
      <div className="scoreboard mb-4 d-flex justify-content-center gap-4">
        <div className="card p-3 shadow-sm">
          <h5>You</h5>
          <h3>{score.player}</h3>
        </div>
        <div className="card p-3 shadow-sm">
          <h5>Computer</h5>
          <h3>{score.computer}</h3>
        </div>
      </div>

      {/* Player buttons */}
      <div className="rps-buttons mb-4 d-flex justify-content-center gap-3">
        {choices.map((c) => (
          <motion.button
            key={c.name}
            className="btn btn-outline-primary rps-btn d-flex flex-column align-items-center"
            onClick={() => play(c)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {c.icon}
            <span>{c.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Result Display */}
      {playerChoice && (
        <div className="rps-results mb-4">
          <div className="d-flex justify-content-center gap-5">
            <motion.div
              className="choice-card p-3 shadow"
              animate={{ scale: playerChoice ? 1.1 : 1 }}
            >
              <h6>You</h6>
              <div>{playerChoice.icon}</div>
              <small>{playerChoice.name}</small>
            </motion.div>

            <motion.div
              className="choice-card p-3 shadow"
              animate={{ scale: computerChoice ? 1.1 : 1 }}
            >
              <h6>Computer</h6>
              <div>{computerChoice?.icon || "🤔"}</div>
              <small>{computerChoice?.name || "..."}</small>
            </motion.div>
          </div>

          <h4 className="rps-result-text mt-3">{result}</h4>
        </div>
      )}

      {/* Controls */}
      <div>
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

export default RockPaperScissors;
