
export class PlayerShip {
    private _scene: Phaser.Scene;
    private _parent;
    image; //: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    pointerIsDown = false;
    lines = 1;
    bulletTexture = 'effects/fire18';
    popupTween;
    popupTweenShield;
    lightTween;
    fireOffset = { x: 0, y: 0 };

    constructor(scene, x, y, parent) {
        this._scene = scene;
        this._parent = parent;
        this.initHero(x, y);

    }

    popup() {
        this.image.setScale(0.1, 0.1);
        // this.protection.setScale(0.1, 0.1);
        // this.turbine.setScale(0.1, 0.1);
        this.popupTween = this._scene.tweens.add({
            // targets: [this.body, this.turbine],
            targets: [this.image],
            scale: 1,
            duration: 450,
            ease: 'Back.Out',
            onComplete: () => {
            }
        });
        // this.popupTweenShield = this.scene.tweens.add({
        //     targets: this.protection,
        //     scale: 1.3 * this.body.width / this.protection.width,
        //     duration: 450,
        //     ease: 'Linear',
        //     onComplete: () => {
        //     }
        // });
    }

    private initHero(x, y) {
        // this._heroSprite = new Phaser.GameObjects.Sprite(this.scene, x, y, 'game', 'ship_1');
        // this.parent.add(this._heroSprite);

        this.image = this._scene.physics.add.image(x, y, 'game', 'ship_1')
            .setDepth(150)
            .setInteractive();
        this._parent.add(this.image);
        this.image.invincible = false;

        this.fireOffset = {
            x: 50,
            y: 0
        }

        // this.turbine = this.scene.add.image(this.x, this.y + this.body.height / 2, 'game', 'blueTurbine')
        //     .setDepth(99)
        //     .setOrigin(0.5, 0);

        // this.pointerIsDown = false;
        // this.scene.input
        //     .on('pointerdown', () => {
        //         this.pointerIsDown = true;
        //     })
        //     .on('pointerup', () => {
        //         this.pointerIsDown = false;
        //     });

        // this.body.shield = () => {
        //     this.scene.sound.play('shield_on', { volume: 1 });
        //     this.scene.tweens.add({
        //         targets: this.protection,
        //         scale: 1.3 * this.body.width / this.protection.width,
        //         alpha: 1,
        //         duration: 300,
        //         ease: 'Linear',
        //         onComplete: () => {
        //             this.body.shielded = true;
        //         }
        //     });
        // };


    }

    upgrade(value) {
        if (value === -3) {
            this.image.upgradeLevel += value;
            this.image.upgradeLevel = this.image.upgradeLevel - this.image.upgradeLevel % 3 + 2;
        }
        else {
            this.image.upgradeLevel += value;
        }
        this.image.shoot.delay = 400;
        this.lines = 1;
        let previousTexture = this.image.frame.name;
        if (this.image.upgradeLevel <= 0) {
            this.image.upgradeLevel = 0;
            this.image.shoot.delay = 400;
            this.image.setTexture('game', 'blue');
            this.bulletTexture = 'effects/fire03';
        }
        else if (this.image.upgradeLevel === 1) {
            this.image.setTexture('game', 'blue');
            this.image.shoot.delay = 300;
            this.bulletTexture = 'laserBlue';
        }
        else if (this.image.upgradeLevel === 2) {
            this.image.setTexture('game', 'blue');
            this.image.shoot.delay = 200;
            this.bulletTexture = 'laserBlue';
        }
        else if (this.image.upgradeLevel === 3) {
            this.image.setTexture('game', 'green');
            this.image.shoot.delay = 300;
            this.bulletTexture = 'laserGreen';
            this.lines = 2;
        }
        else if (this.image.upgradeLevel === 4) {
            this.image.setTexture('game', 'green');
            this.image.shoot.delay = 200;
            this.bulletTexture = 'laserGreen';
            this.lines = 2;
        }
        else if (this.image.upgradeLevel === 5) {
            this.image.setTexture('game', 'green');
            this.image.shoot.delay = 300;
            this.bulletTexture = 'laserGreen';
            this.lines = 3;
        }
        else if (this.image.upgradeLevel === 6) {
            this.image.setTexture('game', 'yellow');
            this.image.shoot.delay = 200;
            this.bulletTexture = 'laserYellow';
            this.lines = 3;
        }
        else if (this.image.upgradeLevel === 7) {
            this.image.setTexture('game', 'yellow');
            this.image.shoot.delay = 300;
            this.bulletTexture = 'laserYellow';
            this.lines = 4;
        }
        else if (this.image.upgradeLevel === 8) {
            this.image.setTexture('game', 'yellow');
            this.image.shoot.delay = 200;
            this.bulletTexture = 'laserYellow';
            this.lines = 4;
        }
        else if (this.image.upgradeLevel === 9) {
            this.image.setTexture('game', 'red');
            this.image.shoot.delay = 300;
            this.bulletTexture = 'laserRed';
            this.lines = 5;
        }
        else if (this.image.upgradeLevel === 10) {
            this.image.setTexture('game', 'red');
            this.image.shoot.delay = 200;
            this.bulletTexture = 'laserRed';
            this.lines = 5;
        }
        else if (this.image.upgradeLevel === 11) {
            this.image.setTexture('game', 'red');
            this.image.shoot.delay = 300;
            this.bulletTexture = 'laserRed';
            this.lines = 6;
        }
        else {
            this.image.upgradeLevel = 12;
            this.image.setTexture('game', 'purple');
            this.image.shoot.delay = 200;
            this.bulletTexture = 'laserPurple';
            this.lines = 7;
        }
        if (previousTexture !== this.image.frame.name && value > 0) {
            this.popup();
        }
        this.image.setSize(this.image.width, this.image.height / 2);
        console.log(this.image);
        // this.turbine.setTexture('game', this.body.frame.name + 'Turbine');

        if (value < 0) {
            // if (ISINFOCUS) 
            this._scene.sound.play('hero_level_down', { volume: 1 });
        }
        else {
            // if (ISINFOCUS) 
            this._scene.sound.play('buff', { volume: 0.7 });
        }
        if (value === -3) {
            this.image.invincible = true;
            this.lightTween = this._scene.tweens.add({
                targets: this.image,
                alpha: 0,
                duration: 200,
                yoyo: true,
                repeat: 4,
                ease: 'Linear',
                onComplete: () => {
                    this.image.setAlpha(1);
                    this.image.invincible = false;
                }
            });
        }
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

    update(dt) {
        let inputPos = this._scene.cameras.main.getWorldPoint(this._scene.input.x, this._scene.input.y);
        inputPos.x = Math.max(-750, Math.min(750, inputPos.x));
        // if (!isDesktop) inputPos.y -= 250;

        if (this.pointerIsDown) {
            // this.turbineYScale += (1 - this.turbineYScale) * 0.1;
            // this.turbine.setScale(1 - 0.3 + 0.6 * Math.random(), this.turbineYScale);
            this.image.x += (inputPos.x - this.image.x) * dt;
            this.image.y += (inputPos.y - this.image.y) * dt;
        }
        else {
            // this.turbineYScale += (0 - this.turbineYScale) * 0.1;
            // this.turbine.setScale(1, this.turbineYScale);
        }
        if (this.image.texture.key !== 'red' && this.image.texture.key !== 'purple') {
            // this.turbine.setPosition(this.body.x, this.body.y + this.body.height / 2 - 10);
        }
        else {
            // this.turbine.setPosition(this.body.x, this.body.y + this.body.height / 2 - 25);
        }
        // this.protection.setPosition(this.body.x, this.body.y);
    }

}