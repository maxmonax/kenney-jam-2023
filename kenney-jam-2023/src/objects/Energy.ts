import { GameScene } from "../scenes/GameScene";
import { MyMath } from "../utils/MyMath";
import { GameObject } from "./GameObject";

export class Energy extends GameObject {
    private _texture = 'powerup';
    scene: GameScene;
    image;
    direction: number;
    destroyTimer;
    damage: number;

    constructor(scene: GameScene, x, y, damage) {
        super();
        this.scene = scene;
        this.damage = damage;
        
        let velocity = MyMath.randomInRange(10, 50);

        this.image = this.scene.bullets.create(x, y, 'game', this._texture)
            .setRotation(this.direction - Math.PI / 2)
            .setVelocityX(velocity * Math.cos(this.direction))
            .setVelocityY(velocity * Math.sin(this.direction));

        this.image.object = this;
        
        this.destroyTimer = this.scene.time.delayedCall(30000, () => {
            if (this.image) this.image.destroy();
            this.destroyTimer.remove();
        }, null, this.scene);
    }

}