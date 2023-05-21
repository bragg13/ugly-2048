import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import GameOverScreen from "./components/GameOverScreen/GameOverScreen.jsx";
import Header from "./components/Header/Header.jsx";
import Game from "./components/Game/Game.jsx";
import './App.css'

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0); // TODO: load from storage

  useEffect(() => {
    // get best score from storage
    let _bs = JSON.parse(localStorage.getItem('bestScore'))
    setBestScore(_bs)
  }, [])

  const handleScore = newScore => {
    setScore(prevScore => prevScore+newScore)

    if (newScore > bestScore) {
      setBestScore(score+newScore)
      // show little anim
    }
  };

  return (
    <>
      <Typography textAlign={'center'} padding={'5px'} variant="h3">2048.js</Typography>
      <div className="game-container">
        {isGameOver && <GameOverScreen />}
        <Header score={score} bestScore={bestScore} />
        <Game handleScore={handleScore} />
      </div>
    </>
  );
}

export default App;
