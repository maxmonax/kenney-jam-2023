import { GameScene } from "../scenes/GameScene";
import { GameObject } from "./GameObject";

export class Bullet extends GameObject {
    scene: GameScene;
    image;
    direction: number;
    bulletTexture: string;
    destroyTimer;
    damage: number;

    constructor(scene: GameScene, x, y, damage, direction, velocity, bulletTexture) {
        super();
        this.scene = scene;
        this.damage = damage;
        this.direction = direction;
        this.bulletTexture = bulletTexture;
        this.createBody(x, y, velocity);
    }

    createBody(x, y, velocity) {
        this.image = this.scene.bullets.create(x, y, 'game', this.bulletTexture)
            .setDepth(105)
            .setRotation(this.direction - Math.PI / 2)
            .setVelocityX(velocity * Math.cos(this.direction))
            .setVelocityY(velocity * Math.sin(this.direction));

        this.image.object = this;
        
        this.destroyTimer = this.scene.time.delayedCall(2000, () => {
            if (this.image) this.image.destroy();
            this.destroyTimer.remove();
        }, [], this.scene);
    }

}