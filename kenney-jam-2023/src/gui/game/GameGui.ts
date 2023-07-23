import { Config } from "../../data/Config";
import { GDEvents, GameData } from "../../data/GameData";
import { Params } from "../../data/Params";
import { FrontEvents } from "../../events/FrontEvents";
import { GameEvents } from "../../events/GameEvents";
import { GameGuiScene } from "../../scenes/GameGuiScene";
import { LogMng } from "../../utils/LogMng";

export enum GameSceneEvents {
    homeClick = 'homeClick'
}

export class GameGui extends Phaser.Events.EventEmitter {
    private _scene: GameGuiScene;
    private _parent: Phaser.GameObjects.Container;

    private _leftMenu: Phaser.GameObjects.Container;
    private _rightMenu: Phaser.GameObjects.Container;

    private _teleportBtn: Phaser.GameObjects.Image;
    private _shipUpBtn: Phaser.GameObjects.Image;
    private _stationUpBtn: Phaser.GameObjects.Image;

    private _energyText: Phaser.GameObjects.Text;
    private _stationUpText: Phaser.GameObjects.Text;
    private _shipUpText: Phaser.GameObjects.Text;
    private _teleportText: Phaser.GameObjects.Text;


    constructor(scene: GameGuiScene, parent: Phaser.GameObjects.Container) {
        super();
        this._scene = scene;
        this._parent = parent;
        
        this._leftMenu = this._scene.add.container();
        this._parent.add(this._leftMenu);

        this._rightMenu = this._scene.add.container();
        this._parent.add(this._rightMenu);
        
        const yinc = 80;
        let gameEvents = GameEvents.getInstance();

        // energy info

        let enIcon = this._scene.add.image(60, 50, 'game', 'powerup');
        enIcon.scale = 2;
        this._leftMenu.add(enIcon);

        this._energyText = new Phaser.GameObjects.Text(scene, enIcon.x + 50, enIcon.y, '0', {
            fontFamily: 'Orbitron',
            color: '#ffcc00',
            align: 'left'
        });
        this._energyText.setFontSize(40);
        this._energyText.setOrigin(0, 0.5);
        this._leftMenu.add(this._energyText);

        // teleport btn

        this._teleportBtn = this._scene.add.image(60, this._energyText.y + yinc, 'game', 'ui/teleport');
        this._leftMenu.add(this._teleportBtn);
        this._teleportBtn.setInteractive({ cursor: 'pointer' });
        this._teleportBtn.on('pointerdown', () => {
            LogMng.debug(`GUI_TELEPORT_PRESSED!`);
            // this._scene.events.emit(GuiEvents.homeClick);
            gameEvents.emit(GameEvents.GUI_TELEPORT_PRESSED);
        });

        this._teleportText = new Phaser.GameObjects.Text(scene, this._teleportBtn.x + 50, this._teleportBtn.y,
            'teleport\nto station',
            { fontFamily: 'Orbitron', color: '#00ccff', align: 'left' }
        );
        this._teleportText.setFontSize(25);
        this._teleportText.setOrigin(0, 0.5);
        this._leftMenu.add(this._teleportText);

        // station up

        this._stationUpBtn = this._scene.add.image(60, this._teleportBtn.y + yinc, 'game', 'ui/station_up');
        this._leftMenu.add(this._stationUpBtn);
        this._stationUpBtn.setInteractive({ cursor: 'pointer' });
        this._stationUpBtn.on('pointerdown', () => { gameEvents.emit(GameEvents.GUI_STATION_UP); });

        this._stationUpText = new Phaser.GameObjects.Text(scene, this._stationUpBtn.x + 50, this._stationUpBtn.y,
            'station up\n500',
            { fontFamily: 'Orbitron', color: '#00ccff', align: 'left' }
        );
        this._stationUpText.setFontSize(25);
        this._stationUpText.setOrigin(0, 0.5);
        this._leftMenu.add(this._stationUpText);

        // ship up

        this._shipUpBtn = this._scene.add.image(60, this._stationUpBtn.y + yinc, 'game', 'ui/ship_up');
        this._leftMenu.add(this._shipUpBtn);
        this._shipUpBtn.setInteractive({ cursor: 'pointer' });
        this._shipUpBtn.on('pointerdown', () => { gameEvents.emit(GameEvents.GUI_SHIP_UP); });

        this._shipUpText = new Phaser.GameObjects.Text(scene, this._shipUpBtn.x + 50, this._shipUpBtn.y,
            'ship up',
            { fontFamily: 'Orbitron', color: '#99ff00', align: 'left' }
        );
        this._shipUpText.setFontSize(25);
        this._shipUpText.setOrigin(0, 0.5);
        this._leftMenu.add(this._shipUpText);

        let menuBtn = this._scene.add.image(-60, 50, 'game', 'ui/menu');
        this._rightMenu.add(menuBtn);
        menuBtn.setInteractive({ cursor: 'pointer' });
        menuBtn.on('pointerdown', () => {
            LogMng.debug(`GameGui: GUI_MENU_PRESSED!`);
            gameEvents.emit(GameEvents.GUI_MENU_PRESSED);
        });

        this.onResize();
        FrontEvents.getInstance().addListener(FrontEvents.EVENT_WINDOW_RESIZE, this.onResize, this);

        let gd = GameData.getInstance();
        gd.on(GDEvents.energyChange, this.updateEnergy, this);
        gd.on(GDEvents.btnStateChange, this.onBtnStateChange, this);
        
    }

