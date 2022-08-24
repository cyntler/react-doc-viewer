declare const makeScrollListener: (element: any, onScrollStart: Function, onScrollEnd: Function, delay?: number) => () => void;
export default makeScrollListener;
