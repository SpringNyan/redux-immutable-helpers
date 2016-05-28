import {Action, ActionHelper} from "./action";


export type Reducer<TState, TAction> = (state: TState, action: TAction) => TState;

export class ReducerHelper<TState> {
    private _reducers: { [type: string]: Reducer<TState, Action<any>> };
    private _defaultReducer: Reducer<TState, Action<any>>;
    private _initialState: TState;

    constructor(initialState: TState, defaultReducer?: Reducer<TState, Action<any>>) {
        this._initialState = initialState;
        this._defaultReducer = defaultReducer;
        this._reducers = {};
    }

    register<TPayload>(type: string | ActionHelper<TPayload>, reducer: Reducer<TState, Action<TPayload> | Action<Error>>): ReducerHelper<TState> {
        let typeOfReducers = typeof type === "string" ? type : type.type;
        this._reducers[typeOfReducers] = reducer;
        return this;
    }

    build(): Reducer<TState, Action<any>> {
        return (state = this._initialState, action) => {
            if (this._reducers.hasOwnProperty(action.type)) {
                return this._reducers[action.type](state, action);
            }

            if (this._defaultReducer != null) {
                return this._defaultReducer(state, action);
            }

            return state;
        };
    }
}
