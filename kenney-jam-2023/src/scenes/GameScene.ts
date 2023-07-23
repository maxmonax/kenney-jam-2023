import { ShipController } from "../controls/ShipController";
import { Config } from "../data/Config";
import { GameData } from "../data/GameData";
import { DebugGui } from "../debug/DebugGui";
import { GameEvents } from "../events/GameEvents";
import { Asteroid } from "../objects/Asteriod";
import { Bullet } from "../objects/Bullet";
import { Energy } from "../objects/Energy";
import { GameObject } from "../objects/GameObject";
import { Ship } from "../objects/Ship";
import { Station } from "../objects/Station";
import { LogMng } from "../utils/LogMng";
import { MyMath } from "../utils/MyMath";

const CONFIG = {
    ship: {
        startPos: {
            x: 350,
            y: -180
        }
    }
}

export class GameScene extends Phaser.Scene {

    private _dummyBgObjects: Phaser.GameObjects.Container;
    private _dummySpaceObjects: Phaser.GameObjects.Container;
    private _dummyObjects: Phaser.GameObjects.Container;
    // physics
    allies: Phaser.Physics.Arcade.Group;
    bullets: Phaser.Physics.Arcade.Group;
    asteroids: Phaser.Physics.Arcade.Group;
    energy: Phaser.Physics.Arcade.Group;
    enemies: Phaser.Physics.Arcade.Group;
    enemyBullets: Phaser.Physics.Arcade.Group;
    _shipEnergyOverlap;
    _bulletAsteroidsOverlap;
    _allyAsteroidsCollider;
    // objects
    private _objects: GameObject[];
    private _ship: Ship;
    private _station: Station;
    private _shipController: ShipController;
    // effects
    private _asteroidHitEffectEmitter;
    private _asteroidDestroyEffectEmitter;

    constructor() {
        super({ key: 'GameScene' });
    }

    public init(aData: any) {
        this._objects = [];
        let gd = GameData.getInstance();
        gd.energy = 0;
    }

    public preload(): void {
        this.load.audio('btn', ['./assets/audio/btn.mp3']);
    }

    public create(): void {

        this.initEffects();

        let bg = this.add.group({
            key: 'game',
            frame: 'effects/star2',
            frameQuantity: 2000
        });
        let rect = new Phaser.Geom.Rectangle(-Config.GW * 10, -Config.GH * 10, Config.GW * 20, Config.GH * 20);
        Phaser.Actions.RandomRectangle(bg.getChildren(), rect);

        this._dummyBgObjects = this.add.container();
        this._dummySpaceObjects = this.add.container();
        this._dummyObjects = this.add.container();

        this.allies = this.physics.add.group();
        this.bullets = this.physics.add.group();
        this.asteroids = this.physics.add.group();
        this.energy = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();

        this.generateAsteroid();

        this._station = new Station(this, 0, 0, this._dummyBgObjects);
        this._objects.push(this._station);

        this._ship = new Ship(this, CONFIG.ship.startPos.x, CONFIG.ship.startPos.y, this._dummyObjects);
        this._objects.push(this._ship);

        this.cameras.main.centerOn(0, 0);
        this.cameras.main.startFollow(this._ship.image, false);
        this.cameras.main.setBackgroundColor(0x0d0019);

        this._shipController = new ShipController(this, this._ship);

        // init game data
        let gd = GameData.getInstance();
        gd.ship = this._ship;
        gd.station = this._station;

        this.initPhysics();
        this.initDebug();

        // events
        GameEvents.getInstance().emit(GameEvents.GAME_OPEN);
        this.events.on('shutdown', () => {
            this.onSceneShutdown();
        });

        GameEvents.getInstance().on(GameEvents.GUI_MENU_PRESSED, () => {
            LogMng.debug('GameScene: GUI_MENU_PRESSED');
            this.scene.start('MenuScene');
        }, this);

        // this._ship = new Ship(this, CONFIG.ship.startPos.x, CONFIG.ship.startPos.x
        GameEvents.getInstance().on(GameEvents.GUI_TELEPORT_PRESSED, () => {
            LogMng.debug('GameScene: GUI_TELEPORT_PRESSED');
            this._ship.image.body.velocity.x *= 0.1;
            this._ship.image.body.velocity.y *= 0.1;
            this._ship.image.x = CONFIG.ship.startPos.x;
            this._ship.image.y = CONFIG.ship.startPos.y;
        }, this);

        GameEvents.getInstance().on(GameEvents.GUI_SHIP_UP, () => {
            let cost = this._ship.upgradeCost;
            this._ship.setLevel(this._ship.level + 1);
            gd.energy -= cost;
        }, this);

        GameEvents.getInstance().on(GameEvents.GUI_STATION_UP, () => {
            let cost = this._station.upgradeCost;
            this._station.setLevel(this._station.level + 1);
            gd.energy -= cost;
        }, this);

    }

    private initEffects() {
        this._asteroidHitEffectEmitter = this.add.particles(0, 0, 'game', {
            frame: ['asteroids/meteorBrown_tiny1', 'asteroids/meteorBrown_tiny2'],
            scale: { start: 1, end: .5 },
            alpha: { start: 1, end: 0 },
            rotate: { start: 360 * Math.random(), end: 360 * Math.random() },
            speed: { min: 100, max: 200 },
            lifespan: 350,
            emitting: false
        });
        this._asteroidDestroyEffectEmitter = this.add.particles(0, 0, 'game', {
            frame: ['asteroids/meteorBrown_med1', 'asteroids/meteorBrown_med3',
                'asteroids/meteorBrown_small1', 'asteroids/meteorBrown_small2'],
            scale: { start: 1, end: 0 },
            alpha: { start: 1, end: 1 },
            rotate: { start: 360 * Math.random(), end: 360 * Math.random() },
            speed: { min: 150, max: 300 },
            lifespan: 800,
            emitting: false
        });
    }

