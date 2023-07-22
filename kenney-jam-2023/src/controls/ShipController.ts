import { PlayerShip } from "../objects/PlayerShip";

var MAX_SPEED = 300;
var ACCEL_FACTOR = 1;
var ROTATION_SPEED = Math.PI / 1; // 0.5 turn per sec, 2 sec per turn
var ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
var TOLERANCE = 0.02 * ROTATION_SPEED;

export class ShipController {
    private _scene: Phaser.Scene;
    private _ship: PlayerShip;
    private _lookPointer;
    private _keyW: Phaser.Input.Keyboard.Key;
    private _keyA: Phaser.Input.Keyboard.Key;
    private _keyD: Phaser.Input.Keyboard.Key;
    private _keySpace: Phaser.Input.Keyboard.Key;

    // targetSpd = 0;
    // currentSpd = 0;
    velocity = {x: 0, y: 0};

    constructor(scene: Phaser.Scene, ship: PlayerShip) {
        this._scene = scene;
        this._ship = ship;

        this._keyW = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this._keyA = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this._keyD = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this._keySpace = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this._scene.input
            .on('pointermove', (p, obj) => {
                // debugger;
                this._lookPointer = p;
            })
            .on('pointerdown', (atr1, atr2, atr3) => {
                // debugger;
                // this.pointerIsDown = true;
            })
            .on('pointerup', () => {
                // debugger;
                // this.pointerIsDown = false;
            });

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

    updateTurning(dt: number) {
        let turnToLeft = this._keyA.isDown;
        let turnToRight = this._keyD.isDown;
        if (turnToLeft && turnToRight) turnToLeft = turnToRight = false;
        if (turnToLeft) this._ship.image.rotation -= ROTATION_SPEED * dt;
        if (turnToRight) this._ship.image.rotation += ROTATION_SPEED * dt;
    }

    update(dt: number) {

        if (this._keyW.isDown) {
            this._scene.physics.velocityFromRotation(this._ship.image.rotation, MAX_SPEED, this._ship.image.body.acceleration);
        }
        else {
            this._ship.image.body.acceleration.x = 0;
            this._ship.image.body.acceleration.y = 0;
        }

        this._ship.image.body.velocity.x *= .997;
        this._ship.image.body.velocity.y *= .997;

        this.updateTurning(dt);

    }

}