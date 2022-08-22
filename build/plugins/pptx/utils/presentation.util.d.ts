/// <reference types="node" />
declare class PresentationDrawer {
    presentation: any;
    constructor(presentation: any);
    drawSlide(canvas: HTMLCanvasElement, slideIndex: number): Promise<void>;
    private drawSlideBackground;
    private renderSlideLayer;
    private renderCustom;
    private renderRect;
    private renderText;
    private renderEllipse;
    private splitTextByLines;
}
declare function parsePresentation(file: string | Buffer | ArrayBuffer): Promise<{
    size: any;
    slides: any[];
}>;
export { PresentationDrawer, parsePresentation };
