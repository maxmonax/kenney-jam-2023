import { GameScene } from "../scenes/GameScene";
import { LogMng } from "../utils/LogMng";
import { GameObject } from "./GameObject";

const LEVELS = [
    {
        level: 1, hp: 150, damage: 20, cost: 0, shootPauseDelay: .4,
        shootPoints: [{ x: 40, y: 0 }],
        firePoints: [{ x: -30, y: -20 }, { x: -30, y: 20 }]
    },
    {
        level: 2, hp: 300, damage: 30, cost: 50, shootPauseDelay: .3,
        shootPoints: [{ x: 50, y: 0 }],
        firePoints: [{ x: -40, y: 0 }]
    },
    {
        level: 3, hp: 500, damage: 40, cost: 150, shootPauseDelay: .3,
        shootPoints: [{ x: 50, y: -20 }, { x: 50, y: 20 }],
        firePoints: [{ x: -30, y: -15 }, { x: -30, y: 15 }]
    },
    {
        level: 4, hp: 1000, damage: 50, cost: 300, shootPauseDelay: .2,
        shootPoints: [{ x: 50, y: -28 }, { x: 50, y: 28 }],
        firePoints: [{ x: -30, y: -15 }, { x: -30, y: 15 }],
        fireYScale: .8
    },
    {
        level: 5, hp: 2000, damage: 80, cost: 1000, shootPauseDelay: .1,
        shootPoints: [{ x: 55, y: -28 }, { x: 55, y: 28 }],
        firePoints: [{ x: -55, y: -40 }, { x: -55, y: 40 }],
        fireYScale: 1.2
    },
];

export class Ship extends GameObject {
    private _scene: GameScene;
    private _parent;
    private _level = 1;
    private popTween: Phaser.Tweens.Tween;
    private _fireImages: Phaser.GameObjects.Image[];
    private _fireDummy: Phaser.GameObjects.Container;
    private _fireTexture = 'effects/fire18';
    private _fireTargetScale = 0;
    image;
    // bulletTexture = 'effects/fire18';
    bulletTexture = 'bullets/laserBlue02';
    hp = 100;

    constructor(scene: GameScene, x, y, parent) {
        super();
        this._scene = scene;
        this._parent = parent;
        this._fireImages = [];
        this._fireDummy = this._scene.add.container();
        this._parent.add(this._fireDummy);
        this.initHero(x, y);
        this.initFires();
        this.setLevel(1);
    }

    private initHero(x, y) {
        this.image = this._scene.allies.create(x, y, 'game', this.getFrameByLevel(1));
        this.image.object = this;
        this._parent.add(this.image);
        // this.image.invincible = false;
    }

    private destroyFires() {
        for (let i = 0; i < this._fireImages.length; i++) {
            this._fireImages[i].destroy();
        }
        this._fireImages = [];
    }

    private initFires() {
        this.destroyFires();
        // create new
        let points = LEVELS[this._level - 1].firePoints;
        let fscale = LEVELS[this._level - 1].fireYScale;
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            let fireImg = new Phaser.GameObjects.Image(this._scene, p.x, p.y, 'game', this._fireTexture);
            fireImg.setOrigin(1, .5);
            fireImg.setScale(0, fscale != null ? fscale : 1);
            this._fireDummy.add(fireImg);
            this._fireImages.push(fireImg);
        }
    }

    private getFrameByLevel(aLevel: number): string {
        return `hero/level_${this._level}`;
    }

    public get level(): number {
        return this._level;
    }

    public get shootPauseDelay(): number {
        return LEVELS[this._level - 1].shootPauseDelay;
    }

    public get damage(): number {
        return LEVELS[this._level - 1].damage;
    }
    
    public get upgradeCost(): number {
        return LEVELS[this._level].cost;
    }

    public set gas(v: boolean) {
        this._fireTargetScale = v ? 1 : 0;
    }

    isMaxLevel(): boolean {
        return this._level == LEVELS.length;
    }

    getFireOffsets(): any[] {
        return LEVELS[this._level - 1].shootPoints;
    }

    setLevel(aLevel: number) {
        if (aLevel > LEVELS.length) return;
        // if (this._level == aLevel) return;
        LogMng.debug(`ship set level: ${aLevel}`);
        this._level = aLevel;
        this.hp = LEVELS[this._level - 1].hp;

        // change sprite
        this.image.setScale(1.5, 1.5);
        this.image.setTexture('game', this.getFrameByLevel(this._level))
        if (this.popTween) this._scene.tweens.remove(this.popTween);
        this.popTween = this._scene.tweens.add({
            targets: [this.image, this._fireDummy],
            scale: 1,
            duration: 450,
            ease: 'Back.Out'
        });

        this.initFires();

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

    update(dt: number) {
        // let inputPos = this._scene.cameras.main.getWorldPoint(this._scene.input.x, this._scene.input.y);
        // inputPos.x = Math.max(-750, Math.min(750, inputPos.x));
        this._fireDummy.x = this.image.x;
        this._fireDummy.y = this.image.y;
        this._fireDummy.rotation = this.image.rotation;

        for (let i = 0; i < this._fireImages.length; i++) {
            const img = this._fireImages[i];
            img.scaleX += (this._fireTargetScale - img.scaleX) * dt * 2;
        }
    }

}