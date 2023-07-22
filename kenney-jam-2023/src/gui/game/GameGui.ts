import { Config } from "../../data/Config";
import { Params } from "../../data/Params";
import { FrontEvents } from "../../events/FrontEvents";

export class GameGui {
    private _scene: Phaser.Scene;
    private _parent: Phaser.GameObjects.Container;

    private _leftMenu: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, parent: Phaser.GameObjects.Container) {
        this._scene = scene;
        this._parent = parent;
        
        this._leftMenu = this._scene.add.container();
        this._parent.add(this._leftMenu);

        // energy info

        let enIcon = this._scene.add.image(60, 50, 'game', 'powerup');
        enIcon.scale = 2;
        this._leftMenu.add(enIcon);

        let scoreText = new Phaser.GameObjects.Text(scene, enIcon.x + 50, enIcon.y, '0', {
            fontFamily: 'Orbitron',
            color: '#ffcc00',
            align: 'left'
        });
        scoreText.setFontSize(40);
        scoreText.setOrigin(0, 0.5);
        this._leftMenu.add(scoreText);

        this.onResize();
        FrontEvents.getInstance().addListener(FrontEvents.EVENT_WINDOW_RESIZE, this.onResize, this);
    }

    private onResize() {
        this._leftMenu.x = (Config.GW - Params.gameWidth) / 2;
    }

    update(dt: number) {

    }

}