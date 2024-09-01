import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Menu(props) {
  const { strokeColor, ...otherProps } = props;

  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <Path
        clipRule="evenodd"
        d="M12 1.208c5.96 0 10.792 4.831 10.792 10.792 0 5.959-4.832 10.791-10.791 10.791C6.04 22.791 1.209 17.96 1.209 12c0-5.96 4.832-10.792 10.792-10.792z"
        stroke={strokeColor || "#fff"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.596 12.015h.01M11.92 12.015h.01M7.242 12.015h.01"
        stroke={strokeColor || "#fff"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Menu;
