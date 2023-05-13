import { useState } from "react";
import { Paper } from "@mui/material";
import GameOverScreen from "./components/GameOverScreen/GameOverScreen.jsx";
import Header from "./components/Header/Header.jsx";
import Game from "./components/Game/Game.jsx";

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0); // TODO: load from storage

  const handleScore = () => {
    console.log("els");
  };

  return (
    <>
      <Paper>
        {isGameOver && <GameOverScreen />}

        <Header handleScore={handleScore} />

        <Game />
      </Paper>
    </>
  );
}

export default App;
