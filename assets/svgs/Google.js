import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

function Google(props) {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1546_13903)">
        <Path
          d="M23.509 12.975c0-.984-.079-1.701-.248-2.445H12.23v4.438h6.474c-.13 1.102-.835 2.764-2.402 3.88l-.022.148 3.488 2.75.241.025c2.22-2.086 3.499-5.156 3.499-8.796z"
          fill="#4285F4"
        />
        <Path
          d="M12.23 24.668c3.172 0 5.834-1.063 7.78-2.897l-3.708-2.923c-.992.704-2.323 1.195-4.072 1.195-3.107 0-5.744-2.086-6.684-4.969l-.138.012-3.626 2.857-.048.134c1.932 3.906 5.9 6.59 10.496 6.59z"
          fill="#34A853"
        />
        <Path
          d="M5.547 15.074a7.481 7.481 0 01-.391-2.365c0-.824.143-1.621.378-2.365l-.006-.159-3.672-2.903-.12.059a12.145 12.145 0 00-1.254 5.368c0 1.926.457 3.747 1.254 5.368l3.811-3.003z"
          fill="#FBBC05"
        />
        <Path
          d="M12.23 5.374c2.206 0 3.694.97 4.542 1.78l3.316-3.295C18.05 1.933 15.4.75 12.229.75 7.635.75 3.666 3.434 1.735 7.34l3.799 3.004c.953-2.884 3.59-4.97 6.696-4.97z"
          fill="#EB4335"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1546_13903">
          <Path
            fill="#fff"
            transform="translate(.48 .75)"
            d="M0 0H23.04V24H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Google;
