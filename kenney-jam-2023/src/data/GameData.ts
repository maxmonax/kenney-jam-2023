
export enum GDEvents {
    energyChange = 'energyChange',
    btnStateChange = 'btnStateChange'
}

export class GameData extends Phaser.Events.EventEmitter {
    private static _instance: GameData;

    private _teleportAvailable = false;
    energyCnt = 0;

    private constructor() {
        super();
        if (GameData._instance) throw new Error("Double using GameData.constructor()!");
    }

    static getInstance() {
        if (!this._instance) this._instance = new GameData();
        return this._instance;
    }
    
    public set teleportAvailable(v: boolean) {
        let isChanged = this._teleportAvailable != v;
        this._teleportAvailable = v;
        if (isChanged) this.emit(GDEvents.btnStateChange);
    }
    
    public get teleportAvailable(): boolean {
        return this._teleportAvailable;
    }

    addEnergy(aCnt: number) {
        this.energyCnt += aCnt;
        this.emit(GDEvents.energyChange);
    }

    
}