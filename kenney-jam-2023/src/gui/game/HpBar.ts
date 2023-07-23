
export class HpBar extends Phaser.GameObjects.Container {
    private lineMask: Phaser.GameObjects.Graphics;
    private barWidth = 0;
    private barHeight = 0;
    private color = 0x00ff00;
    private _progress = 1;

    constructor(scene, x, y, w, h, border, color) {
        super(scene, x, y);

        this.color = color;

        let bg = new Phaser.GameObjects.Graphics(this.scene, {
            x: 0,
            y: 0,
            lineStyle: {
                color: this.color,
                width: border
            },
            fillStyle: {
                alpha: 0,
                color: this.color
            }
        });
        bg.strokeRect(-w / 2 - border, -h / 2 - border, w + border * 2, h + border * 2);
        this.add(bg);

        let line = new Phaser.GameObjects.Graphics(this.scene, {
            x: 0,
            y: 0,
            lineStyle: {
                color: this.color,
                width: 2
            },
            fillStyle: {
                alpha: 1,
                color: this.color
            }
        });
        line.fillRect(-w / 2, -h / 2, w, h);
        this.add(line);

        this.barWidth = w;
        this.barHeight = h;

        this.lineMask = new Phaser.GameObjects.Graphics(this.scene);
        this.lineMask.clear();
        this.lineMask.fillStyle(0xFFFFFF, 1);
        this.lineMask.fillRect(0, 0, this.barWidth, this.barHeight);

        line.mask = this.lineMask.createGeometryMask();

        this.progress = 0;
    }

    public set progress(v: number) {
        this._progress = v;
    }

    update(dt) {
        this.lineMask.x = this.x - this.barWidth / 2 - this.barWidth + this.barWidth * this._progress;
        this.lineMask.y = this.y - this.barHeight / 2;
    }

}