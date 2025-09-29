// SnakeGame.jsx
// Classic grid-based snake with keyboard + touch controls.
// BOARD_SIZE and cell sizes are set to scale across screens.
import React, { useState, useEffect } from "react";

const BOARD_SIZE = 12; // moderate size for responsive display
const INITIAL_SNAKE = [[6, 6]];

function generateFood(snake) {
  let food;
  do {
    food = [
      Math.floor(Math.random() * BOARD_SIZE),
      Math.floor(Math.random() * BOARD_SIZE),
    ];
  } while (snake.some(([x, y]) => x === food[0] && y === food[1]));
  return food;
}

function SnakeGame({ onBack }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState([0, 1]); // moving right initially
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(220);

  // keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      const dirs = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      };
      if (dirs[e.key]) {
        const [dx, dy] = dirs[e.key];
        // prevent reversing into itself
        if (
          snake.length > 1 &&
          snake[0][0] + dx === snake[1][0] &&
          snake[0][1] + dy === snake[1][1]
        ) return;
        setDirection([dx, dy]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [snake]);

  // auto-move
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => moveSnake(), speed);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver, speed]);

  const moveSnake = () => {
    const newHead = [snake[0][0] + direction[0], snake[0][1] + direction[1]];

    // collisions
    if (
      newHead[0] < 0 ||
      newHead[0] >= BOARD_SIZE ||
      newHead[1] < 0 ||
      newHead[1] >= BOARD_SIZE ||
      snake.some(([x, y]) => x === newHead[0] && y === newHead[1])
    ) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    // food eaten
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(generateFood(newSnake));
      setScore((s) => s + 1);
      if (speed > 60) setSpeed((sp) => sp - 12);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const handleReset = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
    setSpeed(220);
  };

  // responsive cell size
  const cellSize = Math.max(14, Math.floor(Math.min(320 / BOARD_SIZE, 420 / BOARD_SIZE)));

  // touch controls for mobile
  const handleTouchDirection = (dx, dy) => {
    if (
      snake.length > 1 &&
      snake[0][0] + dx === snake[1][0] &&
      snake[0][1] + dy === snake[1][1]
    ) return;
    setDirection([dx, dy]);
  };

  return (
    <div className="container text-center mt-3">
      <h2>Snake Game</h2>
      <h5>Score: {score}</h5>

      <div style={{ display: "inline-block", borderRadius: 6, overflow: "hidden", padding: 6, background: "#fff" }} className="shadow-sm">
        {/* board rows */}
        {Array.from({ length: BOARD_SIZE }).map((_, row) => (
          <div key={row} style={{ display: "flex" }}>
            {Array.from({ length: BOARD_SIZE }).map((_, col) => {
              const isSnake = snake.some(([x, y]) => x === row && y === col);
              const isFood = food[0] === row && food[1] === col;
              return (
                <div
                  key={`${row}-${col}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    border: "1px solid rgba(0,0,0,0.08)",
                    backgroundColor: isSnake ? "#198754" : isFood ? "#dc3545" : "#e9ecef",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {gameOver && <h4 className="text-danger mt-3">Game Over!</h4>}

      <div className="mt-3 d-flex justify-content-center gap-2 flex-wrap">
        <button className="btn btn-secondary" onClick={handleReset}>Restart</button>
        <button className="btn btn-dark" onClick={onBack}>Back to Hub</button>
      </div>

      {/* Touch Controls */}
      <div className="mt-4">
        <div className="d-flex justify-content-center mb-2">
          <button className="btn btn-primary m-1" onClick={() => handleTouchDirection(-1, 0)}>↑</button>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary m-1" onClick={() => handleTouchDirection(0, -1)}>←</button>
          <button className="btn btn-primary m-1" onClick={() => handleTouchDirection(0, 1)}>→</button>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button className="btn btn-primary m-1" onClick={() => handleTouchDirection(1, 0)}>↓</button>
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;
