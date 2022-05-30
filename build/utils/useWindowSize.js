import { useEffect, useState } from "react";
export var useWindowSize = function () {
    var _a = useState({
        width: undefined,
        height: undefined,
    }), windowSize = _a[0], setWindowSize = _a[1];
    useEffect(function () {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    return windowSize;
};
