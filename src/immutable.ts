import * as Immutable from "immutable";


export type ImmutableObject<T> = Immutable.Map<string, any> & T;

export class ImmutableObjectHelper<T> {
    private _record: Immutable.Record.Class;
    private _keys: string[];

    constructor(defaultValues: T) {
        this._record = Immutable.Record(defaultValues);
        this._keys = Object.keys(defaultValues);
    }

    create(values?: T): ImmutableObject<T> {
        return <any>this._record(values);
    }

    update(obj: ImmutableObject<T>, updater: (obj: T) => void): ImmutableObject<T> {
        return <any>obj.withMutations(mutable => updater(this.wrapMutable(mutable)));
    }

    private wrapMutable(mutable: Immutable.Map<string, any>): T {
        let result: any = {};
        for (let key of this._keys) {
            Object.defineProperty(result, key, {
                get: () => mutable.get(key),
                set: value => mutable.set(key, value)
            });
        }

        return result;
    }
}
