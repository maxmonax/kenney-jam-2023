import { Config } from "../data/Config";
import { Asteroid } from "../objects/Asteriod";
import { EnemyShip } from "../objects/EnemyShip";
import { GameObject } from "../objects/GameObject";
import { GameScene } from "../scenes/GameScene";
import { MyMath } from "../utils/MyMath";

export class ObjectMng {
    private static _instance: ObjectMng;
    private _scene: GameScene;
    private _objects: GameObject[];

    private constructor() {
        if (ObjectMng._instance) throw new Error("Double using DebugGui.constructor()!");
        this._objects = [];
    }

    static getInstance() {
        if (!this._instance) this._instance = new ObjectMng();
        return this._instance;
    }

    private destroyObjects() {
    for (let i = this._objects.length - 1; i >= 0; i--) {
        const obj = this._objects[i];
        obj.free();
    }
    this._objects = [];
    }

    init(aScene: GameScene) {
        this.destroyObjects();
        this._scene = aScene;
    }

    clear() {
        this.destroyObjects();
    }

    addObject(obj: GameObject) {
        this._objects.push(obj);
    }

    createAsteroid(x, y, parent, vx?: number, vy?: number): Asteroid {
        const wr = Config.GAME.WORLD_RADIUS;
        let pos = new Phaser.Math.Vector2(x, y);
        let distPerc = MyMath.getVec2Length(0, 0, x, y) / wr;
        let hp = distPerc * Config.ASTEROIDS.MAX_HP;
        let scale = 1 + MyMath.randomInRange(distPerc * 3.5, distPerc * 4);
        // let size = Math.trunc(distPerc * 3) + 1;
        // LogMng.debug(`aster hp: ${hp}`);
        let aster = new Asteroid(this._scene, x, y, hp, scale, parent);
        if (vx) aster.image.body.velocity.x = vx;
        if (vy) aster.image.body.velocity.y = vy;
        this._objects.push(aster);
        return aster;
    }

    createEnemy(x, y, parent, level): EnemyShip {
        let ship = new EnemyShip(this._scene, x, y, parent, level);
        this.addObject(ship);
        return ship;
    }

    update(dt: number) {
        for (let i = this._objects.length - 1; i >= 0; i--) {
            const obj = this._objects[i];
            if (obj.destroyed) {
                this._objects.splice(i, 1);
            }
            else {
                obj.update(dt);
            }
        }
    }

}