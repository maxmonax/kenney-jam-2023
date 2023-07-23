import { Config } from "../data/Config";
import { GameScene } from "../scenes/GameScene";
import { MyMath } from "../utils/MyMath";
import { GameObject } from "./GameObject";

export class Energy extends GameObject {
    private _texture = 'powerup';
    private _rotSpd = 0;
    scene: GameScene;
    image;
    direction: number;
    destroyTimer;
    value = 0;

    constructor(scene: GameScene, x, y, parent, value: number) {
        super();
        this.scene = scene;
        this.value = value;

        let velocity = {
            x: MyMath.randomInRange(-100, 100),
            y: MyMath.randomInRange(-100, 100)
        };

        this._rotSpd = MyMath.randomInRange(-1, 1);

        let rot = MyMath.randomInRange(0, Math.PI / 2);

        this.image = this.scene.energy.create(x, y, 'game', this._texture)
            .setRotation(rot)
            .setVelocityX(velocity.x)
            .setVelocityY(velocity.y);
        parent.add(this.image);
        this.image.object = this;
        
        this.destroyTimer = this.scene.time.delayedCall(30000, () => {
            if (this.image) this.image.destroy();
            this.destroyTimer.remove();
        }, [], this.scene);
    }

    private updateMoving(dt: number) {
        let df = Config.GAME.DAMP_FACTOR;
        try {
            this.image.body.velocity.x *= df;
            this.image.body.velocity.y *= df;
        } catch (error) {

        }
    }

    free(): void {
        this.image.destroy();
        super.free();
    }

    update(dt: number) {
        this.updateMoving(dt);
        this.image.rotation += this._rotSpd * dt;
    }

}