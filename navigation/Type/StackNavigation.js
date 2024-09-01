import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { StackNav } from "../NavigationKeys";
import { StackRoute } from "../NavigationRoutes";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
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
