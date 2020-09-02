import React from "react";

export interface IIconProps {
  color?: string;
  size?: string | number | (string & {}) | undefined;
  reverse?: boolean;
}

export const PrevDocIcon = (props: IIconProps) => {
  return <DocNavIcon {...props} />;
};

export const NextDocIcon = (props: IIconProps) => {
  return <DocNavIcon {...props} reverse />;
};

const DocNavIcon = (props: IIconProps) => {
  const { color, size, reverse } = props;
  return (
    <svg
      width={size || "100%"}
      height={size || "100%"}
      style={{ transform: `${reverse ? "rotate(180deg)" : ""}` }}
      id="arrow_left"
      version="1.1"
      viewBox={`0 0 32 32`}
      xmlSpace="preserve"
    >
      <path
        clipRule="evenodd"
        d="M31.106,15H3.278l8.325-8.293  c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0l-9.9,9.899c-0.385,0.385-0.385,1.029,0,1.414l9.9,9.9  c0.391,0.391,1.024,0.391,1.414,0c0.391-0.391,0.391-1.024,0-1.414L3.278,17h27.828c0.552,0,1-0.448,1-1  C32.106,15.448,31.658,15,31.106,15z"
        fill={color || "#aaa"}
        fillRule="evenodd"
        id="Arrow_Back"
      />
    </svg>
  );
};
