import React, { useState } from "react";
import "./App.css";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import SCREEN from "./pages/constants";

function App() {
  const [screen, setScreen] = useState(SCREEN.LOBBY);
  const [userName, setUserName] = useState("");

  return screen === SCREEN.LOBBY ? (
    <Lobby
      userName={userName}
      setUserName={setUserName}
      setScreen={setScreen}
    />
  ) : screen === SCREEN.GAME_OVER ? (
    <div style={{ color: "white" }}>
      <h1>Game Over! </h1>
      <h2 style={{ textAlign: "center" }}>Score:{window.score}</h2>
      <a href="/" style={{ textAlign: "center", color: "red" }}>
        <h3>Restart</h3>
      </a>
    </div>
  ) : (
    <Game setScreen={setScreen} userName={userName} />
  );
}

export default App;
