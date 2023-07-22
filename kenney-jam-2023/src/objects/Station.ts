import { GameScene } from "../scenes/GameScene";
import { GameObject } from "./GameObject";

const LEVELS = [
    { level: 1, hp: 1000, damage: 20, cost: 0, firePauseDelay: .4, firePoints: [{ x: 40, y: 0 }] },
    { level: 2, hp: 2000, damage: 30, cost: 200, firePauseDelay: .3, firePoints: [{ x: 50, y: 0 }] },
    { level: 3, hp: 3000, damage: 40, cost: 400, firePauseDelay: .3, firePoints: [{ x: 50, y: -20 }, { x: 50, y: 20 }] },
    { level: 4, hp: 4000, damage: 50, cost: 800, firePauseDelay: .2, firePoints: [{ x: 50, y: -28 }, { x: 50, y: 28 }] },
    { level: 5, hp: 5000, damage: 100, cost: 2000, firePauseDelay: .1, firePoints: [{ x: 55, y: -28 }, { x: 55, y: 28 }] },
];

export class Station extends GameObject {
    private _scene: GameScene;
    private _parent;
    rotateSpeed = 2;
    level = 1;
    image;
    pointerIsDown = false;
    lines = 1;
    bulletTexture: string;
    popupTween;
    popupTweenShield;
    lightTween;

    constructor(scene: GameScene, x, y, parent) {
        super();
        this._scene = scene;
        this._parent = parent;
        this.image = this._scene.allies.create(x, y, 'game', 'station/level_1')
        this._parent.add(this.image);
        this.image.invincible = false;
    }

    getTextureByLevel(level: number): {t: string, frame: string} {
        return { t: 'game', frame: `station_${level}` };
    }

    setLevel(level: number) {
        if (level == this.level) return;

        let t = this.getTextureByLevel(level);
        this.image.setTexture(t.t, t.frame);

    }

    kill() {
        // if (ISINFOCUS) {
        this._scene.sound.play('boom', { volume: 1 });
        // }
        this.image.alive = false;

        this._scene.tweens.add({
            targets: [this.image],
            alpha: 0,
            scale: 0,
            x: this.image.x - 100 + 200 * Math.random(),
            y: this.image.y - 100 + 200 * Math.random(),
            rotation: -1 + 2 * Math.random(),
            duration: 1000,
            ease: 'Circ.Out',
            onComplete: () => {
                this.image.destroy();
            }
        });
        if (this.image.shoot) {
            this.image.shoot.remove();
        }
    }

    update(dt: number) {
        this.image.body.rotation += this.rotateSpeed * dt;
    }

}