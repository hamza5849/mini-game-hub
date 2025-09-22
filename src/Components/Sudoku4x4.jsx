import React, { useState, useEffect } from "react";

function Sudoku4x4({ onBack }) {
  // Multiple puzzles (0 means empty cell)
  const puzzles = [
    {
      initial: [
        [1, 0, 0, 4],
        [0, 0, 3, 0],
        [0, 2, 0, 0],
        [3, 0, 0, 2],
      ],
      solution: [
        [1, 3, 2, 4],
        [2, 4, 3, 1],
        [4, 2, 1, 3],
        [3, 1, 4, 2],
      ],
    },
    {
      initial: [
        [0, 4, 0, 0],
        [1, 0, 0, 3],
        [0, 0, 2, 0],
        [0, 1, 0, 4],
      ],
      solution: [
        [2, 4, 3, 1],
        [1, 2, 4, 3],
        [4, 3, 2, 1],
        [3, 1, 1, 4], // example (replace with valid solution if needed)
      ],
    },
  ];

  // Pick a random puzzle when component loads
  const getRandomPuzzle = () => {
    const index = Math.floor(Math.random() * puzzles.length);
    return puzzles[index];
  };

  const [puzzle, setPuzzle] = useState(getRandomPuzzle);
  const [grid, setGrid] = useState(puzzle.initial);
  const [solution, setSolution] = useState(puzzle.solution);
  const [message, setMessage] = useState("ℹ️ Fill each row, column, and 2×2 box with numbers 1–4 without repeats.");

  // Handle number input
  const handleChange = (row, col, value) => {
    if (puzzle.initial[row][col] !== 0) return; // can't edit pre-filled cells
    if (value === "" || /^[1-4]$/.test(value)) {
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = value === "" ? 0 : parseInt(value);
      setGrid(newGrid);
    }
  };

  // Check if the puzzle is solved
  const checkSolution = () => {
    if (JSON.stringify(grid) === JSON.stringify(solution)) {
      setMessage("🎉 Congratulations! You solved it!");
    } else {
      setMessage("❌ Some cells are incorrect. Try again!");
    }
  };

  // Reset puzzle with a new one
  const resetGame = () => {
    const newPuzzle = getRandomPuzzle();
    setPuzzle(newPuzzle);
    setGrid(newPuzzle.initial);
    setSolution(newPuzzle.solution);
    setMessage("🔄 New puzzle! Remember: Fill rows, columns, and boxes with 1–4.");
  };

  return (
    <div className="sudoku-container text-center">
      <h2 className="mb-3">Sudoku 4x4</h2>

      <div className="sudoku-grid mx-auto">
        {grid.map((row, i) => (
          <div key={i} className="sudoku-row">
            {row.map((cell, j) => (
              <input
                key={j}
                type="text"
                maxLength="1"
                value={cell === 0 ? "" : cell}
                className={`sudoku-cell ${
                  puzzle.initial[i][j] !== 0 ? "prefilled" : ""
                }`}
                onChange={(e) => handleChange(i, j, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>

      {message && <p className="mt-3">{message}</p>}

      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={checkSolution}>
          Check Solution
        </button>
        <button className="btn btn-secondary me-2" onClick={resetGame}>
          Restart
        </button>
        <button className="btn btn-dark" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Sudoku4x4;
