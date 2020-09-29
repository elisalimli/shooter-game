import { GAME_WIDTH, GAME_HEIGHT } from "../constants";
import Bullet from "./Bullet";
class Player {
  lastFireAt = Date.now();
  positionX;
  positionY;
  speed = 5;
  angle = 0;
  ammo = 100;
  health = 100;

  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
  }

  update = (firedBulletCb) => {
    this.angle = (this.angle - 0.1) % 360;
    if (window.meter) {
      if (window.meter.volume * 100 > 10) {
        if (Date.now() - this.lastFireAt > 500) {
          this.lastFireAt = Date.now();
          firedBulletCb(this.angle, GAME_WIDTH / 2, GAME_HEIGHT / 2);
        }
      }
    }
  };
  deductHealth = () => (this.health -= 10);
  draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.positionX, this.positionY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "cornflowerblue";
    ctx.fill();
    ctx.lineWidth = 0.1;
    ctx.stroke();

    const edgeX = Math.cos(this.angle) * 50;
    const edgeY = Math.sin(this.angle) * 50;
    //burada hansinin sin ve ya cos oldugunun ferqi yoxdu
    //Draw Arrow
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#fff";

    drawArrow(
      ctx,
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH / 2 + edgeX,
      GAME_HEIGHT / 2 + edgeY
    );
    ctx.stroke();

    //Draw volume-meter text

    // if (window.meter) {
    //   ctx.font = "20px Arial";
    //   ctx.fillStyle = "#000";
    //   ctx.fillText(
    //     `Volume : ${window.meter.volume * 100}`,
    //     20,
    //     GAME_HEIGHT - 15
    //   );
    // }
    //Draw Ammo Text
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(this.health, GAME_WIDTH - 60, GAME_HEIGHT - 15);

    //Draw Arrow Function
    function drawArrow(context, fromx, fromy, tox, toy) {
      var headlen = 10; // length of head in pixels
      var dx = tox - fromx;
      var dy = toy - fromy;
      var angle = Math.atan2(dy, dx);

      context.lineWidth = 1;

      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
      context.lineTo(
        tox - headlen * Math.cos(angle - Math.PI / 6),
        toy - headlen * Math.sin(angle - Math.PI / 6)
      );
      context.moveTo(tox, toy);
      context.lineTo(
        tox - headlen * Math.cos(angle + Math.PI / 6),
        toy - headlen * Math.sin(angle + Math.PI / 6)
      );
    }
  };
}

export default Player;
