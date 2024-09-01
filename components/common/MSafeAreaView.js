import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../themes";

export default MSafeAreaView = ({ children, ...props }) => {
  const colors = useSelector((state) => state.theme.theme);
  return (
    <SafeAreaView
      {...props}
      style={[
        localStyles(colors, props.style).root,
        { paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const localStyles = (colors, style) =>
  StyleSheet.create({
    root: {
      ...styles.flex,
      backgroundColor: colors.backgroundColor,
      ...style,
    },
  });
