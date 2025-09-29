// RockPaperScissors.jsx
// RPS game with Framer Motion animated buttons and a small scoreboard.
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

function RockPaperScissors({ onBack }) {
  // choices with icons
  const choices = [
    { name: "Rock", icon: <FaHandRock size={36} /> },
    { name: "Paper", icon: <FaHandPaper size={36} /> },
    { name: "Scissors", icon: <FaHandScissors size={36} /> },
  ];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, computer: 0 });

  // play round
  const play = (choice) => {
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    // small delay to simulate "thinking"
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
        setScore((s) => ({ ...s, player: s.player + 1 }));
      } else {
        setResult("You Lose!");
        setScore((s) => ({ ...s, computer: s.computer + 1 }));
      }
    }, 300);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="container text-center mt-3">
      <h2>🎮 Rock Paper Scissors</h2>

      {/* Scoreboard */}
      <div className="d-flex justify-content-center gap-3 my-3 flex-wrap">
        <div className="card p-3 shadow-sm text-center">
          <h6>You</h6>
          <h3>{score.player}</h3>
        </div>
        <div className="card p-3 shadow-sm text-center">
          <h6>Computer</h6>
          <h3>{score.computer}</h3>
        </div>
      </div>

      {/* Choice buttons */}
      <div className="d-flex justify-content-center gap-3 flex-wrap mb-3">
        {choices.map((c) => (
          <motion.button
            key={c.name}
            className="btn btn-outline-primary d-flex flex-column align-items-center"
            onClick={() => play(c)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            style={{ minWidth: 100 }}
          >
            {c.icon}
            <small>{c.name}</small>
          </motion.button>
        ))}
      </div>

      {/* results */}
      {playerChoice && (
        <div className="mt-3">
          <div className="d-flex justify-content-center gap-4 align-items-center flex-wrap">
            <div className="choice-card text-center">
              <h6>You</h6>
              <div>{playerChoice.icon}</div>
              <small>{playerChoice.name}</small>
            </div>
            <div className="choice-card text-center">
              <h6>Computer</h6>
              <div>{computerChoice?.icon || "🤔"}</div>
              <small>{computerChoice?.name || "..."}</small>
            </div>
          </div>
          <h4 className="mt-3">{result}</h4>
        </div>
      )}

      <div className="mt-3 d-flex justify-content-center gap-2">
        <button className="btn btn-secondary" onClick={resetGame}>Reset</button>
        <button className="btn btn-dark" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

export default RockPaperScissors;
