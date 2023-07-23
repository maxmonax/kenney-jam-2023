import { GameScene } from "../scenes/GameScene";
import { GameObject } from "./GameObject";

export class Bullet extends GameObject {
    scene: GameScene;
    image;
    direction: number;
    bulletTexture: string;
    destroyTimer: Phaser.Time.TimerEvent;
    damage: number;
    isEnemy = false;

    constructor(scene: GameScene, x, y, damage, direction, velocity, bulletTexture, isEnemy = false) {
        super();
        this.scene = scene;
        this.damage = damage;
        this.direction = direction;
        this.bulletTexture = bulletTexture;
        this.isEnemy = isEnemy;
        this.createBody(x, y, velocity);
    }

    createBody(x, y, velocity) {
        let group = this.scene.bullets;
        this.image = group.create(x, y, 'game', this.bulletTexture)
            .setRotation(this.direction)// - Math.PI / 2)
            .setVelocityX(velocity * Math.cos(this.direction))
            .setVelocityY(velocity * Math.sin(this.direction));

        this.image.object = this;
        
        this.destroyTimer = this.scene.time.delayedCall(2000, () => {
            if (this.image) this.image.destroy();
            this.destroyTimer.remove();
        }, [], this.scene);
    }

    free() {
        if (this.destroyTimer) {
            this.destroyTimer.remove();
            this.destroyTimer.destroy();
        }
        this.scene = null;
        this.image.destroy();
        super.free();
    }

}