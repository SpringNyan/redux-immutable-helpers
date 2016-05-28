import { Action, ActionHelper } from "./action";
export declare type Reducer<TState, TAction> = (state: TState, action: TAction) => TState;
export declare class ReducerHelper<TState> {
    private _reducers;
    private _defaultReducer;
    private _initialState;
    constructor(initialState: TState, defaultReducer?: Reducer<TState, Action<any>>);
    register<TPayload>(type: string | ActionHelper<TPayload>, reducer: Reducer<TState, Action<TPayload> | Action<Error>>): ReducerHelper<TState>;
    build(): Reducer<TState, Action<any>>;
}
