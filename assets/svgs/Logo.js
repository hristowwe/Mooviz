import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Logo({ width, height, ...props }) {
  return (
    <Svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 290.29 446.04"
      width={width}
      height={height}
      {...props}
    >
      <Path
        d="M34.37 16.51h99.92q21.44 156.07 43.24 312.1a18.2 18.2 0 001.07 5.06c4.15-26.28 7.69-52.68 11.61-79q17.22-119.07 34.5-238.14h99.92v445.94h-66.12q-.08-162.94 0-325.9a39.7 39.7 0 00-.54-5.11c-.16 1.7-.29 3.4-.5 5.1-17 108.64-34.27 217.24-51.2 325.89-19.54.16-39.08.1-58.62 0Q122.49 295.57 97.1 128.73c-.36-2.08-.81-4.13-1.23-6.2-.36 34-.1 68-.23 102l-.24 237h-61Q34.36 239 34.37 16.51z"
        transform="translate(-34.36 -16.48)"
        fill="#e50914"
      />
    </Svg>
  );
}

export default Logo;
