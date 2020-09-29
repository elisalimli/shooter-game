import React, { useEffect } from "react";
import Player from "./game/Player";
import Enemy from "./game/Enemy";
import { getRandomNumber } from "./utils";
import SCREEN from "./constants";

import { GAME_WIDTH, GAME_HEIGHT } from "./constants";
import Bullet from "./game/Bullet";
function Game({ setScreen, userName }) {
  let canvas;
  let ctx;
  let player;
  let enemy;
  let MAX_ENEMY_COUNT = 5;

  let lastEnemyAtSpawn = Date.now();
  useEffect(() => {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    player = new Player(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    let enemies = [];
    let bullets = [];
    const firedBulletCb = (angle, positionX, positionY) => {
      bullets.push(new Bullet(angle, positionX, positionY));
    };

    setInterval(() => {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      if (player.health === 0) {
        setScreen(SCREEN.GAME_OVER);
        return;
      }
      player.update(firedBulletCb);
      player.draw(ctx);
      if (Date.now() - lastEnemyAtSpawn > 1500) {
        lastEnemyAtSpawn = Date.now();
        enemies.push(
          new Enemy(
            getRandomNumber(-100, GAME_WIDTH + 100),
            getRandomNumber(-100, GAME_HEIGHT + 100)
          )
        );
      }
      enemies.forEach((enemy) => {
        enemy.update(ctx, player, bullets);
        enemy.draw(ctx);
      });
      bullets.forEach((bullet) => {
        bullet.update();
        bullet.draw(ctx);
      });
    }, 1000 / 30);
  });
  return (
    <canvas
      id="myCanvas"
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      style={{ border: "1px solid #000" }}
    ></canvas>
  );
}

export default Game;
