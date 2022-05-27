
let globalCallback: Function;

export default function onLoadCallback(callback?: Function) {
    if (typeof callback == "function") {
        globalCallback = callback;
    }

    if (globalCallback) {
        return globalCallback;
    }

    return () => { };
}