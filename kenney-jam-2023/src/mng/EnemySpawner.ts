import { EnemyController } from "../controls/EnemyController";
import { Asteroid } from "../objects/Asteriod";
import { Ship } from "../objects/Ship";
import { GameScene } from "../scenes/GameScene";
import { MyMath } from "../utils/MyMath";
import { ObjectMng } from "./ObjectMng";

export class EnemySpawner extends Phaser.Events.EventEmitter {
    private _scene: GameScene;
    private _parent;
    private _ship: Ship;
    private _isActive = false;
    private _spawnTimer = 10;
    private _objMng: ObjectMng;
    private _controllers: EnemyController[];

    constructor(aScene: GameScene, aShip: Ship, parent) {
        super();
        this._scene = aScene;
        this._ship = aShip;
        this._spawnTimer = this.getSpawnTime();
        this._objMng = ObjectMng.getInstance();
        this._parent = parent;
        this._controllers = [];
    }

    private getSpawnTime(): number {
        const time = [120, 90, 80, 70, 60];
        return time[this._ship.level - 1];
    }

    private spawn() {
        let dir = new Phaser.Math.Vector2(1, 0);
        dir.rotate(MyMath.randomInRange(0, Math.PI * 2));
        let spawnDist = MyMath.randomInRange(1500, 2500);
        let spawnPos = dir.clone().scale(spawnDist);
        let velocity = spawnPos.clone().negate().scale(MyMath.randomInRange(.2, .6));
        spawnPos.x += this._ship.image.x;
        spawnPos.y += this._ship.image.y;
        this.spawnEnemy(spawnPos.x, spawnPos.y);
    }

    private updateSpawn(dt: number) {
        this._spawnTimer -= dt;
        if (this._spawnTimer <= 0) {
            this._spawnTimer = this.getSpawnTime()
            this.spawn();
        }
    }

    spawnEnemy(x, y) {
        let enemy = this._objMng.createEnemy(x, y, this._parent);
        let ctrl = new EnemyController(this._scene, enemy);
        ctrl.enemy = this._ship;
        this._controllers.push(ctrl);
    }

    update(dt: number) {
        this.updateSpawn(dt);

        for (let i = 0; i < this._controllers.length; i++) {
            const ctrl = this._controllers[i];
            ctrl.update(dt);
        }
    }


}