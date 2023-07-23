
/**
 * Events from game client
 * How to use: GameEvents.getInstance().addListener(GameEvents.ON_WINDOW_RESIZE, () => {}, this);
 */
export class GameEvents extends Phaser.Events.EventEmitter {
    private static instance: GameEvents;

    static readonly EVENT_SAVE_DATA = 'EVENT_SAVE_DATA';
    static readonly EVENT_CLOSE_CLICK = 'EVENT_CLOSE_CLICK';

    static readonly GAME_OPEN = 'GAME_OPEN';
    static readonly GAME_CLOSE = 'GAME_CLOSE';

    static readonly SHOW_FINAL_DIALOG = 'SHOW_FINAL_DIALOG';

    static readonly GUI_MENU_PRESSED = 'GUI_MENU_PRESSED'
    static readonly GUI_TELEPORT_PRESSED = 'GUI_TELEPORT_PRESSED'
    static readonly GUI_STATION_UP = 'GUI_STATION_UP'
    static readonly GUI_SHIP_UP = 'GUI_SHIP_UP'
    static readonly GUI_INTRO_COMPLETE = 'GUI_INTRO_COMPLETE'
    static readonly GUI_FINAL_COMPLETE = 'GUI_FINAL_COMPLETE'

    private constructor() {
        super();
    }

    static getInstance(): GameEvents {
        if (!GameEvents.instance) GameEvents.instance = new GameEvents();
        return GameEvents.instance;
    }

    /**
     * For Example Event
     */
    saveData() {
        window.dispatchEvent(new CustomEvent('gameEvent', { 
            detail: {
                eventName: GameEvents.EVENT_SAVE_DATA
            }
        }));
    }
    
    closeClick() {
        window.dispatchEvent(new CustomEvent('gameEvent', {
            detail: {
                eventName: GameEvents.EVENT_CLOSE_CLICK
            }
        }));
    }

}