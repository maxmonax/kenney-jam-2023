
export class GameData {
    private static _instance: GameData;

    private constructor() {
        if (GameData._instance) throw new Error("Double using GameData.constructor()!");
    }

    static getInstance() {
        if (!this._instance) this._instance = new GameData();
        return this._instance;
    }

    
    
}