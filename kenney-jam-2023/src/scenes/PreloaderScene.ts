import { Config } from "../data/Config";
import { PreloaderBar } from "../gui/preloader/PreloaderBar";
import { LOAD_DATA } from "../sound/SndMng";
    
enum Texts {
    Title = 'Loading complete',
    Message = 'Click anywhere to start'
}

enum Styles {
    Color = '#AAAAAA',
    Font = 'Arial'
}

export class PreloaderScene extends Phaser.Scene {
    private bg: Phaser.GameObjects.Image;
    private bar: PreloaderBar;
    // private text: PreloaderBar;
    textTween: Phaser.Tweens.Tween;

    constructor() {
        super('PreloaderScene');
    }

    public preload(): void {

        if (Config.TAP_TO_START) {
            this.bar = new PreloaderBar(this, Config.GW_HALF, Config.GH_HALF + 200, true);
            this.add.existing(this.bar);
        }

        let scoreText = new Phaser.GameObjects.Text(this, Config.GW_HALF, Config.GH_HALF, 'Loading...', {
            fontFamily: 'Orbitron',
            color: '#ffffff',
            align: 'center'
        });
        scoreText.setFontSize(150);
        scoreText.setOrigin(0.5, 0.5);
        scoreText.alpha = 0.2;
        this.textTween = this.tweens.add({
            // targets: [this.body, this.turbine],
            targets: scoreText,
            alpha: .8,
            duration: 1000,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.InOut'
        });
        this.add.existing(scoreText);

        // atlases
        this.load.setPath('./assets/atlases/');
        this.load.atlas('game', 'game.png', 'game.json');

        // images
        this.load.setPath('./assets/images/');
        this.load.image('bg', 'bg.jpg');
        
        // audio
        this.load.setPath('./assets/audio/');
        for (let i = 0; i < LOAD_DATA.length; i++) {
            const element = LOAD_DATA[i];
            this.load.audio(element.alias, element.file);
        }

        // events
        this.load.on('progress', (value) => {
            if (Config.TAP_TO_START) this.bar.progress = value;
        }, this);

        this.load.on('complete', () => {

        }, this);

    }

    public create(): void {
        console.log('PreloaderScene create...');

        if (Config.DRAW_DEBUG_BORDER) {
            let rFullArea = this.add.rectangle(Config.GW / 2, Config.GH / 2, Config.GW, Config.GH, 0x00FF00, 0.1);
            let rSafeArea = this.add.rectangle(Config.GW / 2, Config.GH / 2, Config.GW_SAFE, Config.GH_SAFE, 0x0000FF, 0.1);
        }

        this.textTween.stop();

        if (Config.TAP_TO_START) {

            this.add.text(Config.GW_HALF, Config.GH_HALF - 100,
                Texts.Title,
                {
                    font: `90px ${Styles.Font}`,
                    color: Styles.Color
                })
                .setOrigin(0.5);

            this.add.text(Config.GW_HALF, Config.GH_HALF + 20,
                Texts.Message,
                {
                    font: `50px ${Styles.Font}`,
                    color: Styles.Color
                })
                .setOrigin(0.5);

            this.input.once('pointerdown', () => {
                this.scene.start('MenuScene');
            });

        }
        else {
            this.scene.start('MenuScene');
        }
    }

    public update() {
        
    }


}