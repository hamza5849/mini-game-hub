// GameSelector.jsx
// Displays the grid of game cards. Clicking a card selects the game.
// Uses Bootstrap grid for responsive layout.
import React from "react";
import ticTacToeImg from "../assets/tictactoe.png";
import snakeGameImg from "../assets/snake.png";
import memoryGameImg from "../assets/memory-game.png";
import rpsImg from "../assets/rock-paper-scissors_6851363.png";
import sudokuImg from "../assets/question.png";
import guessNumberImg from "../assets/pastime.png";
import typingTestImg from "../assets/typing-board.png";

function GameSelector({ onSelectGame }) {
  const games = [
    { name: "TicTacToe", label: "Tic Tac Toe", img: ticTacToeImg },
    { name: "SnakeGame", label: "Snake Game", img: snakeGameImg },
    { name: "MemoryGame", label: "Memory Game", img: memoryGameImg },
    { name: "RockPaperScissors", label: "Rock Paper Scissors", img: rpsImg },
    { name: "Sudoku4x4", label: "Sudoku 4x4", img: sudokuImg },
    { name: "GuessNumber", label: "Guess the Number", img: guessNumberImg },
    { name: "TypingSpeedTest", label: "Typing Speed Test", img: typingTestImg },
  ];

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Choose a Game</h3>
      <div className="row g-4">
        {games.map((game) => (
          <div key={game.name} className="col-lg-4 col-md-6 col-sm-12">
            <div
              className="card h-100 shadow-sm game-card"
              role="button"
              onClick={() => onSelectGame(game.name)}
              onKeyDown={(e) => { if (e.key === "Enter") onSelectGame(game.name); }}
              tabIndex={0}
            >
              <img
                src={game.img}
                className="card-img-top"
                alt={game.label}
                style={{ objectFit: "cover", height: 160 }}
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-0">{game.label}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameSelector;
