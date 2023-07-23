import { GameEvents } from "../events/GameEvents";
import { GameGui } from "../gui/game/GameGui";

export class GameGuiScene extends Phaser.Scene {

    private _dummyGui: Phaser.GameObjects.Container;
    // GUI
    private _gui: GameGui;

    constructor() {
        super({ key: 'GameGuiScene', active: true });
    }

    create() {

        this._dummyGui = this.add.container();

        //  Grab a reference to the Game Scene
        // let gameScene = this.scene.get('GameScene');
        // gameScene.events.on('createGui', () => {}, this);
        // gameScene.events.on('destroyGui', () => {}, this);

        GameEvents.getInstance().on(GameEvents.GAME_OPEN, this.onGameOpen, this);
        GameEvents.getInstance().on(GameEvents.GAME_CLOSE, this.onGameClose, this);

    }

    private onGameOpen() {
        if (!this._gui) this._gui = new GameGui(this, this._dummyGui);
        this._gui.init();
        this._dummyGui.visible = true;
    }

    private onGameClose() {
        this._dummyGui.visible = false;
    }

}