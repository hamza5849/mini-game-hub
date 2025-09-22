import React, { useState } from "react";
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
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Hero box image
import heroImage from "./assets/box.jpg";

function App() {
  const [theme, setTheme] = useState("light");
  const [selectedGame, setSelectedGame] = useState(null);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const renderGame = () => {
    const gameCardWrapper = (GameComponent) => (
      <div className="container my-5">
        <div className={`card shadow-lg p-4 ${theme}-mode-card`}>
          {GameComponent}
        </div>
      </div>
    );

    switch (selectedGame) {
      case "TicTacToe":
        return gameCardWrapper(<TicTacToe onBack={() => setSelectedGame(null)} theme={theme} />);
      case "SnakeGame":
        return gameCardWrapper(<SnakeGame onBack={() => setSelectedGame(null)} theme={theme} />);
      case "MemoryGame":
        return gameCardWrapper(<MemoryGame onBack={() => setSelectedGame(null)} theme={theme} />);
      case "RockPaperScissors":
        return gameCardWrapper(<RockPaperScissors onBack={() => setSelectedGame(null)} />);
      case "Sudoku4x4":
        return gameCardWrapper(<Sudoku4x4 onBack={() => setSelectedGame(null)} />);
      case "GuessNumber":
        return gameCardWrapper(<GuessNumber onBack={() => setSelectedGame(null)} />);
      case "TypingSpeedTest":
        return gameCardWrapper(<TypingSpeedTest onBack={() => setSelectedGame(null)} />);
      default:
        return (
          <>
            {/* Hero Banner Box */}
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

            {/* Game Selector */}
            <GameSelector onSelectGame={setSelectedGame} />
          </>
        );
    }
  };

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${theme}-mode`}
      style={{
        backgroundImage: `url(${theme === "light" ? "/lightmode.jpg" : "/darkmode.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.3s ease",
      }}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow-1">{renderGame()}</main>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
