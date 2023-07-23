import { Config } from "../data/Config";
import { Bullet } from "../objects/Bullet";
import { EnemyShip } from "../objects/EnemyShip";
import { GameObject } from "../objects/GameObject";
import { Ship } from "../objects/Ship";
import { GameScene } from "../scenes/GameScene";
import { AudioAlias } from "../sound/SndMng";
import { LogMng } from "../utils/LogMng";
import { MyMath } from "../utils/MyMath";

var ACCELERATION = 300;
var ROTATION_SPEED = Math.PI / 3;
var ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
var TOLERANCE = 0.02 * ROTATION_SPEED;

export class EnemyController {
    private _scene: GameScene;
    private _ship: EnemyShip;
    private _timerFire = 0;
    private _enemy: Ship;
    
    constructor(scene: GameScene, ship: EnemyShip) {
        this._scene = scene;
        this._ship = ship;
    }
    
    public set enemy(v: Ship) {
        this._enemy = v;
    }

    pointerMove(pointer) {
        var angleToPointer = Phaser.Math.Angle.Between(this._ship.image.x, this._ship.image.y,
            pointer.worldX, pointer.worldY);
        var angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - this._ship.image.rotation);

        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TOLERANCE)) {
            this._ship.image.rotation = angleToPointer;
            this._ship.image.setAngularVelocity(0);
        } else {
            this._ship.image.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES);
        }
    }

    private seek(aTarget: Phaser.Math.Vector2): Phaser.Math.Vector2 {
        // let force = aTarget.clone().subtract(this._ship.image.body.position);
        // force.setLength(this._car.maxSpeed); // setMag
        // force.sub(this._car.velocity);
        // force.clampLength(0, this._car.maxForce); // limit
        // return force;
        return null;
    }

    updateLogic(dt: number) {
        let isEnemy = this._enemy != null;
        if (!isEnemy) return;

        let dist = MyMath.getVec2Length(this._ship.image.x, this._ship.image.y,
            this._enemy.image.x, this._enemy.image.y);
        // LogMng.debug(`dist: ${dist}`);

        let isAttack = dist <= 900;
        let isForward = dist > 500 && dist < 2000;
        if (isForward) {
            this._scene.physics.velocityFromRotation(this._ship.image.rotation, ACCELERATION, this._ship.image.body.acceleration);
        }
        else {
            this._ship.image.body.acceleration.x = 0;
            this._ship.image.body.acceleration.y = 0;
        }

        this._ship.gas = isForward;

        // rotation

        let angleToPointer = Phaser.Math.Angle.Between(this._ship.image.x, this._ship.image.y,
            this._enemy.image.x, this._enemy.image.y);
        let angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - this._ship.image.rotation);
        // LogMng.debug(`angleToPointer: ${angleToPointer}`);
        // LogMng.debug(`angleDelta: ${angleDelta}`);
        
        if (dist < 2000) {
            if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TOLERANCE)) {
                this._ship.image.rotation = angleToPointer;
                this._ship.image.setAngularVelocity(0);
            }
            else {
                this._ship.image.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES);
            }
        }

        if (isAttack && angleDelta <= Math.PI / 6) {
            this.updateFire(dt);
        }

        // dumping

        let df = Config.GAME.DAMP_FACTOR;
        this._ship.image.body.velocity.x *= df;
        this._ship.image.body.velocity.y *= df;
    }

    updateTurning(dt: number) {
        // let turnToLeft = this._keyA.isDown;
        // let turnToRight = this._keyD.isDown;
        // if (turnToLeft && turnToRight) turnToLeft = turnToRight = false;
        // if (turnToLeft) this._ship.image.rotation -= ROTATION_SPEED * dt;
        // if (turnToRight) this._ship.image.rotation += ROTATION_SPEED * dt;
    }

    updateFire(dt: number) {

        this._timerFire -= dt;
        if (this._timerFire > 0) return;

        this._timerFire = this._ship.shootPauseDelay;
        
        this._scene.sound.play(AudioAlias.laserSmall_001, { volume: 0.5 });

        let dir = this._scene.physics.velocityFromRotation(this._ship.image.rotation, 1);
        let firePoints = this._ship.getFireOffsets();
        let velocity = 600 + this._ship.image.body.velocity.length();

        for (let i = 0; i < firePoints.length; i++) {
            let fp = firePoints[i];
            let fOff = new Phaser.Math.Vector2(fp.x, fp.y);
            fOff.rotate(dir.angle());
            new Bullet(this._scene,
                this._ship.image.x + fOff.x,
                this._ship.image.y + fOff.y,
                this._ship.damage,
                this._ship.image.rotation,
                velocity,
                this._ship.bulletTexture,
                true
            );
        }

        
    }

    update(dt: number) {

        if (!this._ship.alive) return;

        this.updateLogic(dt);

        // check ship hp
        if (this._ship.hp <= 0) {
            this._ship.kill();
        }

    }

}