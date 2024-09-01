import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";

// Custom Imports
import { Ionicons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { getActors } from "../../../api/movies";
import Rating from "../../../assets/svgs/Rating";
import {
  deviceHeight,
  deviceWidth,
  moderateScale,
} from "../../../common/constants";
import ReadMoreText from "../../../components/ReadMoreText";
import MDivider from "../../../components/common/MDivider";
import MText from "../../../components/common/MText";
import { styles } from "../../../themes";
import Typography from "../../../themes/typography";
const SPACING = moderateScale(20);

export default function MovieDetails({ navigation, route }) {
  const item = route?.params?.item;
  const colors = useSelector((state) => state.theme.theme);
  const [cast, setCast] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const cast = await getActors(item.id);
      setCast(cast);
    };

    fetchData();
  }, [item.id]);

  const bulgarianGenres = {
    12: "Приключение",
    14: "Фентъзи",
    16: "Анимация",
    18: "Драма",
    27: "Ужаси",
    28: "Екшън",
    35: "Комедия",
    36: "История",
    37: "Западен",
    53: "Трилър",
    80: "Криминален",
    99: "Документален",
    878: "Научна фантастика",
    9648: "Мистерия",
    10402: "Музика",
    10749: "Романтика",
    10751: "Семейство",
    10752: "Война",
    10770: "ТВ филм",
  };

  return (
    <View style={{ backgroundColor: colors.backgroundColor, ...styles.flex }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage
          source={{ uri: item?.backdrop }}
          style={[
            localStyles.root,
            {
              backgroundColor: colors.dark ? colors.imageBg : colors.grayScale1,
            },
          ]}
        />

        <View style={styles.mh20}>
          <View style={localStyles.productText}>
            <MText style={styles.flex} numberOfLines={3} type={"b18"}>
              {item?.title}
            </MText>
          </View>
          <View style={localStyles.subItemStyle}>
            <View
              style={[
                localStyles.genreContainer,
                { backgroundColor: colors.dark3 },
              ]}
            >
              <MText
                type={"s12"}
                color={colors.dark ? colors.yellow : colors.yellow2}
              >
                {bulgarianGenres[item?.genres]}
              </MText>
            </View>
            <Rating
              width={moderateScale(22)}
              height={moderateScale(22)}
              style={styles.ml10}
            />
            <View style={[styles.ml5, styles.flex]}>
              <MText
                type={"s14"}
                numberOfLines={1}
                color={colors.dark ? colors.grayScale3 : colors.grayScale7}
              >
                {item?.rating.toFixed(1)}
              </MText>
            </View>
          </View>

          <MDivider style={styles.mt10} />
          <MText type={"r12"} color={colors.textColor}>
            Премиера {item?.releaseDate}
          </MText>
          <MText numberOfLines={1} style={styles.mt5} type={"b18"}>
            {"Описание"}
          </MText>
          <ReadMoreText
            numberOfLines={5}
            style={[
              Typography.fontSizes.f14,
              Typography.fontWeights.Regular,
              { color: colors.textColor },
            ]}
            readMoreStyle={{ color: colors.primary }}
            readLessStyle={{ color: colors.primary }}
          >
            {item?.description}
          </ReadMoreText>
          <MText numberOfLines={1} style={styles.mt5} type={"b18"}>
            {"Актьори"}
          </MText>
          <FlatList
            data={cast}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.justifyEvenly}
            horizontal
            style={{ marginBottom: SPACING }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: cast, index }) => {
              return (
                <Animated.View
                  entering={FadeInDown.delay((index + 1) * 100)}
                  style={{ marginRight: SPACING, alignItems: "center" }}
                >
                  <FastImage
                    source={{ uri: cast.imageUri }}
                    style={{
                      borderRadius: 16,
                      width: deviceWidth * 0.33,
                      height: deviceWidth * 0.4,
                      resizeMode: "cover",
                      marginBottom: SPACING / 2,
                    }}
                  />
                  <MText type={"r12"}>{cast.name}</MText>
                </Animated.View>
              );
            }}
          />
        </View>
        <Pressable
          style={{
            position: "absolute",
            top: moderateScale(7),
            left: moderateScale(7),
            width: moderateScale(30),
            height: moderateScale(30),
            backgroundColor: colors.primary,
            ...styles.center,
            borderRadius: moderateScale(20),
          }}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Ionicons
            name="arrow-back"
            size={moderateScale(20)}
            color={colors.white}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    height: deviceHeight / 2 - moderateScale(50),
    width: deviceWidth,
  },
  productText: {
    ...styles.rowSpaceBetween,
    ...styles.mt20,
  },
  subItemStyle: {
    ...styles.mt10,
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.flex,
  },
  genreContainer: {
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },

  imageSample: {
    ...styles.rowSpaceBetween,
    width: deviceWidth,
  },
  imageContainer: {
    width: "48%",
    height: moderateScale(240),
    borderRadius: moderateScale(20),
    resizeMode: "cover",
  },
});
