"use strict";
var Immutable = require("immutable");
var ImmutableObjectHelper = (function () {
    function ImmutableObjectHelper(defaultValues) {
        this._record = Immutable.Record(defaultValues);
        this._keys = Object.keys(defaultValues);
    }
    ImmutableObjectHelper.prototype.create = function (values) {
        return this._record(values);
    };
    ImmutableObjectHelper.prototype.update = function (obj, updater) {
        var _this = this;
        return obj.withMutations(function (mutable) { return updater(_this.wrapMutable(mutable)); });
    };
    ImmutableObjectHelper.prototype.wrapMutable = function (mutable) {
        var result = {};
        var _loop_1 = function(key) {
            Object.defineProperty(result, key, {
                get: function () { return mutable.get(key); },
                set: function (value) { return mutable.set(key, value); }
            });
        };
        for (var _i = 0, _a = this._keys; _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_1(key);
        }
        return result;
    };
    return ImmutableObjectHelper;
}());
exports.ImmutableObjectHelper = ImmutableObjectHelper;
