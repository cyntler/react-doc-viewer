var makeScrollListener = function (element, onScrollStart, onScrollEnd, delay) {
    if (delay === void 0) { delay = 100; }
    var endScrollTimerId = null;
    var onScroll = function (event) {
        if (endScrollTimerId) {
            clearTimeout(endScrollTimerId);
        }
        onScrollStart(event);
        endScrollTimerId = setTimeout(function () { return onScrollEnd(event); }, delay);
    };
    element.addEventListener("scroll", onScroll);
    return function () {
        element.removeEventListener("scroll", onScroll);
    };
};
export default makeScrollListener;
