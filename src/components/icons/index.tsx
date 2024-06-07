"use client";

export interface IIconProps {
  color?: string;
  size?: string | number | string | undefined;
  reverse?: boolean;
}

export const PrevDocIcon = (props: IIconProps) => {
  return <DocNavIcon {...props} />;
};

export const NextDocIcon = (props: IIconProps) => {
  return <DocNavIcon {...props} reverse />;
};

const DocNavIcon = ({ color, size, reverse }: IIconProps) => {
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

export const LoadingIcon = (props: IIconProps) => {
  const { color, size } = props;

  return (
    <svg
      width={size || "100%"}
      height={size || "100%"}
      version="1.1"
      id="Icons"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      style={{ alignSelf: "center", justifySelf: "center" }}
    >
      <g>
        <path
          fill={color || "#aaa"}
          d="M16,2c-0.6,0-1,0.4-1,1v5c0,0.6,0.4,1,1,1s1-0.4,1-1V3C17,2.4,16.6,2,16,2z"
        />
        <path
          fill={color || "#aaa"}
          d="M7.5,6.1c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3.5,3.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.5,6.1
		z"
        />
        <path
          fill={color || "#aaa"}
          d="M9,16c0-0.6-0.4-1-1-1H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h5C8.6,17,9,16.6,9,16z"
        />
        <path
          fill={color || "#aaa"}
          d="M9.6,20.9l-3.5,3.5c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l3.5-3.5c0.4-0.4,0.4-1,0-1.4
		S10,20.6,9.6,20.9z"
        />
        <path
          fill={color || "#aaa"}
          d="M16,23c-0.6,0-1,0.4-1,1v5c0,0.6,0.4,1,1,1s1-0.4,1-1v-5C17,23.4,16.6,23,16,23z"
        />
        <path
          fill={color || "#aaa"}
          d="M22.4,20.9c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3.5,3.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4
		L22.4,20.9z"
        />
        <path
          fill={color || "#aaa"}
          d="M29,15h-5c-0.6,0-1,0.4-1,1s0.4,1,1,1h5c0.6,0,1-0.4,1-1S29.6,15,29,15z"
        />
        <path
          fill={color || "#aaa"}
          d="M21.7,11.3c0.3,0,0.5-0.1,0.7-0.3l3.5-3.5c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-3.5,3.5c-0.4,0.4-0.4,1,0,1.4
		C21.1,11.2,21.4,11.3,21.7,11.3z"
        />
      </g>
    </svg>
  );
};
