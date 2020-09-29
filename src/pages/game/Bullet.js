import { GAME_HEIGHT, GAME_WIDTH } from "../constants";

class Bullet {
  angle;
  positionX;
  positionY;
  speed = 5;
  dead = false;

  constructor(angle, positionX, positionY) {
    this.angle = angle;
    this.positionX = positionX;
    this.positionY = positionY;
  }
  update = () => {
    const x = Math.cos(this.angle) * this.speed;
    const y = Math.sin(this.angle) * this.speed;
    this.positionX += x;
    this.positionY += y;
    if (this.positionX < 0 || this.positionX > GAME_WIDTH) {
      this.dead = true;
    }
    if (this.positionY < 0 || this.positionY > GAME_HEIGHT) {
      this.dead = true;
    }
  };
  draw = (ctx) => {
    if (!this.dead) {
      ctx.beginPath();
      ctx.arc(this.positionX, this.positionY, 7, 0, 2 * Math.PI);
      ctx.fillStyle = "#BDFF00";
      ctx.fill();
      ctx.lineWidth = 0.1;
      ctx.stroke();
    }
  };
}
export default Bullet;
