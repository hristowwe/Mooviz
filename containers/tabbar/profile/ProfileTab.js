// Library Imports
import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom Imports
import { moderateScale } from "../../../common/constants";

import { Ionicons } from "@expo/vector-icons";
import Logo from "../../../assets/svgs/Logo";
import Login from "../../../components/auth/Login";
import Register from "../../../components/auth/Register";
import MHeader from "../../../components/common/MHeader";
import MSafeAreaView from "../../../components/common/MSafeAreaView";
import MText from "../../../components/common/MText";
import { setTheme } from "../../../store/themeSlice";
import { colors, styles } from "../../../themes";
import { userLogout } from "../../../utils/actions/authActions";
export default function ProfileTab({ navigation, route }) {
  const color = useSelector((state) => state.theme.theme);
  const userId = useSelector((state) => state.auth.uid);
  const fullName = useSelector((state) => state.auth.fullName);
  const [isEnabled, setIsEnabled] = useState(!!color.dark);
  const dispatch = useDispatch();

  const onPressLightTheme = () => {
    dispatch(setTheme(colors.light));
  };

  const onPressDarkTheme = () => {
    dispatch(setTheme(colors.dark));
  };

  const toggleSwitch = (val) => {
    if (val) {
      onPressDarkTheme();
    } else {
      onPressLightTheme();
    }
    setIsEnabled((previousState) => !previousState);
  };
  const onPressLogOutBtn = () => {
    Alert.alert("Изход", "Искате ли да излезете?", [
      {
        text: "Не",
        onPress: () => console.log("Отказан изход"),
        style: "cancel",
      },
      {
        text: "Да",
        onPress: () => dispatch(userLogout()),
      },
    ]);
  };

  const LeftIcon = useMemo(() => {
    return (
      <View style={styles.pr10}>
        <Logo width={moderateScale(30)} height={moderateScale(30)} />
      </View>
    );
  }, []);

  const ListFooterComponent = () => {
    return (
      <TouchableOpacity
        onPress={onPressLogOutBtn}
        style={localStyles.settingsContainer}
      >
        <Ionicons
          name={"log-out-outline"}
          size={moderateScale(28)}
          color={color.redColor}
        />
        <MText
          type="s18"
          color={color.redColor}
          style={localStyles.logOutStyle}
        >
          {"Излез от профила"}
        </MText>
      </TouchableOpacity>
    );
  };
  const [signUp, setSignUp] = React.useState(false);

  return (
    <MSafeAreaView>
      {!userId ? (
        signUp ? (
          <Register setSignUp={setSignUp} />
        ) : (
          <Login setSignUp={setSignUp} />
        )
      ) : (
        <View>
          <MHeader isHideBack={true} title={"Профил"} isLeftIcon={LeftIcon} />
          <ScrollView style={localStyles.root}>
            <View style={[styles.selfCenter, styles.mb20]}>
              <Image
                source={
                  color.dark
                    ? require("../../../assets/userDark.png")
                    : require("../../../assets/userLight.png")
                }
                style={localStyles.userImage}
              />
            </View>
            <MText style={styles.selfCenter} type={"M26"}>
              {fullName}
            </MText>
            <View style={localStyles.settingsContainer}>
              <Ionicons
                name={"contrast-outline"}
                size={moderateScale(28)}
                color={color.dark ? color.white : color.darkColor}
              />
              <MText type="s18" style={styles.ml15}>
                Тъмна тема
              </MText>
              <View style={localStyles.rightContainer}>
                <Switch
                  trackColor={{
                    false: color.grayScale3,
                    true: color.grayScale5,
                  }}
                  thumbColor={color.white}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
            <ListFooterComponent />
          </ScrollView>
        </View>
      )}
    </MSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.pb20,
  },
  logOutStyle: {
    ...styles.ml15,
  },
  settingsContainer: {
    ...styles.mt15,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  rightContainer: {
    ...styles.flex,
    ...styles.rowEnd,
  },
});
