
export abstract class GameObject {
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