"use strict";
var ActionHelper = (function () {
    function ActionHelper(type) {
        this._type = type;
    }
    Object.defineProperty(ActionHelper.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    ActionHelper.prototype.create = function (payload) {
        return {
            type: this.type,
            payload: payload
        };
    };
    ActionHelper.prototype.createError = function (error) {
        return {
            type: this.type,
            payload: error,
            error: true
        };
    };
    ActionHelper.prototype.is = function (action) {
        return action != null && action.type === this.type;
    };
    ActionHelper.prototype.isError = function (action) {
        return action != null && action.type === this.type && action.error === true;
    };
    return ActionHelper;
}());
exports.ActionHelper = ActionHelper;
