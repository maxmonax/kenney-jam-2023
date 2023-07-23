import { GameData } from "../data/GameData";
import { GameScene } from "../scenes/GameScene";
import { MyMath } from "../utils/MyMath";
import { GameObject } from "./GameObject";

const LEVELS = [
    {
        level: 1, hp: 1000, income: 0, incomeDelay: 10, damage: 20, cost: 0,
        firePauseDelay: .4, firePoints: [{ x: 40, y: 0 }],
        physics: { w: 200, h: 200 }
    },
    {
        level: 2, hp: 2000, income: 1, incomeDelay: 5, damage: 30, cost: 200,
        firePauseDelay: .3, firePoints: [{ x: 50, y: 0 }],
        physics: { w: 250, h: 250 }
    },
    {
        level: 3, hp: 3000, income: 2, incomeDelay: 5, damage: 40, cost: 500,
        firePauseDelay: .3, firePoints: [{ x: 50, y: -20 }, { x: 50, y: 20 }],
        physics: { w: 300, h: 300 }
    },
    {
        level: 4, hp: 4000, income: 4, incomeDelay: 5, damage: 50, cost: 1000,
        firePauseDelay: .2, firePoints: [{ x: 50, y: -28 }, { x: 50, y: 28 }],
        physics: { w: 400, h: 400 }
    },
    {
        level: 5, hp: 5000, income: 10, incomeDelay: 5, damage: 100, cost: 3000,
        firePauseDelay: .1, firePoints: [{ x: 55, y: -28 }, { x: 55, y: 28 }],
        physics: { w: 500, h: 500 }
    },
];

export class Station extends GameObject {
    private _scene: GameScene;
    private _parent;
    private popTween: Phaser.Tweens.Tween;
    private incomeTimer = 0;
    rotateSpeed = 2;
    level = 1;
    image;
    pointerIsDown = false;
    lines = 1;
    bulletTexture: string;

    constructor(scene: GameScene, x, y, parent) {
        super();
        this._scene = scene;
        this._parent = parent;
        let t = this.getTextureByLevel(1);
        // this.image = this._scene.allies.create(x, y, t.t, t.frame);
        this.image = this._scene.physics.add.image(x, y, t.t, t.frame);
        this._parent.add(this.image);
        this.setLevel(1);
    }

    public get upgradeCost(): number {
        return LEVELS[this.level].cost;
    }

    isMaxLevel(): boolean {
        return this.level == LEVELS.length;
    }

    getTextureByLevel(level: number): {t: string, frame: string} {
        return { t: 'game', frame: `station/level_${level}` };
    }

    setLevel(level: number) {
        if (level > LEVELS.length) return;
        this.level = level;
        let ld = LEVELS[this.level - 1];

        // change sprite
        let t = this.getTextureByLevel(level);
        this.image.setScale(0.1, 0.1);
        this.image.setTexture(t.t, t.frame);
        if (this.popTween) {
            this._scene.tweens.remove(this.popTween);
            this.popTween = null;
        }
        this.popTween = this._scene.tweens.add({
            // targets: [this.body, this.turbine],
            targets: this.image,
            scale: 1,
            duration: 450,
            ease: 'Back.Out'
        });

        this.image.body.setSize(ld.physics.w, ld.physics.h);
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

    updateIncome(dt: number) {
        const params = LEVELS[this.level - 1];
        const income = params.income;
        if (income == 0) return;

        this.incomeTimer -= dt;
        if (this.incomeTimer <= 0) {
            this.incomeTimer += params.incomeDelay;
            
            // do income
            let dx = MyMath.randomIntInRange(-200, 200);
            let dy = MyMath.randomIntInRange(-200, 200);
            let energyText = new Phaser.GameObjects.Text(this._scene, this.image.x + dx, this.image.y + dy, `+${income}`, {
                fontFamily: 'Orbitron',
                color: '#ffcc00',
                align: 'center'
            });
            energyText.setFontSize(60);
            energyText.setOrigin(0.5, 0.5);
            energyText.alpha = 0;
            this._parent.add(energyText);

            this._scene.tweens.add({
                targets: energyText,
                alpha: 1,
                y: this.image.y + dy - 100,
                duration: 1500,
                ease: 'Sine.InOut'
            });
            this._scene.tweens.add({
                targets: energyText,
                alpha: 0,
                duration: 1000,
                delay: 1500 + 500,
                ease: 'Sine.InOut',
                onComplete: () => {
                    energyText.destroy();
                }
            });

            GameData.getInstance().energy += income;

        }
    }

    update(dt: number) {
        this.image.body.rotation += this.rotateSpeed * dt;
        this.updateIncome(dt);
    }

}