    private initPhysics() {

        this._shipEnergyOverlap = this.physics.add.overlap(this.allies, this.energy, (aShipImage: any, aEnergyImage: any) => {
            let ship = aShipImage.object as Ship;
            let energy = aEnergyImage.object as Energy;
            energy.free();
            GameData.getInstance().energy += energy.value;
        });

        this._bulletAsteroidsOverlap = this.physics.add.overlap(this.bullets, this.asteroids, (aBulletImage: any, aAsteroidImage: any) => {
            let bullet = aBulletImage.object as Bullet;
            let asteroid = aAsteroidImage.object as Asteroid;
            this._asteroidHitEffectEmitter.explode(20, aBulletImage.x, aBulletImage.y);
            asteroid.hit(bullet.damage);
            bullet.free();
            if (asteroid.hp <= 0) this.destroyAsteroid(aAsteroidImage);
        });

        this._allyAsteroidsCollider = this.physics.add.collider(this.allies, this.asteroids, (aAllyImage: any, aAsteroidImage: any) => {
            let ship = aAllyImage.object as Ship;
            let asteroid = aAsteroidImage.object as Asteroid;
            let vel1: Phaser.Math.Vector2 = aAllyImage.body.velocity;
            let vel2: Phaser.Math.Vector2 = aAsteroidImage.body.velocity;
            let hitPower = vel1.clone().add(vel2.clone().negate()).length();
            let hitFactor = hitPower / 100;
            LogMng.debug(`hit power: ${hitPower}`);
            let effectPos = {
                x: (aAllyImage.x + aAsteroidImage.x) / 2,
                y: (aAllyImage.y + aAsteroidImage.y) / 2
            }
            if (hitPower > 50) this._asteroidHitEffectEmitter.explode(10, effectPos.x, effectPos.y);
            asteroid.hit(ship.damage / 10 * hitFactor);
            ship.hit(hitPower * asteroid.mass / 100);
            // aAllyImage.destroy();

            if (asteroid.hp <= 0) this.destroyAsteroid(aAsteroidImage);
        });

    }

    private destroyAsteroid(aAsteroidImage) {
        let asteroid = aAsteroidImage.object as Asteroid;
        let x = aAsteroidImage.x;
        let y = aAsteroidImage.y;
        let enCnt = Math.trunc(asteroid.scale) + MyMath.randomIntInRange(1, 3);
            
        this._asteroidDestroyEffectEmitter.explode(10, aAsteroidImage.x, aAsteroidImage.y);
        // aAsteroidImage.destroy();
        asteroid.free();

        // energy drop
        for (let i = 0; i < enCnt; i++) {
            let energy = new Energy(this, x, y, this._dummyBgObjects, enCnt);
            this._objects.push(energy);
        }
    }

    private generateAsteroid() {
        const wr = Config.GAME.WORLD_RADIUS;
        for (let i = 0; i < Config.ASTEROIDS.COUNT; i++) {
            let v2 = new Phaser.Math.Vector2(MyMath.randomInRange(-1, 1), MyMath.randomInRange(-1, 1));
            v2.normalize().scale(MyMath.randomInRange(1000, wr));
            let distPerc = v2.length() / wr;
            let hp = distPerc * Config.ASTEROIDS.MAX_HP;
            let scale = 1 + MyMath.randomInRange(distPerc * 3.5, distPerc * 4);
            // let size = Math.trunc(distPerc * 3) + 1;
            // LogMng.debug(`aster hp: ${hp}`);
            let aster = new Asteroid(this, v2.x, v2.y, hp, scale, this._dummySpaceObjects);
            this._objects.push(aster);
        }
    }
    private initDebug() {
        const OBJ = {
            shipLevelUp: () => {
                this._ship.setLevel(this._ship.level + 1);
            },
            stationLevelUp: () => {
                this._station.setLevel(this._station.level + 1);
            },
            addEnergy: () => {
                GameData.getInstance().energy += 500;
            }
        }
        let gui = DebugGui.getInstance().gui;
        gui.add(OBJ, 'shipLevelUp');
        gui.add(OBJ, 'stationLevelUp');
        gui.add(OBJ, 'addEnergy');
    }

    private onSceneShutdown() {

        GameEvents.getInstance().emit(GameEvents.GAME_CLOSE);
        this.allies.destroy();
        this.bullets.destroy();
        this.asteroids.destroy();
        this.energy.destroy();
        this.enemies.destroy();
        this.enemyBullets.destroy();

        // objects
        for (let i = this._objects.length - 1; i >= 0; i--) {
            const obj = this._objects[i];
            obj.free();
        }
        this._objects = [];
        this._ship = null;
        this._station = null;
        this._shipController = null;

        // effects
        this._asteroidHitEffectEmitter.destroy();
        this._asteroidDestroyEffectEmitter.destroy();

    }

    update(allTime: number, dtMs: number) {
        // get dt in Sec
        let dt = dtMs * 0.001;

        this._shipController?.update(dt);

        for (let i = this._objects.length - 1;  i >= 0; i--) {
            const obj = this._objects[i];
            if (obj.destroyed) {
                this._objects.splice(i, 1);
            }
            else {
                obj.update(dt);
            }
        }

        let gd = GameData.getInstance();
        let shipDist = MyMath.getVec2Length(0, 0, this._ship.image.x, this._ship.image.y);
        gd.teleportAvailable = shipDist > 1500;
        gd.upBtnsAvailable = shipDist <= 1000;

        // this._gui.update(dt);

    }

}