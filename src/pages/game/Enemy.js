import SCREEN, { GAME_HEIGHT, GAME_WIDTH } from "../constants";
import { getRandomNumber } from "../utils";

const centerX = GAME_WIDTH / 2;
const centerY = GAME_HEIGHT / 2;
window.score = 0;

class Enemy {
  speed = 1;
  positionX;
  positionY;
  radius;
  dead;
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.radius = getRandomNumber(2, 7);
  }
  highScore = () => (window.score += 10);

  isDead = () => {
    const relativeX = Math.abs(this.positionX - centerX);
    const relativeY = Math.abs(this.positionY - centerY);
    if (relativeX < 20 && relativeY < 20) {
      return true;
    }
  };
  update = (ctx, player, bullets) => {
    if (this.dead) return;
    if (!this.dead) {
      bullets.forEach((bullet) => {
        if (
          Math.abs(bullet.positionX - this.positionX) <= this.radius &&
          Math.abs(bullet.positionY - this.positionY) <= this.radius
        ) {
          this.dead = true;
          bullet.dead = true;
          this.highScore();
        }
      });
      ctx.clearRect(0, GAME_HEIGHT - 15, GAME_WIDTH, GAME_HEIGHT);

      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(`Score : ${window.score}`, 0, GAME_HEIGHT - 15);
    }
    const relativeX = this.positionX - centerX;
    const relativeY = this.positionY - centerY;
    const angle = (Math.atan2(relativeY, relativeX) * 180) / Math.PI;
    const x = Math.sin((angle * Math.PI) / 180) * this.speed;
    const y = Math.cos((angle * Math.PI) / 180) * this.speed;
    this.positionX -= y;
    this.positionY -= x;
    if (this.isDead()) {
      this.dead = true;
      player.deductHealth();
    }
  };
  draw = (ctx) => {
    if (!this.dead) {
      ctx.beginPath();
      ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.lineWidth = 0.1;
      ctx.stroke();
    }
  };
}
export default Enemy;
