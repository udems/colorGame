import '../src/index.css'
import { useState, useEffect } from "react";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("Guess the correct color!");
  const [statusAnimation, setStatusAnimation] = useState(""); // state for animation class
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = (resetScore = false) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setGameStatus("Guess the correct color!");
    if (resetScore) {
      setScore(0);
    }
  };
 
  

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setGameStatus("Correct! 🎉");
      setStatusAnimation("");
      setTimeout(() => {
        startNewGame();
      }, 500);
    } else {
      setGameStatus("Wrong! Try again.");
      setStatusAnimation("fade-out"); // Trigger fade-out effect
      
      setTimeout(() => {
        setStatusAnimation("");
        setGameStatus("Guess the correct color!");
      }, 1000); 
    }
  };
  
  
  
  

  return (
    <div className="game-container">
      <h1 className="game-title">Ultimate Color Challenge</h1>
      <p className="game-subtitle">Test your color intuition and have fun!</p>
      <div
        className="color-box"
        data-testid="colorBox"
        style={{ backgroundColor: targetColor }}
      ></div>
       <p className="instructions" data-testid="gameInstructions">Pick the button that matches the color above.</p>
      <div className="color-options">
        {colors.map((color) => (
          <button
            key={color}
            className="color-button"
            data-testid="colorOption"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>
      <p className={`status ${statusAnimation}`} data-testid="gameStatus">
        {gameStatus}
      </p>
      <p className="score" data-testid="score">Score: {score}</p>
      <button className="new-game" data-testid="newGameButton" onClick={() => startNewGame(true)}>
        New Game
      </button>
    </div>
  );
};

export default ColorGame;
