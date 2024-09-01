import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import { StackNav } from "../NavigationKeys";
import { StackRoute } from "../NavigationRoutes";

import { useColorScheme } from "react-native";
import { useDispatch } from "react-redux";
import { setTheme } from "../../store/themeSlice";
import { colors } from "../../themes";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  useEffect(() => {
    console.log(colorScheme);
    const initialTheme = colorScheme === "dark" ? colors.dark : colors.light;
    dispatch(setTheme(initialTheme));
    console.log("theme");
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={StackNav.StartUpScreen}
        component={StackRoute.StartUpScreen}
      />
      <Stack.Screen name={StackNav.TabBar} component={StackRoute.TabBar} />
      <Stack.Screen
        name={StackNav.MovieDetails}
        component={StackRoute.MovieDetails}
      />
    </Stack.Navigator>
  );
}
