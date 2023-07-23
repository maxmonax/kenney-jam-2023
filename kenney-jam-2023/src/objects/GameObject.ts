
export abstract class GameObject extends Phaser.Events.EventEmitter {
    protected _destroyed = false;
    
    public get destroyed(): boolean {
        return this._destroyed;
    }
    
    free() {
        this._destroyed = true;
    }

    update(dt: number) {

    }

}