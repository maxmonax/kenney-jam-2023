import { Config } from "../data/Config";
import { GameScene } from "../scenes/GameScene";
import { LogMng } from "../utils/LogMng";
import { MyMath } from "../utils/MyMath";
import { GameObject } from "./GameObject";

export class Asteroid extends GameObject {
    private _parent;
    private _scale = 1;
    scene: GameScene;
    image;
    direction: number;
    texture: string;
    destroyTimer;
    // size: number;
    hp: number = 100;
    mass: number = 100;

    constructor(scene: GameScene, x, y, hp: number, scale: number, parent) {
        super();
        this.scene = scene;
        this._parent = parent;
        // this.size = size;
        this.hp = hp;
        this._scale = scale;
        this.mass = this._scale * 10;
        // this.direction = direction;
        
        this.texture = `asteroids/meteorBrown_big${MyMath.randomIntInRange(1, 4)}`;
        this.createBody(x, y, null);
    }

    createBody(x, y, velocity) {
        this.image = this.scene.asteroids.create(x, y, 'game', this.texture);
            // .setVelocityX(velocity * Math.cos(this.direction))
            // .setVelocityY(velocity * Math.sin(this.direction));
        this.image.setScale(this._scale);
        let newSize = {
            x: this.image.body.width * .8,
            y: this.image.body.height * .8
        }
        this.image.body.setSize(newSize.x, newSize.y);
        this.image.object = this;
        // this.image.body.mass = this.mass;
        // this.image.body.height *= .8;
        this.image.body.rotation = MyMath.randomInRange(0, Math.PI * 2);
        this._parent.add(this.image);
    }

    hit(aDamage: number) {
        LogMng.debug(`Asteroid dmg ${aDamage}`);
        this.hp -= aDamage;
    }

    free() {
        if (this.image) this.image.destroy();
    }

    private updateMoving(dt: number) {
        let df = Config.GAME.DAMP_FACTOR;
        try {
            this.image.body.velocity.x *= df;
            this.image.body.velocity.y *= df;
        } catch (error) {
            
        }
    }

    update(dt: number) {
        this.updateMoving(dt);
    }

}