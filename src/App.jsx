import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import GameOverScreen from "./components/GameOverScreen/GameOverScreen.jsx";
import Header from "./components/Header/Header.jsx";
import Game from "./components/Game/Game.jsx";
import './App.css'

function App() {
  const [score, setScore] = useState({
    score: 0,
    bestScore: 0,
    nmoves: 0
  });
  const [gameStatus, setGameStatus] = useState('starting')
  const storageBestScore = useRef(0)

  useEffect(() => {
    loadBestScore()
  }, [])

  const loadBestScore = () => {
    // get best score from storage
    storageBestScore.current = JSON.parse(localStorage.getItem('bestScore'))

    setScore(prevScore => ({
      ...prevScore,
      bestScore: (storageBestScore.current===null) ? 0 : storageBestScore.current
    }))
  }

  // updates score and bestScore
  const handleScore = newScore => {
    setScore(prevScore => ({
      score: prevScore.score + newScore,
      bestScore: (prevScore.score+newScore > prevScore.bestScore) ? prevScore.score + newScore : prevScore.bestScore,
      nmoves: prevScore.nmoves + 1
    }))
    
    // dont wanna call this all the time 
    if ((score.score+newScore) > storageBestScore.current) {
      document.getElementById('bestScore-star').style.visibility = 'visible'
    }
  };


  const restartGame = () => {
    console.log('restarting game...')

    // save best score
    localStorage.setItem('bestScore', score.bestScore)
    setScore({
      score: 0,
      bestScore: score.bestScore,
      nmoves: 0
    })

    // restart game
    setGameStatus('starting')
  }

  return (
    <>
      <Typography textAlign={'center'} padding={'5px'} variant="h3">2048.js</Typography>
      <div className="game-container elevation-3">
        {gameStatus === 'gameOver' &&
          <GameOverScreen restartGame={restartGame} score={score} onClose={restartGame} open={(gameStatus==='gameOver')}/>
        }
          <Header restartGame={restartGame} score={score} />
          <Game handleScore={handleScore} gameStatus={gameStatus} updateGameStatus={val => setGameStatus(val)} />
      </div>
    </>
  );
}

export default App;
