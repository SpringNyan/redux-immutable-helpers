import {assert} from "chai";
import {ActionHelper} from "../src/action";
import {ReducerHelper} from "../src/reducer";


describe("ReducerHelper", () => {
    it("test", () => {
        interface NyanPayload {
            nyan: string;
        }

        interface MeowPayload {
            meow: string;
        }

        interface CatState {
            nyan: string;
            meow: string;
            unknown: number;
        }

        let Nyan = new ActionHelper<NyanPayload>("Nyan");
        let Meow = new ActionHelper<MeowPayload>("Meow");
        let Unknown = new ActionHelper<{}>("Unknown");

        let reducerHelper = new ReducerHelper<CatState>({ nyan: "", meow: "", unknown: 0 }, (state, action) => {
            state.unknown += 1;

            return state;
        });

        let reducer = reducerHelper.register(Nyan, (state, action) => {
            if (Nyan.isError(action)) {
                state.nyan = action.payload.message;
            } else {
                state.nyan = action.payload.nyan;
            }

            return state;
        }).register(Meow, (state, action) => {
            if (Meow.isError(action)) {
                state.meow = action.payload.message;
            } else {
                state.meow = action.payload.meow;
            }

            return state;
        }).build();

        let state: CatState;

        state = reducer(state, Unknown.create({}));
        assert.deepEqual(state, { nyan: "", meow: "", unknown: 1 });

        state = reducer(state, Nyan.create({ nyan: "nyan~" }));
        assert.deepEqual(state, { nyan: "nyan~", meow: "", unknown: 1 });

        state = reducer(state, Meow.createError(new Error("meow~")));
        assert.deepEqual(state, { nyan: "nyan~", meow: "meow~", unknown: 1 });
    });
});
