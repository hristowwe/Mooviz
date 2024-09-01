import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { moderateScale } from "../common/constants";
import { StackNav } from "../navigation/NavigationKeys";
import { styles } from "../themes";

const StartUpScreen = () => {
  const colors = useSelector((state) => state.theme.theme);
  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure({ webClientId: "" });
  }, []);
  return (
    <View
      style={[
        localStyles.contentContainerStyle,
        { backgroundColor: colors.backgroundColor },
      ]}
    >
      <LottieView
        autoPlay
        style={{
          width: moderateScale(300),
          height: moderateScale(300),
        }}
        loop={false}
        source={require("../assets/Lotties/Mooviz.json")}
        onAnimationFinish={(isCanceled) => {
          if (!isCanceled) {
            navigation.replace(StackNav.TabBar);
          }
        }}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  contentContainerStyle: {
    ...styles.flex,
    ...styles.center,
  },
});
export default StartUpScreen;
