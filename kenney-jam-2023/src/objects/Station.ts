import { GameScene } from "../scenes/GameScene";

export class Station {
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
        this._scene = scene;
        this._parent = parent;

        this.image = this._scene.allies.create(x, y, 'game', 'station_1')
            .setDepth(150)
            .setInteractive();
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