import {assert} from "chai";
import {Action, ActionHelper} from "../src/action";


describe("ActionHelper", () => {
    it("test", () => {
        interface NyanPayload {
            nyan: string;
        }

        interface MeowPayload {
            meow: string;
        }

        let Nyan = new ActionHelper<NyanPayload>("Nyan");
        let Meow = new ActionHelper<MeowPayload>("Meow");

        let action: Action<any>;

        action = Nyan.create({ nyan: "nyan~" });
        assert.isTrue(Nyan.is(action));
        assert.isFalse(Nyan.isError(action));
        assert.isFalse(Meow.is(action));
        assert.isFalse(Meow.isError(action));

        action = Meow.createError(new Error("meow~"));
        assert.isFalse(Nyan.is(action));
        assert.isFalse(Nyan.isError(action));
        assert.isTrue(Meow.is(action));
        assert.isTrue(Meow.isError(action));
    });
});
