var events = [];
export var createEvent = function (name, callback) {
    var uniqueId = Array(16)
        .fill(0)
        .map(function () { return Math.floor(Math.random() * 16).toString(32); })
        .join("");
    events.push({
        id: uniqueId,
        name: name,
        callback: callback,
    });
    return function () {
        events.splice(events.findIndex(function (event) { return event.id === uniqueId; }), 1);
    };
};
export var emitEvent = function (name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return events
        .filter(function (event) { return event.name === name; })
        .forEach(function (event) { return event.callback.apply(event, args); });
};
