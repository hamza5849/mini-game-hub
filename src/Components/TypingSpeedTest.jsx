// TypingSpeedTest.jsx
import React, { useState, useEffect, useRef } from "react";
import { Button, ProgressBar, Alert } from "react-bootstrap";

function TypingSpeedTest({ onBack }) {
  const paragraphs = [
    "Typing is an essential skill for programmers and writers alike. The faster and more accurately you can type, the more productive you become. Daily practice can significantly improve your typing speed over time.",
    "Learning React makes building user interfaces fun and efficient. By practicing small projects, you can master component-based architecture. Consistency in coding will boost your programming skills.",
    "Consistency is the key to improvement in every skill. Typing, like any skill, requires patience and repetition. Focused daily practice can bring noticeable improvements in speed and accuracy."
  ];

  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feedback, setFeedback] = useState("");

  const timerRef = useRef(null);

  // Pick random paragraph on mount
  useEffect(() => {
    setText(paragraphs[Math.floor(Math.random() * paragraphs.length)]);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (started && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && started && !finished) {
      finishTest();
    }
    return () => clearTimeout(timerRef.current);
  }, [started, timeLeft, finished]);

  // Update stats as user types
  const handleChange = (e) => {
    if (!started) setStarted(true);
    const value = e.target.value;
    setInput(value);
    calculateStats(value);
  };

  const calculateStats = (typed) => {
    const minutes = (60 - timeLeft) / 60 || 1/60;
    const wordsTyped = typed.trim() === "" ? 0 : typed.trim().split(/\s+/).length;
    const charsTyped = typed.length;

    const speedWPM = Math.round(wordsTyped / minutes);
    const speedCPM = Math.round(charsTyped / minutes);

    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) correctChars++;
    }
    const acc = typed.length === 0 ? 100 : Math.round((correctChars / typed.length) * 100);

    let fb = "";
    if (speedWPM < 20) fb = "⚡ Speed up! Keep practicing.";
    else if (speedWPM < 40) fb = "👍 Good, you can go faster!";
    else fb = "🎉 Excellent! Keep it up!";

    setWpm(speedWPM);
    setCpm(speedCPM);
    setAccuracy(acc);
    setFeedback(fb);
  };

  const finishTest = () => {
    if (finished) return;
    setFinished(true);
    setStarted(false);
    clearTimeout(timerRef.current);
    calculateStats(input); // Ensure final stats
  };

  const handleRestart = () => {
    const newText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    setText(newText);
    setInput("");
    setTimeLeft(60);
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
    setFeedback("");
    clearTimeout(timerRef.current);
  };

  const progress = Math.min((input.length / text.length) * 100, 100);

  return (
    <div className="container text-center mt-4">
      <h2 className="mb-3">⌨️ Typing Speed Test</h2>
      <h5>Time Left: {timeLeft}s</h5>
      <ProgressBar now={(timeLeft / 60) * 100} className="mb-3" />

      <div className="card shadow p-4 mb-3">
        <p className="typing-text fw-bold">{text}</p>

        <textarea
          className="form-control mb-3"
          rows="5"
          value={input}
          onChange={handleChange}
          placeholder="Start typing here..."
          disabled={finished || timeLeft === 0}
        />

        <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-3" />

        <Alert variant="secondary">{feedback}</Alert>

        {finished && (
          <Alert variant="success">
            <h5>✅ Results</h5>
            <p><strong>Speed:</strong> {wpm} WPM</p>
            <p><strong>Characters:</strong> {cpm} CPM</p>
            <p><strong>Accuracy:</strong> {accuracy}%</p>
          </Alert>
        )}

        <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
          {!finished && (
            <Button variant="warning" onClick={finishTest}>✅ Complete Test</Button>
          )}
          <Button variant="success" onClick={handleRestart}>🔄 Restart</Button>
          <Button variant="secondary" onClick={onBack}>⬅ Back</Button>
        </div>
      </div>
    </div>
  );
}

export default TypingSpeedTest;
