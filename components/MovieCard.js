import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

// Custom Imports
import FastImage from "react-native-fast-image";
import Rating from "../assets/svgs/Rating";
import { deviceWidth, moderateScale } from "../common/constants";
import { styles } from "../themes";
import MText from "./common/MText";

const MovieCard = (props) => {
  const { item, onPress } = props;
  const colors = useSelector((state) => state.theme.theme);

  return (
    <TouchableOpacity
      style={[
        localStyles.root,
        { backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1 },
      ]}
      onPress={onPress}
    >
      <View style={localStyles.innerContainer}>
        <FastImage
          source={{ uri: item?.poster }}
          style={[localStyles.imageStyle, { borderRadius: moderateScale(20) }]}
        />
        <View style={localStyles.rightContainer}>
          <View style={[styles.itemsStart, styles.justifyEvenly]}>
            <MText type={"b16"} numberOfLines={1} style={localStyles.textStyle}>
              {item?.title}
            </MText>
            <MText
              type={"S14"}
              numberOfLines={1}
              color={colors.dark ? colors.grayScale3 : colors.grayScale7}
            >
              Премиера: {item?.releaseDate}
            </MText>
            <MText
              type={"S12"}
              numberOfLines={2}
              color={colors.dark ? colors.grayScale3 : colors.grayScale7}
            >
              {item?.description}
            </MText>
            <View style={styles.flexRow}>
              <Rating />
              <MText style={styles.ml5} type={"s12"}>
                {item?.rating.toFixed(1)}
                {" рейтинг"}
              </MText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MovieCard);

const localStyles = StyleSheet.create({
  root: {
    ...styles.p10,
    ...styles.shadowStyle,
    width: deviceWidth - moderateScale(40),
    ...styles.mt15,
    ...styles.selfCenter,
    borderRadius: moderateScale(16),
  },
  innerContainer: {
    ...styles.justifyCenter,
    ...styles.flexRow,
  },
  imageStyle: {
    width: moderateScale(90),
    height: moderateScale(90),
    resizeMode: "cover",
  },
  textStyle: {
    ...styles.flex,
  },

  rightContainer: {
    ...styles.flex,
    ...styles.ml10,
  },
});
