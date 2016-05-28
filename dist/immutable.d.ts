import * as Immutable from "immutable";
export declare type ImmutableObject<T> = Immutable.Map<string, any> & T;
export declare class ImmutableObjectHelper<T> {
    private _record;
    private _keys;
    constructor(defaultValues: T);
    create(values?: T): ImmutableObject<T>;
    update(obj: ImmutableObject<T>, updater: (obj: T) => void): ImmutableObject<T>;
    private wrapMutable(mutable);
}
