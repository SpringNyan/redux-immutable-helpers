import {assert} from "chai";
import * as Immutable from "immutable";
import {ImmutableObjectHelper} from "../src/immutable";


describe("ImmutableObjectHelper", () => {
    it("test", () => {
        interface User {
            name: string;
            age: number;
            email: string;
        }

        let User = new ImmutableObjectHelper<User>({
            name: null,
            age: null,
            email: null
        });

        let user = User.create({
            name: "nyan",
            age: 17,
            email: "nyan@example.com"
        });

        assert.equal(user.name, "nyan");
        assert.equal(user.age, 17);
        assert.equal(user.email, "nyan@example.com");

        user = User.update(user, obj => {
            obj.age = 233;
        });
        assert.equal(user.name, "nyan");
        assert.equal(user.age, 233);
        assert.equal(user.email, "nyan@example.com");

        user = User.update(user, obj => {
            obj.name = "meow";
            obj.email = "meow@example.com"
        });
        assert.equal(user.name, "meow");
        assert.equal(user.age, 233);
        assert.equal(user.email, "meow@example.com");
    });
});
