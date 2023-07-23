import { Config } from "../data/Config";
import { Params } from "../data/Params";
import { FrontEvents } from "../events/FrontEvents";
import { GameEvents } from "../events/GameEvents";
import { AudioAlias, SndMng } from "../sound/SndMng";
import { LogMng } from "../utils/LogMng";

export class MenuScene extends Phaser.Scene {

    private dummyMain: Phaser.GameObjects.Container;

    // GUI
    private btnPlay: Phaser.GameObjects.Image;
    private blackCurtain: Phaser.GameObjects.Graphics;

    // flags
    private isPointerDown = false;
    
    private music: Phaser.Sound.BaseSound;


    constructor() {
        super('MenuScene');
        LogMng.debug(`MenuScene -> constructor()...`);
    }

    public init(aData: any) {
    }

    public create(): void {
        this.dummyMain = this.add.container(0, 0);

        let bg = this.add.image(Config.GW_HALF, Config.GH_HALF, 'bg');
        bg.scaleX = Config.GW / bg.width;
        this.dummyMain.add(bg);

        let titleText = new Phaser.GameObjects.Text(this, Config.GW / 2, 350, 'Lost in Space', {
            fontFamily: 'Orbitron',
            // color: '#66439f',
            color: '#ffffff',
            align: 'center'
        });
        titleText.setFontSize(150);
        titleText.setOrigin(0.5, 0.5);
        titleText.alpha = 0;

        this.tweens.add({
            targets: titleText,
            alpha: .8,
            duration: 1000,
            ease: 'Sine.InOut'
        });

        this.add.existing(titleText);

        this.btnPlay = new Phaser.GameObjects.Image(this, Config.GW / 2, Config.GH + 300, 'game', 'ui/btnPlay');
        this.btnPlay.setInteractive({ cursor: 'pointer' });
        this.btnPlay.on('pointerdown', () => {
            this.btnPlay['isPointerDown'] = true;
            this.sound.play(AudioAlias.click);
            LogMng.debug(`btnPlay pointerdown!`);
        });
        this.btnPlay.on('pointerup', () => {
            if (this.btnPlay['isPointerDown'] != true) return;
            this.btnPlay['isPointerDown'] = false;
            this.onPlayBtnClick();
        });
        this.tweens.add({
            targets: this.btnPlay,
            y: Config.GH / 2 + 200,
            duration: 500,
            delay: 400,
            ease: 'Sine.Out'
        });
        this.add.existing(this.btnPlay);

        this.blackCurtain = this.add.graphics();
        this.blackCurtain.fillStyle(0x111111);
        this.blackCurtain.fillRect(0, 0, Config.GW, Config.GH);
        this.hideBlackCurtain();
        
        // music
        SndMng.scene = this;
        if (!SndMng.getMusic(AudioAlias.music)) {
            SndMng.playMusic(AudioAlias.music, 0, Config.GAME.MUSIC_VOLUME, 1000);
        }

        this.events.once('shutdown', this.onSceneShutdown, this);

        // this.scale.on('resize', this.onResize, this);
        
        FrontEvents.getInstance().addListener(FrontEvents.EVENT_WINDOW_RESIZE, this.onResize, this);
        this.onResize();
    }

    private onResize() {
        
    }

    private hideBlackCurtain(cb?: Function, ctx?: any) {
        this.tweens.killTweensOf(this.blackCurtain);
        this.tweens.add({
            targets: this.blackCurtain,
            alpha: 0,
            duration: 250,
            onComplete: () => {
                this.blackCurtain.visible = false;
                if (cb) cb.call(ctx);
            }
        });
    }

    private showBlackCurtain(cb?: Function, ctx?: any) {
        this.tweens.killTweensOf(this.blackCurtain);
        this.blackCurtain.alpha = 0;
        this.blackCurtain.visible = true;
        this.tweens.add({
            targets: this.blackCurtain,
            alpha: 1,
            duration: 250,
            onComplete: () => {
                if (cb) cb.call(ctx);
            }
        });
    }

    private onPlayBtnClick() {
        this.scene.start('GameScene');
    }

    private onCloseBtnClick() {
        GameEvents.getInstance().closeClick();
    }

    private onSceneShutdown() {
        LogMng.debug(`MenuScene -> onSceneShutdown()...`);
    }

    update(allTime: number, dtMs: number) {
        // get dt in Sec
        let dt = dtMs * 0.001;
    }

}