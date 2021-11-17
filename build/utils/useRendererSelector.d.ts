import { DocRenderer } from "../types";
/**
 * Custom Hook for loading the current document into context
 */
export declare const useRendererSelector: () => {
    CurrentRenderer: DocRenderer | null | undefined;
};
