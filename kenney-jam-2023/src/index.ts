import "./css/main.css";
import * as Phaser from "phaser";
import { Config } from "./data/Config";
import { Params } from "./data/Params";
import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { PreloaderScene } from "./scenes/PreloaderScene";
import { MenuScene } from "./scenes/MenuScene";
import { FrontEvents } from "./events/FrontEvents";

function startGame(aGameParams: {
    parentId: string;
}) {

    windowResizeCalculate();

    new Phaser.Game({
        type: Phaser.AUTO,
        parent: aGameParams.parentId,
        backgroundColor: 0x222222,
        transparent: true,
        scale: {
            mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: Config.GW,
            height: Config.GH
        },
        physics: {
            default: 'arcade',
            arcade: {
                // debug: true,
                gravity: { y: 0 }
            }
        },
        // plugins: {
            // scene: [{ key: 'SpinePlugin', plugin: window['SpinePlugin'], mapping: 'spine' }]
        // },
        scene: [BootScene, PreloaderScene, MenuScene, GameScene],
    });

}

function windowResizeCalculate() {
    const gw = Config.GW;
    const gh = Config.GH;
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const scale = wh / gh; // scale by height
    Params.gameWidth = Math.min(gw, ww / scale);
}

window.addEventListener('load', () => {
    let event = new CustomEvent('gameStarterReady', { detail: { startGameMethod: startGame } });
    window.dispatchEvent(event);
}, false);

window.addEventListener('resize', () => {
    windowResizeCalculate();
    FrontEvents.getInstance().emit(FrontEvents.EVENT_WINDOW_RESIZE);
}, false);