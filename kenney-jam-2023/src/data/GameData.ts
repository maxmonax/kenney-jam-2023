import { Ship } from "../objects/Ship";
import { Station } from "../objects/Station";

export enum GDEvents {
    energyChange = 'energyChange',
    btnStateChange = 'btnStateChange'
}

export class GameData extends Phaser.Events.EventEmitter {
    private static _instance: GameData;

    private _teleportAvailable = false;
    private _upBtnsAvailable = false;
    // private _shipUpCost = -1;
    // private _stationUpCost = -1;
    private _energy = 0;
    ship: Ship;
    station: Station;

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

    public set upBtnsAvailable(v: boolean) {
        let isChanged = this._upBtnsAvailable != v;
        this._upBtnsAvailable = v;
        if (isChanged) this.emit(GDEvents.btnStateChange);
    }

    public get upBtnsAvailable(): boolean {
        return this._upBtnsAvailable;
    }

    // public set shipUpCost(v: number) {
    //     let isChanged = this._shipUpCost != v;
    //     this._shipUpCost = v;
    //     if (isChanged) this.emit(GDEvents.btnStateChange);
    // }

    // public get shipUpCost(): number {
    //     return this._shipUpCost;
    // }

    // public set stationUpCost(v: number) {
    //     let isChanged = this._stationUpCost != v;
    //     this._stationUpCost = v;
    //     if (isChanged) this.emit(GDEvents.btnStateChange);
    // }

    // public get stationUpCost(): number {
    //     return this._stationUpCost;
    // }

    public set energy(v: number) {
        this._energy = v;
        this.emit(GDEvents.energyChange);
    }

    public get energy(): number {
        return this._energy;
    }
    
}