import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ProfileUnActive(props) {
  return (
    <Svg
      width={17}
      height={20}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M8.585 13.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.282-2.948-7.17-2.948z"
        stroke="#9E9E9E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M8.585 10.006A4.596 4.596 0 103.987 5.41a4.58 4.58 0 004.564 4.596h.033z"
        stroke="#9E9E9E"
        strokeWidth={1.42857}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ProfileUnActive;
