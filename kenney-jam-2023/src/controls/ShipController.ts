import { Bullet } from "../objects/Bullet";
import { PlayerShip } from "../objects/PlayerShip";
import { GameScene } from "../scenes/GameScene";
import { AudioAlias } from "../sound/SndMng";

var ACCELERATION = 300;
var DAMP_FACTOR = .995;
var ROTATION_SPEED = Math.PI / 1;
var ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
var TOLERANCE = 0.02 * ROTATION_SPEED;

export class ShipController {
    private _scene: GameScene;
    private _ship: PlayerShip;
    private _timerFire = 0;

    private _keyW: Phaser.Input.Keyboard.Key;
    private _keyA: Phaser.Input.Keyboard.Key;
    private _keyD: Phaser.Input.Keyboard.Key;
    private _keySpace: Phaser.Input.Keyboard.Key;

    constructor(scene: GameScene, ship: PlayerShip) {
        this._scene = scene;
        this._ship = ship;

        this._keyW = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this._keyA = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this._keyD = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this._keySpace = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // this._scene.input
        //     .on('pointermove', (p, obj) => {
        //         // this._lookPointer = p;
        //     })
        //     .on('pointerdown', (atr1, atr2, atr3) => {
        //         // debugger;
        //         // this.pointerIsDown = true;
        //     })
        //     .on('pointerup', () => {
        //         // debugger;
        //         // this.pointerIsDown = false;
        //     });

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

    updateMoving(dt: number) {
        if (this._keyW.isDown) {
            this._scene.physics.velocityFromRotation(this._ship.image.rotation, ACCELERATION, this._ship.image.body.acceleration);
        }
        else {
            this._ship.image.body.acceleration.x = 0;
            this._ship.image.body.acceleration.y = 0;
        }

        this._ship.image.body.velocity.x *= DAMP_FACTOR;
        this._ship.image.body.velocity.y *= DAMP_FACTOR;
    }

    updateTurning(dt: number) {
        let turnToLeft = this._keyA.isDown;
        let turnToRight = this._keyD.isDown;
        if (turnToLeft && turnToRight) turnToLeft = turnToRight = false;
        if (turnToLeft) this._ship.image.rotation -= ROTATION_SPEED * dt;
        if (turnToRight) this._ship.image.rotation += ROTATION_SPEED * dt;
    }

    updateFire(dt: number) {
        // if (ISINFOCUS) 

        this._timerFire -= dt;
        if (this._timerFire > 0) return;
        if (!this._keySpace.isDown) return;

        this._timerFire = this._ship.fireFreq;

        this._scene.sound.play(AudioAlias.laserSmall_001, { volume: 0.5 });

        let dir = this._scene.physics.velocityFromRotation(this._ship.image.rotation, 1);
        let fOff = new Phaser.Math.Vector2(this._ship.fireOffset.x, this._ship.fireOffset.y);
        fOff.rotate(dir.angle());

        let lines = this._ship.lines;
        let velocity = 800 + this._ship.image.body.velocity.length();

        for (let i = 0; i < lines; i++) {
            new Bullet(this._scene,
                this._ship.image.x + fOff.x,
                this._ship.image.y + fOff.y,
                this._ship.image.rotation,
                velocity,
                this._ship.bulletTexture
            );
        }

        
    }

    update(dt: number) {

        this.updateMoving(dt);
        this.updateTurning(dt);
        this.updateFire(dt);

    }

}