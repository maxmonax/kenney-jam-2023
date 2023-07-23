import { Config } from "../../data/Config";
import { GameEvents } from "../../events/GameEvents";

const INTRO_TEXTS = [
    `
        Hello Commander! I am your onboard assistant.\n
        I remind you that you were sent to an unexplored\n
        part of the galaxy to explore this territory.\n
        You have a spaceship, standard analog control.\n
        WASD keys for movement. SPACE key for shooting.\n
    `,
    `
        Try to improve the ship and your station,\n
        for this you will need energy,\n
        you can find it in asteroids.\n
        Be careful, this sector may not be safe.\n
        The ship will recover near the station.
    `,
    `
        Oh yes, one more thing...\n
        We lost contact with the center,\n
        so you are completely alone here.\n
        Looks like we jumped too far this time.\n
        Good luck.
    `
];

const FINAL_TEXTS = [
    `
        Ohh, clone #2125 died too.\n
        I will need to make a new one.\n
        I still need biological energy producers\n
        or I won't last long...
    `
];

export enum GuiDialogEvents {
    introComplete = 'introComplete',
    finalComplete = 'finalComplete'
}

type States = 'intro' | 'final';

export class GuiDialog extends Phaser.GameObjects.Container {

    private _state: States;
    private _bg: Phaser.GameObjects.Image;
    private _robot: Phaser.GameObjects.Image;
    private _window: Phaser.GameObjects.NineSlice;
    private _stepId = 0;
    private _text: Phaser.GameObjects.Text;

    constructor(scene, x, y) {
        super(scene, x, y);

        this._bg = new Phaser.GameObjects.Image(this.scene, 0, 0, 'game', 'ui/black');
        this._bg.setInteractive({ cursor: 'pointer' });
        this._bg.input.enabled = false;
        this._bg.visible = false;
        this.add(this._bg);

        this._robot = new Phaser.GameObjects.Image(this.scene, 0, 0, 'game', 'pers/robot_idle');
        this._robot.visible = false;
        this.add(this._robot);

        this._window = this.scene.add.nineslice(150, 300 + 500, 'game', 'ui/space_inlay', 1200, 500, 4, 4, 4, 4);
        this._window.visible = false;
        this.add(this._window);

        this._text = new Phaser.GameObjects.Text(this.scene,
            this._window.x - this._window.width / 2 - 50,
            this._window.y, '',
            { fontFamily: 'Orbitron', color: '#333333', align: 'left' }
        );
        this._text.visible = false;
        this.add(this._text);


    }

    private onBgClick() {

        switch (this._state) {
            case 'intro':
                if (this._stepId >= INTRO_TEXTS.length - 1) {
                    this.emit(GuiDialogEvents.introComplete);
                }
                else {
                    this._stepId++;
                    this.showIntroText(this._stepId);
                }
                break;
            
            case 'final':
                if (this._stepId >= FINAL_TEXTS.length - 1) {
                    this.emit(GuiDialogEvents.finalComplete);
                }
                else {
                    this._stepId++;
                    this.showFinalText(this._stepId);
                }
                break;
        
        }
        
    }

    private showIntroText(aStepId: number) {
        this._text.text = INTRO_TEXTS[aStepId];
    }

    private showFinalText(aStepId: number) {
        this._text.text = FINAL_TEXTS[aStepId];
    }

    private showBg() {
        this._bg.setSize(Config.GW, Config.GH);
        this._bg.scale = Config.GW / 10;
        this.add(this._bg);
        this._bg.alpha = 0;
        this.scene.tweens.add({
            targets: this._bg,
            alpha: .5,
            duration: 500,
            ease: 'Sine.InOut'
        });
        this._bg.visible = true;
        this._bg.input.enabled = true;

        this._bg.on('pointerup', this.onBgClick, this);
    }

    private showRobot(aFrame: string) {
        this._robot.setTexture('game', aFrame);
        this._robot.x = -550;
        this._robot.y = 200 + 500;
        this._robot.scale = 3;
        this.add(this._robot);
        this.scene.tweens.add({
            targets: this._robot,
            y: 200,
            duration: 500,
            ease: 'Sine.InOut'
        });
        this._robot.visible = true;
    }

    private showTextWindow() {
        this._window.x = 150;
        this._window.y = 300 + 500;
        this.add(this._window);
        this._window.visible = true;

        this._text.x = this._window.x - this._window.width / 2 - 50;
        this._text.y = this._window.y;
        this._text.setFontSize(40);
        this._text.setOrigin(0, 0.5);
        this.add(this._text);
        this._text.visible = true;

        this.scene.tweens.add({
            targets: this._window,
            y: 300 - 10,
            duration: 500,
            delay: 500,
            ease: 'Sine.InOut'
        });
        this.scene.tweens.add({
            targets: [this._text],
            y: 320 - 10,
            duration: 500,
            delay: 500,
            ease: 'Sine.InOut'
        });

        this._stepId = 0;
    }

    private hideBg() {
        this._bg.removeAllListeners();
        this._bg.input.enabled = false;
        this.scene.tweens.add({
            targets: this._bg,
            alpha: 0,
            duration: 500,
            ease: 'Sine.InOut',
            onComplete: () => {
                this._bg.visible = false;
            }
        });
    }

    private hideRobot() {
        this.scene.tweens.add({
            targets: this._robot,
            y: 200 + 500,
            duration: 500,
            delay: 500,
            ease: 'Sine.InOut',
            onComplete: () => {
                this._robot.visible = false;
            }
        });
    }

    private hideText() {
        this.scene.tweens.add({
            targets: this._window,
            y: 300 + 500,
            duration: 500,
            ease: 'Sine.InOut',
            onComplete: () => {
                this._window.visible = false;
            }
        });
        this.scene.tweens.add({
            targets: this._text,
            y: 300 + 500,
            duration: 500,
            ease: 'Sine.InOut',
            onComplete: () => {
                this._text.visible = false;
            }
        });
    }

    showIntro() {
        this._state = 'intro';
        this.showBg();
        this.showRobot('pers/robot_idle');
        this.showTextWindow();
        this.showIntroText(0);
    }

    hideIntro() {
        this.hideBg();
        this.hideRobot();
        this.hideText();
    }

    showFinal() {
        this._state = 'final';
        this.showBg();
        this.showRobot('pers/robot_idle');
        this.showTextWindow();
        this.showFinalText(0);
    }

    hideFinal() {
        this.hideBg();
        this.hideRobot();
        this.hideText();
    }

}