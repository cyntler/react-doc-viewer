/// <reference types="react" />
export interface IIconProps {
    color?: string;
    size?: string | number | (string & {}) | undefined;
    reverse?: boolean;
}
export declare const PrevDocIcon: (props: IIconProps) => JSX.Element;
export declare const NextDocIcon: (props: IIconProps) => JSX.Element;
export declare const LoadingIcon: (props: IIconProps) => JSX.Element;
