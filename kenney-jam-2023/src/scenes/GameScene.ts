import { ShipController } from "../controls/ShipController";
import { Config } from "../data/Config";
import { Params } from "../data/Params";
import { FrontEvents } from "../events/FrontEvents";
import { PlayerShip } from "../objects/PlayerShip";
import { LogMng } from "../utils/LogMng";

export class GameScene extends Phaser.Scene {
    
    private _dummyObjects: Phaser.GameObjects.Container;
    // physics
    private _bullets: Phaser.Physics.Arcade.Group;
    private _enemyBullets: Phaser.Physics.Arcade.Group;
    private _enemies: Phaser.Physics.Arcade.Group;
    // objects
    private _playerShip: PlayerShip;
    private _shipController: ShipController;
    // GUI


    constructor() {
        super({ key: 'GameScene' });
    }

    public init(aData: any) {

    }

    public preload(): void {
        this.load.audio('btn', ['./assets/audio/btn.mp3']);
    }

    public create(): void {

        let bg = this.add.group({
            key: 'game',
            frame: 'effects/star2',
            frameQuantity: 2000
        });
        let rect = new Phaser.Geom.Rectangle(-Config.GW * 10, -Config.GH * 10, Config.GW * 20, Config.GH * 20);
        Phaser.Actions.RandomRectangle(bg.getChildren(), rect);

        this._dummyObjects = this.add.container();

        this._bullets = this.physics.add.group();
        this._enemyBullets = this.physics.add.group();
        this._enemies = this.physics.add.group();

        this._playerShip = new PlayerShip(this, 0, 0, this._dummyObjects);

        this.cameras.main.centerOn(0, 0);
        this.cameras.main.startFollow(this._playerShip.image, false, 100, 100);

        this._shipController = new ShipController(this, this._playerShip);

        // this.input.on('pointerdown', this.onPointerDown, this);
        // this.input.on('pointermove', this.onPointerMove, this);
        // this.input.on('pointerup', this.onPointerUp, this);

        // this.input.on('dragstart', this.onDragStart, this);
        // this.input.on('drag', this.onDrag, this);
        // this.input.on('dragend', this.onDragEnd, this);
        
        // this.scale.on('resize', this.onResize, this);
        FrontEvents.getInstance().addListener(FrontEvents.EVENT_WINDOW_RESIZE, this.onResize, this);
        this.onResize();

    }

    private onResize() {
        this.updateBtnBackPos();
    }

    private updateBtnBackPos() {
        // if (this.btnBack) this.btnBack.x = (Config.GW - Params.gameWidth) / 2 + 90;
    }

    private onPointerDown(p, aObj) {
        // if (aObj[0] == this.btnBack) {
        //     this.sound.play('btn');
        //     this.btnBack['isMouseDown'] = true;
        // }
        
    }

    private onPointerMove(p) {
        
    }

    private onDragStart(pointer, aObj, dragX, dragY) {

    }

    private onDrag(pointer, aObj, dragX, dragY) {
        aObj.x = dragX;
        aObj.y = dragY;
    }

    private onDragEnd(pointer, aObj) {
        LogMng.debug(`obj ${aObj['aliasName']}: ${aObj.x}, ${aObj.y}`);

    }

    private onBackClick() {
        this.scene.start('MenuScene');
    }
    
    update(allTime: number, dtMs: number) {
        // get dt in Sec
        let dt = dtMs * 0.001;

        this._shipController.update(dt);
        this._playerShip.update(dt);

    }

}