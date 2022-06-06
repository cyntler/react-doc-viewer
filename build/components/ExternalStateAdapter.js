import React from "react";
import { RenderContext } from "../state";
import { setDocumentRenderSettings } from "../state/actions/render.actions";
import { emitEvent } from "../utils/events";
var equalObjects = function (a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.constructor !== b.constructor)
        return false;
    var keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length)
        return false;
    return keys.every(function (key) { return a[key] === b[key]; });
};
export default function ExternalStateAdapter() {
    var _a = React.useState(null), state = _a[0], setState = _a[1];
    var renderStore = React.useContext(RenderContext);
    var controller = {
        update: function (newState) { return renderStore.dispatch(setDocumentRenderSettings(newState)); }
    };
    React.useEffect(function () {
        if (renderStore.state.loaded) {
            setState(renderStore.state);
            emitEvent("onDocumentLoaded", {
                state: renderStore.state,
                controller: controller,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderStore.state.loaded]);
    React.useEffect(function () {
        if (renderStore.state.loaded && state) {
            if (equalObjects(state, renderStore.state))
                return;
            emitEvent("core:onRenderSettingsChange", renderStore.state);
            setState(renderStore.state);
        }
    }, [renderStore, state]);
    return React.createElement(React.Fragment, null);
}
