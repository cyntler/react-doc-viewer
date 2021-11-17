import { IStyledProps } from "../../types";
interface ButtonProps extends IStyledProps {
    disabled?: boolean;
}
export declare const ButtonPrimaryStyle: import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<any>>;
export declare const ButtonSecondaryStyle: import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<any>>;
export declare const Button: import("styled-components").StyledComponent<"button", any, ButtonProps, never>;
export declare const LinkButton: import("styled-components").StyledComponent<"a", any, {}, never>;
export declare const ButtonPrimary: import("styled-components").StyledComponent<"button", any, ButtonProps, never>;
export declare const ButtonSecondary: import("styled-components").StyledComponent<"button", any, ButtonProps, never>;
export {};
