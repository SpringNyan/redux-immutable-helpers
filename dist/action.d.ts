export interface Action<TPayload> {
    type: string;
    payload?: TPayload;
    error?: boolean;
    meta?: any;
}
export declare class ActionHelper<TPayload> {
    private _type;
    type: string;
    constructor(type: string);
    create(payload: TPayload): Action<TPayload>;
    createError(error: Error): Action<Error>;
    is(action: Action<any>): action is Action<TPayload> | Action<Error>;
    isError(action: Action<any>): action is Action<Error>;
}
