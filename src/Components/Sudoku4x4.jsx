// Sudoku4x4.jsx
import React, { useState } from "react";

function Sudoku4x4({ onBack }) {
  const puzzles = [
    {
      initial: [
        [1,0,0,4],
        [0,0,3,0],
        [0,2,0,0],
        [3,0,0,2]
      ],
      solution: [
        [1,3,2,4],
        [4,1,3,2],
        [2,4,1,3],
        [3,2,4,1]
      ]
    },
    {
      initial: [
        [0,4,0,0],
        [1,0,0,3],
        [0,0,2,0],
        [0,1,0,4]
      ],
      solution: [
        [3,4,1,2],
        [1,2,4,3],
        [4,3,2,1],
        [2,1,3,4]
      ]
    }
  ];

  const getRandomPuzzle = () => puzzles[Math.floor(Math.random() * puzzles.length)];

  const [puzzle, setPuzzle] = useState(getRandomPuzzle());
  const [grid, setGrid] = useState(puzzle.initial.map(r => [...r]));
  const [message, setMessage] = useState("ℹ️ Fill each row, column, and 2×2 box with numbers 1–4.");

  const handleChange = (row, col, value) => {
    if (puzzle.initial[row][col] !== 0) return;
    if (value === "" || /^[1-4]$/.test(value)) {
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = value === "" ? 0 : parseInt(value, 10);
      setGrid(newGrid);
    }
  };

  const checkSolution = () => {
    if (JSON.stringify(grid) === JSON.stringify(puzzle.solution)) {
      setMessage("🎉 Congratulations! You solved it!");
    } else {
      setMessage("❌ Some cells are incorrect. Try again!");
    }
  };

  const resetGame = () => {
    const newPuzzle = getRandomPuzzle();
    setPuzzle(newPuzzle);
    setGrid(newPuzzle.initial.map(r => [...r]));
    setMessage("ℹ️ Fill each row, column, and 2×2 box with numbers 1–4.");
  };

  return (
    <div className="container my-3">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-3">Sudoku 4x4</h2>
        <p className="text-center">{message}</p>
        <table className="table table-bordered mx-auto text-center" style={{ width: "250px" }}>
          <tbody>
            {grid.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c}>
                    <input
                      type="text"
                      value={cell === 0 ? "" : cell}
                      onChange={(e) => handleChange(r, c, e.target.value)}
                      className="form-control text-center"
                      maxLength="1"
                      style={{ width: "40px" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-center">
          <button className="btn btn-success me-2" onClick={checkSolution}>Check</button>
          <button className="btn btn-secondary me-2" onClick={resetGame}>New Puzzle</button>
          <button className="btn btn-dark" onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default Sudoku4x4;
