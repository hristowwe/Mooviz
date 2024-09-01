import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import MText from "./MText";

export default function MHeader(props) {
  const {
    title,
    onPressBack,
    rightIcon,
    isHideBack,
    isLeftIcon,
    rightText,
    onPressRightText,
    homeHeader,
  } = props;
  const navigation = useNavigation();
  const colors = useSelector((state) => state.theme.theme);

  const goBack = () => navigation.goBack();
  return (
    <View
      style={[
        localStyles.container,
        !!isHideBack && styles.pr10,
        !homeHeader && styles.ph20,
      ]}
    >
      <View style={[styles.rowStart, styles.flex]}>
        {!isHideBack && (
          <TouchableOpacity style={styles.pr10} onPress={onPressBack || goBack}>
            <Ionicons
              name="arrow-back-outline"
              size={moderateScale(26)}
              color={colors.textColor}
            />
          </TouchableOpacity>
        )}
        {!!isLeftIcon && isLeftIcon}

        <MText
          numberOfLines={1}
          style={[styles.pr10, styles.mr10]}
          type={"B22"}
        >
          {title}
        </MText>
      </View>
      {!!rightIcon && rightIcon}
      {!!rightText && (
        <MText
          onPress={onPressRightText}
          numberOfLines={1}
          style={[styles.pr10, styles.mr10]}
          color={colors.primary}
          type={"B6"}
        >
          {rightText}
        </MText>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    ...styles.rowSpaceBetween,
    ...styles.pv15,
    ...styles.center,
  },
});
