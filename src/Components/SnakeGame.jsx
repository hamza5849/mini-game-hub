import React, { useState, useEffect } from "react";

const BOARD_SIZE = 15;
const INITIAL_SNAKE = [[7, 7]];

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
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);

  // Handle arrow keys
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
        // Prevent reverse
        if (
          snake.length > 1 &&
          snake[0][0] + dx === snake[1][0] &&
          snake[0][1] + dy === snake[1][1]
        )
          return;
        setDirection([dx, dy]);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [snake]);

  // Move snake automatically
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => moveSnake(), speed);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver, speed]);

  const moveSnake = () => {
    const newHead = [snake[0][0] + direction[0], snake[0][1] + direction[1]];

    // Check collision
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

    // Check if food eaten
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(generateFood(newSnake));
      setScore(score + 1);
      if (speed > 50) setSpeed(speed - 5);
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
    setSpeed(200);
  };

  return (
    <div className="container text-center mt-4">
      <h2>Snake Game</h2>
      <h5>Score: {score}</h5>

      <div style={{ display: "inline-block" }}>
        {Array.from({ length: BOARD_SIZE }).map((_, row) => (
          <div key={row} style={{ display: "flex" }}>
            {Array.from({ length: BOARD_SIZE }).map((_, col) => {
              const isSnake = snake.some(([x, y]) => x === row && y === col);
              const isFood = food[0] === row && food[1] === col;
              return (
                <div
                  key={`${row}-${col}`}
                  style={{
                    width: 20,
                    height: 20,
                    border: "1px solid black",
                    backgroundColor: isSnake
                      ? "green"
                      : isFood
                      ? "red"
                      : "white",
                  }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      {gameOver && <h4 className="text-danger mt-3">Game Over!</h4>}

      <div className="mt-3">
        <button className="btn btn-secondary me-2" onClick={handleReset}>
          Restart
        </button>
        <button className="btn btn-dark" onClick={onBack}>
          Back to Hub
        </button>
      </div>
    </div>
  );
}

export default SnakeGame;
