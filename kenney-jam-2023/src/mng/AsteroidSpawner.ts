import { Asteroid } from "../objects/Asteriod";
import { Ship } from "../objects/Ship";
import { GameScene } from "../scenes/GameScene";
import { MyMath } from "../utils/MyMath";
import { ObjectMng } from "./ObjectMng";

export class AsteroidSpawner extends Phaser.Events.EventEmitter {
    private _scene: GameScene;
    private asterParent;
    private _ship: Ship;
    private _isActive = false;
    private _spawnTimer = 10;
    private _objMng: ObjectMng;

    constructor(aScene: GameScene, aShip: Ship, asterParent) {
        super();
        this._scene = aScene;
        this._ship = aShip;
        this._spawnTimer = this.getSpawnTime();
        this._objMng = ObjectMng.getInstance();
        this.asterParent = asterParent;
    }

    private getSpawnTime(): number {
        const time = [30, 20, 10, 8, 5];
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
        this._objMng.createAsteroid(spawnPos.x, spawnPos.y, this.asterParent, velocity.x, velocity.y);
    }

    private updateSpawn(dt: number) {
        this._spawnTimer -= dt;
        if (this._spawnTimer <= 0) {
            this._spawnTimer = this.getSpawnTime()
            this.spawn();
        }
    }

    update(dt: number) {

        this._isActive = this._ship?.image?.body != null;
        if (!this._isActive) return;
        this.updateSpawn(dt);

    }


}