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
import { SET_DOCUMENT_CURRENT_PAGE, SET_DOCUMENT_FIT_TYPE, SET_DOCUMENT_PAGES_COUNT, SET_DOCUMENT_PAGINATED, SET_DOCUMENT_RENDER_SETTINGS, SET_DOCUMENT_ROTATION_ANGLE, SET_DOCUMENT_ZOOM_LEVEL } from "../actions/render.actions";
export var initialRenderSettingsState = {
    zoomLevel: 1,
    paginated: true,
    pagesCount: 0,
    currentPage: 1,
    rotationAngle: 0,
    fitType: "width",
};
export var renderSettingsReducer = function (state, action) {
    if (state === void 0) { state = initialRenderSettingsState; }
    switch (action.type) {
        case SET_DOCUMENT_ZOOM_LEVEL: {
            var value = action.value;
            return __assign(__assign({}, state), { zoomLevel: value });
        }
        case SET_DOCUMENT_PAGINATED: {
            var value = action.value;
            return __assign(__assign({}, state), { paginated: value });
        }
        case SET_DOCUMENT_CURRENT_PAGE: {
            var value = action.value;
            return __assign(__assign({}, state), { currentPage: value });
        }
        case SET_DOCUMENT_PAGES_COUNT: {
            var value = action.value;
            return __assign(__assign({}, state), { pagesCount: value });
        }
        case SET_DOCUMENT_ROTATION_ANGLE: {
            var value = action.value;
            return __assign(__assign({}, state), { rotationAngle: value });
        }
        case SET_DOCUMENT_FIT_TYPE: {
            var value = action.value;
            return __assign(__assign({}, state), { fitType: value });
        }
        case SET_DOCUMENT_RENDER_SETTINGS: {
            var value = action.value;
            return __assign(__assign({}, state), value);
        }
        default:
            return state;
    }
};
