var getVisibleIndexRangeByParent = function (parent, pageDimension) {
    var maxPages = Math.ceil(parent.clientHeight / pageDimension.height);
    var offset = Math.max(5, maxPages);
    var topIndex = Math.floor(parent.scrollTop / pageDimension.height);
    var bottomIndex = Math.ceil(topIndex) + offset;
    return {
        min: Math.max(0, topIndex - offset),
        max: bottomIndex,
    };
};
export default getVisibleIndexRangeByParent;
