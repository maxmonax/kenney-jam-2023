import { GameScene } from "../scenes/GameScene";
import { LogMng } from "../utils/LogMng";
import { GameObject } from "./GameObject";

const MAX_LEVEL = 5;

const LEVELS = [
    { level: 1, hp: 150, damage: 20, cost: 0, firePauseDelay: .4, firePoints: [{ x: 40, y: 0 }] },
    { level: 2, hp: 300, damage: 30, cost: 50, firePauseDelay: .3, firePoints: [{ x: 50, y: 0 }] },
    { level: 3, hp: 500, damage: 40, cost: 150, firePauseDelay: .3, firePoints: [{ x: 50, y: -20 }, { x: 50, y: 20 }] },
    { level: 4, hp: 1000, damage: 50, cost: 300, firePauseDelay: .2, firePoints: [{ x: 50, y: -28 }, { x: 50, y: 28 }] },
    { level: 5, hp: 2000, damage: 80, cost: 1000, firePauseDelay: .1, firePoints: [{ x: 55, y: -28 }, { x: 55, y: 28 }] },
];

export class Ship extends GameObject {
    private _scene: GameScene;
    private _parent;
    image;

    private _level = 1;
    
    bulletTexture = 'effects/fire18';
    popTween: Phaser.Tweens.Tween;
    lightTween;

    hp = 100;

    constructor(scene: GameScene, x, y, parent) {
        super();
        this._scene = scene;
        this._parent = parent;
        this.initHero(x, y);
        this.setLevel(1);
    }

    private initHero(x, y) {
        this.image = this._scene.allies.create(x, y, 'game', this.getFrameByLevel(1));
        this.image.object = this;
        this._parent.add(this.image);
        // this.image.invincible = false;
    }

    private getFrameByLevel(aLevel: number): string {
        return `hero/level_${this._level}`;
    }

    public get level(): number {
        return this._level;
    }

    public get firePauseDelay(): number {
        return LEVELS[this._level - 1].firePauseDelay;
    }

    public get damage(): number {
        return LEVELS[this._level - 1].damage;
    }

    getFireOffsets(): any[] {
        return LEVELS[this._level - 1].firePoints;
    }

    setLevel(aLevel: number) {
        if (aLevel > MAX_LEVEL) return;
        // if (this._level == aLevel) return;
        LogMng.debug(`ship set level: ${aLevel}`);
        this._level = aLevel;
        this.hp = LEVELS[this._level - 1].hp;

        // change sprite
        this.image.setScale(1.5, 1.5);
        this.image.setTexture('game', this.getFrameByLevel(this._level))
        if (this.popTween) this._scene.tweens.remove(this.popTween);
        this.popTween = this._scene.tweens.add({
            // targets: [this.body, this.turbine],
            targets: [this.image],
            scale: 1,
            duration: 450,
            ease: 'Back.Out'
        });
    }

    hit(aDamage: number) {
        LogMng.debug(`Ship Damage: ${aDamage}`);
        this.hp -= aDamage;
    }

    kill() {
        // if (ISINFOCUS) {
        this._scene.sound.play('boom', { volume: 1 });
        // }
        this.image.alive = false;
        // this.turbine.destroy();
        // this.body.unShield();
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
                // this.protection.destroy();
            }
        });
        if (this.image.shoot) {
            this.image.shoot.remove();
        }
    }

    update(dt) {
        let inputPos = this._scene.cameras.main.getWorldPoint(this._scene.input.x, this._scene.input.y);
        inputPos.x = Math.max(-750, Math.min(750, inputPos.x));
        if (this.image.texture.key !== 'red' && this.image.texture.key !== 'purple') {
            // this.turbine.setPosition(this.body.x, this.body.y + this.body.height / 2 - 10);
        }
        else {
            // this.turbine.setPosition(this.body.x, this.body.y + this.body.height / 2 - 25);
        }
        // this.protection.setPosition(this.body.x, this.body.y);
    }

}