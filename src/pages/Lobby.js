import React from "react";
import SCREEN, { GAME_HEIGHT, GAME_WIDTH } from "./constants";
function Lobby({ userName, setUserName, setScreen }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ width: "15%" }}
      />
      <button
        type="submit"
        style={{ width: "15%" }}
        onClick={() => setScreen(SCREEN.PLAYING)}
      >
        START
      </button>
    </div>
  );
}

export default Lobby;
