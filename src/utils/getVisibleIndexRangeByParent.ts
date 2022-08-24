const getVisibleIndexRangeByParent = (parent: any, pageDimension: any) => {
  const maxPages = Math.ceil(parent.clientHeight / pageDimension.height);
  const offset = Math.max(5, maxPages);
  const topIndex = Math.floor(parent.scrollTop / pageDimension.height);
  const bottomIndex = Math.ceil(topIndex) + offset;

  return {
    min: Math.max(0, topIndex - offset),
    max: bottomIndex,
  };
};

export default getVisibleIndexRangeByParent;
