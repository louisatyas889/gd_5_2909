"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Game1() {
  const holes = Array.from({ length: 9 });

  // State Management
  const [moleIndex, setMoleIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(30);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(0);

  // 1. Ambil High Score dari LocalStorage saat pertama kali render
  useEffect(() => {
    const savedHighScore = localStorage.getItem("whack_highscore");
    if (savedHighScore) {
      setHighScore(Number(savedHighScore));
    }
  }, []);

  // 2. Logika Pemunculan Tikus (Mole)
  useEffect(() => {
    let moleTimer: NodeJS.Timeout;

    if (gameActive) {
      moleTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * holes.length);
        setMoleIndex(randomIndex);
      }, 700);
    } else {
      setMoleIndex(null); // Sembunyikan tikus jika game berhenti
    }

    return () => clearInterval(moleTimer);
  }, [gameActive, holes.length]);

  // 3. Logika Timer
  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (gameActive && time > 0) {
      countdown = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && gameActive) {
      setGameActive(false);
      handleGameOver();
    }

    return () => clearInterval(countdown);
  }, [gameActive, time]);

  // 4. Fungsi Game Over & Cek High Score
  const handleGameOver = () => {
    toast.info("⏰ Waktu habis!", { autoClose: 1500 });

    if (score > highScore) {
      localStorage.setItem("whack_highscore", score.toString());
      setHighScore(score);
      toast.success("🎉 New High Score!", { autoClose: 1500 });
    }
  };

  const hitMole = (index: number) => {
    if (index === moleIndex && gameActive) {
      setScore((prev) => prev + 1);
      setMoleIndex(null); // Tikus hilang setelah dipukul
    }
  };

  const startGame = () => {
    setScore(0);
    setTime(30);
    setGameActive(true);

    toast.info("⏱️ Waktu dimulai! Kamu punya 30 detik!", {
      autoClose: 1500,
    });
  };

  return (
    <div className="game-container">
      <div className="game-panel">
        <h1 className="game-title">🎮 Tap the Mouse</h1>

        <div className="game-stats">
          <div className="score">🏆 Score: {score}</div>
          <div className="timer">⏱️ Time: {time}</div>
        </div>

        <div className="highscore">
          ⭐ High Score: {highScore}
        </div>

        {!gameActive && (
          <button className="start-btn" onClick={startGame}>
            🚀 Start Game
          </button>
        )}
      </div>

      <div className="game-grid">
        {holes.map((_, index) => (
          <div
            key={index}
            onClick={() => hitMole(index)}
            className="hole"
          >
            {moleIndex === index && (
              <div className="mole">🐹</div>
            )}
          </div>
        ))}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        closeOnClick
        pauseOnHover
        draggable
        closeButton
      />
    </div>
  );
}