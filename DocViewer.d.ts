import { default as React, CSSProperties } from '../node_modules/react';
import { AvailableLanguages } from './i18n';
import { DocRenderer, DocViewerRef, IConfig, IDocument, ITheme } from './models';

export interface DocViewerProps {
    documents: IDocument[];
    className?: string;
    style?: CSSProperties;
    config?: IConfig;
    theme?: ITheme;
    pluginRenderers?: DocRenderer[];
    prefetchMethod?: string;
    requestHeaders?: Record<string, string>;
    initialActiveDocument?: IDocument;
    language?: AvailableLanguages;
    activeDocument?: IDocument;
    onDocumentChange?: (document: IDocument) => void;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<DocViewerProps & React.RefAttributes<DocViewerRef>>>;
export default _default;
