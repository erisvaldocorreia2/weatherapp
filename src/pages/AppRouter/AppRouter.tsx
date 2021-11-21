import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../HomeScreen/HomeScreen";
import WeatherScreen from "../WeatherScreen/WeatherScreen";

export type RootStackParamList = {
  Home: undefined;
  Weather: { latitude: number; longitude: number };
};

const RootStack = createStackNavigator<RootStackParamList>();

const AppRouter = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Weather" component={WeatherScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
