"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.initialPDFState = void 0;
var actions_1 = require("./actions");
exports.initialPDFState = {
    zoomLevel: 1,
    paginated: true,
    numPages: 0,
    currentPage: 1,
};
exports.reducer = function (state, action) {
    if (state === void 0) { state = exports.initialPDFState; }
    switch (action.type) {
        case actions_1.SET_ZOOM_LEVEL: {
            var value = action.value;
            return __assign(__assign({}, state), { zoomLevel: value });
        }
        case actions_1.SET_PDF_PAGINATED: {
            var value = action.value;
            return __assign(__assign({}, state), { paginated: value });
        }
        case actions_1.SET_NUM_PAGES: {
            var value = action.value;
            return __assign(__assign({}, state), { numPages: value });
        }
        case actions_1.SET_CURRENT_PAGE: {
            var value = action.value;
            return __assign(__assign({}, state), { currentPage: value });
        }
        default:
            return state;
    }
};
