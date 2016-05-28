"use strict";
var ReducerHelper = (function () {
    function ReducerHelper(initialState, defaultReducer) {
        this._initialState = initialState;
        this._defaultReducer = defaultReducer;
        this._reducers = {};
    }
    ReducerHelper.prototype.register = function (type, reducer) {
        var typeOfReducers = typeof type === "string" ? type : type.type;
        this._reducers[typeOfReducers] = reducer;
        return this;
    };
    ReducerHelper.prototype.build = function () {
        var _this = this;
        return function (state, action) {
            if (state === void 0) { state = _this._initialState; }
            if (_this._reducers.hasOwnProperty(action.type)) {
                return _this._reducers[action.type](state, action);
            }
            if (_this._defaultReducer != null) {
                return _this._defaultReducer(state, action);
            }
            return state;
        };
    };
    return ReducerHelper;
}());
exports.ReducerHelper = ReducerHelper;
