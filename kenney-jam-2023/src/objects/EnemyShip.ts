import { HpBar } from "../gui/game/HpBar";
import { GameScene } from "../scenes/GameScene";
import { AudioAlias } from "../sound/SndMng";
import { LogMng } from "../utils/LogMng";
import { MyMath } from "../utils/MyMath";
import { GameObject } from "./GameObject";

const LEVELS = [
    {
        frame: 'enemies/spaceShips_001',
        level: 1, hp: 150, damage: 20, cost: 0, shootPauseDelay: .8,
        shootPoints: [{ x: 40, y: 0 }],
        firePoints: [{ x: -30, y: -20 }, { x: -30, y: 20 }],
        physics: { w: 100, h: 100 }
    },
    {
        frame: 'enemies/spaceShips_001',
        level: 2, hp: 300, damage: 30, cost: 50, shootPauseDelay: .6,
        shootPoints: [{ x: 50, y: 0 }],
        firePoints: [{ x: -40, y: 0 }],
        physics: { w: 100, h: 100 }
    },
    {
        frame: 'enemies/spaceShips_001',
        level: 3, hp: 500, damage: 40, cost: 150, shootPauseDelay: .6,
        shootPoints: [{ x: 50, y: -20 }, { x: 50, y: 20 }],
        firePoints: [{ x: -30, y: -15 }, { x: -30, y: 15 }],
        physics: { w: 100, h: 100 }
    },
    {
        frame: 'enemies/spaceShips_001',
        level: 4, hp: 1000, damage: 50, cost: 300, shootPauseDelay: .4,
        shootPoints: [{ x: 50, y: -28 }, { x: 50, y: 28 }],
        firePoints: [{ x: -30, y: -15 }, { x: -30, y: 15 }],
        fireYScale: .8,
        physics: { w: 100, h: 100 }
    },
    {
        frame: 'enemies/spaceShips_001',
        level: 5, hp: 2000, damage: 80, cost: 1000, shootPauseDelay: .2,
        shootPoints: [{ x: 55, y: -28 }, { x: 55, y: 28 }],
        firePoints: [{ x: -55, y: -40 }, { x: -55, y: 40 }],
        fireYScale: 1.2,
        physics: { w: 120, h: 120 }
    },
];

const HP_DY = 80;

export class EnemyShip extends GameObject {
    private _scene: GameScene;
    private _parent;
    private _level = 1;
    private popTween: Phaser.Tweens.Tween;
    private _fireImages: Phaser.GameObjects.Image[];
    private _fireDummy: Phaser.GameObjects.Container;
    private _fireTexture = 'effects/fire18';
    private _fireTargetScale = 0;
    private _hpBar: HpBar;
    private _hp = 100;
    bulletTexture = 'bullets/laserRed02';
    image;
    alive = true;

    constructor(scene: GameScene, x, y, parent) {
        super();
        this._scene = scene;
        this._parent = parent;
        this._fireImages = [];
        this._fireDummy = this._scene.add.container();
        this._parent.add(this._fireDummy);
        this.initBody(x, y);
        this.initFires();
        this.setLevel(1);
        this.initHpBar();
    }

    private initBody(x, y) {
        this.image = this._scene.enemies.create(x, y, 'game', this.getFrameByLevel(1));
        this.image.object = this;
        this._parent.add(this.image);
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

    private initHpBar() {
        if (!this._hpBar) {
            this._hpBar = new HpBar(this._scene, this.image.x, this.image.y + HP_DY, 100, 10, 2, 0xcc0000);
        }
        this._hpBar.alpha = 0;
        this._parent.add(this._hpBar);
    }

    private getFrameByLevel(aLevel: number): string {
        return LEVELS[aLevel - 1].frame;
    }
    
    public get hp(): number {
        return this._hp;
    }

    public set hp(v: number) {
        this._hp = v;
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

    maxHp(): number {
        return LEVELS[this._level - 1].hp;
    }

    isMaxHp(): boolean {
        return this._hp >= this.maxHp();
    }

    getFireOffsets(): any[] {
        return LEVELS[this._level - 1].shootPoints;
    }

    setLevel(aLevel: number) {
        if (aLevel > LEVELS.length) return;
        LogMng.debug(`ship set level: ${aLevel}`);
        this._level = aLevel;
        const levelParams = LEVELS[this._level - 1];
        this.hp = levelParams.hp;

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

        this.image.body.setSize(levelParams.physics.w, levelParams.physics.h);

        this.initFires();

    }

    hit(aDamage: number) {
        LogMng.debug(`Ship Damage: ${aDamage}`);
        this._hp -= aDamage;
    }

    kill() {
        // if (ISINFOCUS) {
        // this._scene.sound.play('boom', { volume: 1 });
        // }
        this.alive = false;
        this.destroyFires();

        let expFrame = `particles/scorch_0${MyMath.randomIntInRange(1, 2)}`;
        let particle = this._scene.add.image(this.image.x, this.image.y, 'game', expFrame);
        particle.tint = 0xff7e4b;
        particle.scale = 2;
        this._scene.tweens.add({
            targets: particle,
            alpha: 0,
            scale: 0.5,
            duration: 300,
            ease: 'Sine.InOut',
            onComplete: () => {
                particle.destroy();
                this._destroyed = true;
            }
        });

        this._scene.tweens.add({
            targets: this._hpBar,
            alpha: 0,
            scale: 0,
            duration: 300,
            ease: 'Sine.InOut',
            onComplete: () => {
                this._hpBar.destroy();
                this._hpBar = null;
            }
        });

        this._scene.sound.play(AudioAlias.explosion, { volume: MyMath.randomInRange(.2, .6) });

        this.image.destroy();

    }

    update(dt: number) {
        this._fireDummy.x = this.image.x;
        this._fireDummy.y = this.image.y;
        this._fireDummy.rotation = this.image.rotation;

        if (this._hpBar) {
            const levelParams = LEVELS[this._level - 1];

            if (this.image.body) {
                this._hpBar.x = this.image.body.x + levelParams.physics.w / 2;
                this._hpBar.y = this.image.body.y + levelParams.physics.h / 2 + HP_DY;
            }
            this._hpBar.progress = this._hp / this.maxHp();
            this._hpBar.update(dt);

            let targetAlpha = this.isMaxHp() ? 0 : 1;
            this._hpBar.alpha += (targetAlpha - this._hpBar.alpha) * dt;
        }

        for (let i = 0; i < this._fireImages.length; i++) {
            const img = this._fireImages[i];
            img.scaleX += (this._fireTargetScale - img.scaleX) * dt * 2;
        }
    }

}