export interface Action<TPayload> {
    type: string;
    payload?: TPayload;
    error?: boolean;
    meta?: any;
}

export class ActionHelper<TPayload> {
    private _type: string;

    get type(): string {
        return this._type;
    }

    constructor(type: string) {
        this._type = type;
    }

    create(payload: TPayload): Action<TPayload> {
        return {
            type: this.type,
            payload
        };
    }

    createError(error: Error): Action<Error> {
        return {
            type: this.type,
            payload: error,
            error: true
        };
    }

    is(action: Action<any>): action is Action<TPayload> | Action<Error> {
        return action != null && action.type === this.type;
    }

    isError(action: Action<any>): action is Action<Error> {
        return action != null && action.type === this.type && action.error === true;
    }
}