    private onBtnStateChange() {
        this.updateTeleportBtn();
        this.updateShipUpBtn();
        this.updateStationUpBtn();
    }

    private updateEnergy() {
        let gd = GameData.getInstance();
        this._energyText.text = `${gd.energy}`;
        this.onBtnStateChange();
    }

    private updateTeleportBtn() {
        let gd = GameData.getInstance();
        let av = gd.teleportAvailable;
        if (av) {
            this._teleportBtn.input.enabled = true;
            this._teleportBtn.alpha = this._teleportText.alpha = 1;
        }
        else {
            this._teleportBtn.input.enabled = false;
            this._teleportBtn.alpha = this._teleportText.alpha = .5;
        }
    }

    private updateShipUpBtn() {
        let gd = GameData.getInstance();

        if (gd.ship.isMaxLevel()) {
            this._shipUpBtn.input.enabled = false;
            this._shipUpBtn.visible = this._shipUpText.visible = false;
        }
        else {
            let cost = gd.ship.upgradeCost;
            let av = gd.upBtnsAvailable && gd.energy >= cost;
            this._shipUpText.text = `ship up\n${cost}`;
            if (av) {
                this._shipUpBtn.input.enabled = true;
                this._shipUpBtn.alpha = this._shipUpText.alpha = 1;
            }
            else {
                this._shipUpBtn.input.enabled = false;
                this._shipUpBtn.alpha = this._shipUpText.alpha = .5;
            }
            this._shipUpBtn.visible = this._shipUpText.visible = true;
        }
    }

    private updateStationUpBtn() {
        let gd = GameData.getInstance();

        if (gd.station.isMaxLevel()) {
            this._stationUpBtn.input.enabled = false;
            this._stationUpBtn.visible = this._stationUpText.visible = false;
        }
        else {
            let cost = gd.station.upgradeCost;
            let av = gd.upBtnsAvailable && gd.energy >= cost;
            this._stationUpText.text = `station up\n${cost}`;
            if (av) {
                this._stationUpBtn.input.enabled = true;
                this._stationUpBtn.alpha = this._stationUpText.alpha = 1;
            }
            else {
                this._stationUpBtn.input.enabled = false;
                this._stationUpBtn.alpha = this._stationUpText.alpha = .5;
            }
            this._stationUpBtn.visible = this._stationUpText.visible = true;
        }
    }

    init() {
        this.updateEnergy();
        this.updateTeleportBtn();
    }

    private onResize() {
        this._leftMenu.x = (Config.GW - Params.gameWidth) / 2;
        this._rightMenu.x = Config.GW - (Config.GW - Params.gameWidth) / 2;
    }

    update(dt: number) {

    }

}