import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

// Local Imports
import HomeActive from "../../assets/svgs/HomeActive";
import HomeUnactive from "../../assets/svgs/HomeUnactive";
import ProfileActive from "../../assets/svgs/ProfileActive";
import ProfileUnActive from "../../assets/svgs/ProfileUnActive";
import MText from "../../components/common/MText";
import { styles } from "../../themes";
import { TabNav } from "../NavigationKeys";
import { TabRoute } from "../TabRoute";
export default function TabBarNavigation() {
  const colors = useSelector((state) => state.theme.theme);
  const Tab = createBottomTabNavigator();

  const TabText = memo(({ IconType, label, focused }) => (
    <View style={localStyle.tabViewContainer}>
      {IconType}
      <MText
        style={styles.mt5}
        numberOfLines={1}
        color={focused ? colors.textColor : colors.grayScale5}
        type={"R14"}
      >
        {label}
      </MText>
    </View>
  ));

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        lazy: true,
        tabBarStyle: [
          localStyle.tabBarStyle,
          { backgroundColor: colors.backgroundColor },
        ],
        tabBarShowLabel: false,
      }}
      initialRouteName={TabRoute.HomeTab}
    >
      <Tab.Screen
        name={TabNav.HomeTab}
        component={TabRoute.HomeTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabText
              IconType={focused ? <HomeActive /> : <HomeUnactive />}
              focused={focused}
              label={"Начало"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.ProfileTab}
        component={TabRoute.ProfileTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabText
              IconType={focused ? <ProfileActive /> : <ProfileUnActive />}
              focused={focused}
              label={"Профил"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const localStyle = StyleSheet.create({
  tabBarStyle: {
    ...styles.ph20,
    borderTopWidth: 0,
  },
  tabViewContainer: {
    ...styles.center,
  },
});
