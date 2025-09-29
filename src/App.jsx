import React, { useState } from "react";

import "./App.css"; 

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import GameSelector from "./Components/GameSelector";
import TicTacToe from "./Components/TicTacToe";
import SnakeGame from "./Components/SnakeGame";
import MemoryGame from "./Components/MemoryGame";
import RockPaperScissors from "./Components/RockPaperScissors";
import Sudoku4x4 from "./Components/Sudoku4x4";
import GuessNumber from "./Components/GuessNumber";
import TypingSpeedTest from "./Components/TypingSpeedTest";

import heroImage from "./assets/box.jpg"; 

function App() {
  const [theme, setTheme] = useState("light");
  const [selectedGame, setSelectedGame] = useState(null);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const gameCardWrapper = (GameComponent) => (
    <div className="container my-4 d-flex justify-content-center">
      <div className={`card shadow-lg p-3 game-wrapper ${theme === "dark" ? "dark-mode-card" : "light-mode-card"}`}>
        {GameComponent}
      </div>
    </div>
  );

  const renderGame = () => {
    switch (selectedGame) {
      case "TicTacToe":
        return gameCardWrapper(<TicTacToe onBack={() => setSelectedGame(null)} theme={theme} />);
      case "SnakeGame":
        return gameCardWrapper(<SnakeGame onBack={() => setSelectedGame(null)} theme={theme} />);
      case "MemoryGame":
        return gameCardWrapper(<MemoryGame onBack={() => setSelectedGame(null)} theme={theme} />);
      case "RockPaperScissors":
        return gameCardWrapper(<RockPaperScissors onBack={() => setSelectedGame(null)} theme={theme} />);
      case "Sudoku4x4":
        return gameCardWrapper(<Sudoku4x4 onBack={() => setSelectedGame(null)} theme={theme} />);
      case "GuessNumber":
        return gameCardWrapper(<GuessNumber onBack={() => setSelectedGame(null)} theme={theme} />);
      case "TypingSpeedTest":
        return gameCardWrapper(<TypingSpeedTest onBack={() => setSelectedGame(null)} theme={theme} />);
      default:
        return (
          <>
            <div
              className="hero-banner d-flex align-items-center justify-content-start"
              style={{ backgroundImage: `url(${heroImage})` }}
            >
              <div className="container hero-text-box text-white">
                <h1 className="display-3 fw-bold">🎮 Mini Game Hub</h1>
                <p className="lead fs-4">
                  Dive into the exciting world of digital adventures! Sharpen your skills,
                  challenge your mind, and enjoy endless gaming excitement.
                </p>
              </div>
            </div>
            <GameSelector onSelectGame={setSelectedGame} />
          </>
        );
    }
  };

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${theme === "dark" ? "dark-mode" : "light-mode"}`}
      style={{
        backgroundImage: theme === "light" ? 'url("/lightmode.jpg")' : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.3s ease",
      }}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow-1 d-flex flex-column justify-content-start">
        {renderGame()}
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
