import React from "react";
import { RenderContext } from "../state";
import { setDocumentRenderSettings } from "../state/actions/render.actions";
import { emitEvent } from "../utils/events";

const equalObjects = (a: any, b: any) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.constructor !== b.constructor) return false;

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;

  return keys.every(key => a[key] === b[key]);
}

export default function ExternalStateAdapter() {
  const [state, setState] = React.useState<any>(null);
  const renderStore = React.useContext<any>(RenderContext);
  const controller = {
    update: (newState: any) => renderStore.dispatch(setDocumentRenderSettings(newState))
  };

  React.useEffect(() => {
    if (renderStore.state.loaded) {
      setState(renderStore.state);
      emitEvent("onDocumentLoaded", {
        state: renderStore.state,
        controller,
      });
    }
  }, [renderStore.state.loaded]);

  React.useEffect(() => {
    if (renderStore.state.loaded && state) {
      if (equalObjects(state, renderStore.state)) return;
      emitEvent("core:onRenderSettingsChange", renderStore.state);
      setState(renderStore.state);
    }
  }, [renderStore, state]);

  return <></>
}