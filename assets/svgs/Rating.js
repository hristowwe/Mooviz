import * as React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

function Rating(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.4}
        d="M8.652 2.076l1.484 2.982c.11.217.318.367.559.4l3.334.486c.194.027.371.13.49.286.118.155.17.351.14.544a.742.742 0 01-.214.422L12.03 9.537a.704.704 0 00-.214.643l.594 3.292a.743.743 0 01-.595.848.779.779 0 01-.476-.076l-2.974-1.55a.78.78 0 00-.702 0l-2.974 1.55a.762.762 0 01-1.021-.298.754.754 0 01-.078-.467l.595-3.293a.707.707 0 00-.214-.643l-2.416-2.34a.723.723 0 010-1.041.718.718 0 01.428-.21l3.334-.487a.743.743 0 00.56-.4l1.43-2.99a.738.738 0 01.678-.408h.09c.248.03.465.184.577.409z"
        fill="url(#paint0_linear_1488_18615)"
      />
      <Path
        d="M7.995 12.611a.818.818 0 00-.368.101l-2.96 1.546a.772.772 0 01-.998-.308.737.737 0 01-.077-.462l.591-3.286a.735.735 0 00-.213-.65l-2.417-2.34a.729.729 0 01-.012-1.03l.012-.01a.756.756 0 01.421-.212l3.337-.49a.722.722 0 00.558-.4l1.45-3.028a.737.737 0 01.682-.374c-.006.198-.006 10.809-.006 10.943z"
        fill="url(#paint1_linear_1488_18615)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1488_18615"
          x1={14.6673}
          y1={14.3332}
          x2={-1.06634}
          y2={9.53124}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FB9400" />
          <Stop offset={1} stopColor="#FFAB38" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1488_18615"
          x1={8.00065}
          y1={14.3332}
          x2={-0.403254}
          y2={13.0507}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FB9400" />
          <Stop offset={1} stopColor="#FFAB38" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default Rating;
