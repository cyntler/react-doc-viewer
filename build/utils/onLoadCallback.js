var globalCallback;
export default function onLoadCallback(callback) {
    if (typeof callback == "function") {
        globalCallback = callback;
    }
    if (globalCallback) {
        return globalCallback;
    }
    return function () { };
}
