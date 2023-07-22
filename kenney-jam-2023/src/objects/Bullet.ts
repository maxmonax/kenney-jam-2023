
export class Bullet {
    scene;
    body;
    direction: number;
    bulletTexture: string;
    destroyTimer;

    constructor(scene, x, y, direction, velocity, bulletTexture) {
        this.scene = scene;
        this.direction = direction;
        this.bulletTexture = bulletTexture;
        this.createBody(x, y, velocity);
    }

    createBody(x, y, velocity) {
        this.body = this.scene._bullets.create(x, y, 'game', this.bulletTexture)
            .setDepth(105)
            .setRotation(this.direction - Math.PI / 2)
            .setVelocityX(velocity * Math.cos(this.direction))
            .setVelocityY(velocity * Math.sin(this.direction));

        this.destroyTimer = this.scene.time.delayedCall(5000, () => {
            if (this.body) {
                this.body.destroy();
            }
            this.destroyTimer.remove();
        }, [], this.scene);
    }

}