import React, { useState, useEffect } from "react";

function TicTacToe({ onBack, theme }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState("Easy"); // Easy, Medium, Hard
  const player = "X";
  const computer = "O";

  useEffect(() => {
    if (!winner) {
      const xCount = board.filter((c) => c === "X").length;
      const oCount = board.filter((c) => c === "O").length;
      if (xCount > oCount) {
        const timer = setTimeout(() => makeComputerMove(), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [board, winner]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setWinner(calculateWinner(newBoard));
  };

  const makeComputerMove = () => {
    if (winner) return;

    let index;
    const empty = board.map((c, i) => (c === null ? i : null)).filter((i) => i !== null);

    if (difficulty === "Easy") {
      index = empty[Math.floor(Math.random() * empty.length)];
    } else if (difficulty === "Medium") {
      index = findWinningMove(board, player) ?? empty[Math.floor(Math.random() * empty.length)];
    } else if (difficulty === "Hard") {
      index = findBestMove(board, computer, player);
    }

    const newBoard = [...board];
    newBoard[index] = computer;
    setBoard(newBoard);
    setWinner(calculateWinner(newBoard));
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  return (
    <div className={`container my-5`}>
      <div className={`card shadow-lg p-4 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
        <h2 className="text-center mb-3">Tic Tac Toe</h2>

        {/* Difficulty Selector */}
        <div className="mb-3 text-center">
          <label className="me-2 fw-bold">Difficulty:</label>
          <select
            className={`form-select d-inline w-auto ${theme === "dark" ? "bg-secondary text-light" : ""}`}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Winner / Turn */}
        <h4 className="text-center mb-3">
          {winner
            ? winner === "Draw"
              ? "It's a Draw!"
              : `${winner} wins!`
            : "Your Turn (X)"}
        </h4>

        {/* Board */}
        <div
          className="d-grid gap-2 mx-auto"
          style={{ gridTemplateColumns: "repeat(3, 100px)" }}
        >
          {board.map((cell, i) => (
            <button
              key={i}
              className={`btn ${theme === "dark" ? "btn-light" : "btn-primary"}`}
              style={{ height: "100px", width: "100px", fontSize: "2rem", padding: 0 }}
              onClick={() => handleClick(i)}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-3 text-center">
          <button className="btn btn-secondary me-2" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-dark" onClick={onBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function calculateWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (!board.includes(null)) return "Draw";
  return null;
}

function findWinningMove(board, symbol) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    const line = [board[a], board[b], board[c]];
    if (line.filter((v) => v === symbol).length === 2 && line.includes(null)) {
      return [a,b,c][line.indexOf(null)];
    }
  }
  return null;
}

function findBestMove(board, ai, human) {
  let bestScore = -Infinity;
  let move;
  board.forEach((cell, i) => {
    if (cell === null) {
      board[i] = ai;
      const score = minimax(board, 0, false, ai, human);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  });
  return move;
}

function minimax(board, depth, isMaximizing, ai, human) {
  const result = calculateWinner(board);
  if (result === ai) return 10 - depth;
  if (result === human) return depth - 10;
  if (result === "Draw") return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    board.forEach((cell, i) => {
      if (cell === null) {
        board[i] = ai;
        const score = minimax(board, depth + 1, false, ai, human);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    board.forEach((cell, i) => {
      if (cell === null) {
        board[i] = human;
        const score = minimax(board, depth + 1, true, ai, human);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    });
    return bestScore;
  }
}

export default TicTacToe;
