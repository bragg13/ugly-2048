import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import GameOverScreen from "./components/GameOverScreen/GameOverScreen.jsx";
import Header from "./components/Header/Header.jsx";
import Game from "./components/Game/Game.jsx";
import './App.css'

function App() {
  const [score, setScore] = useState({
    score: 0,
    bestScore: 0
  });
  // const [bestScore, setBestScore] = useState(0); // TODO: load from storage
  const [gameStatus, setGameStatus] = useState('starting')

  useEffect(() => {
    loadBestScore()
  }, [])

  const loadBestScore = () => {
    // get best score from storage
    let _bs = JSON.parse(localStorage.getItem('bestScore'))
    setScore(prevScore => ({
      ...prevScore,
      bestScore: (_bs===null) ? 0 : _bs
    }))
  }

  // updates score and bestScore
  const handleScore = newScore => {
    setScore(prevScore => ({
      score: prevScore.score + newScore,
      bestScore: (prevScore.score+newScore > prevScore.bestScore) ? prevScore.score + newScore : prevScore.bestScore
    }))
    
    // dont wanna call this all the time 
    if ((score.bestScore+newScore) > JSON.parse(localStorage.getItem('bestScore'))) {
      document.getElementById('bestScore-star').style.visibility = 'visible'
    }
  };


  const restartGame = () => {
    console.log('restarting game...')

    // save best score
    localStorage.setItem('bestScore', score.bestScore)
    setScore({
      score: 0,
      bestScore: score.bestScore
    })

    // restart game
    setGameStatus('starting')
  }

  return (
    <>
      <Typography textAlign={'center'} padding={'5px'} variant="h3">2048.js</Typography>
      <div className="game-container">
        {gameStatus === 'gameover' 
        ?
          <GameOverScreen restartGame={restartGame} />
        :
        <>
          <Header restartGame={restartGame} score={score} />
          <Game handleScore={handleScore} gameStatus={gameStatus} updateGameStatus={val => setGameStatus(val)} />
        </>
        }
      </div>
    </>
  );
}

export default App;
