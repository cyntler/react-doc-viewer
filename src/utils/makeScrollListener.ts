const makeScrollListener = (
  element: any,
  onScrollStart: Function,
  onScrollEnd: Function,
  delay: number = 100
) => {
  let endScrollTimerId: any = null;

  const onScroll = (event: any) => {
    if (endScrollTimerId) {
      clearTimeout(endScrollTimerId);
    }

    onScrollStart(event);

    endScrollTimerId = setTimeout(() => onScrollEnd(event), delay);
  };

  element.addEventListener("scroll", onScroll);

  return () => {
    element.removeEventListener("scroll", onScroll);
  };
};

export default makeScrollListener;
