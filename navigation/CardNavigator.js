import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EpisodeScreen from '../screens/EpisodeScreen';
import CardScreen from '../screens/CardScreen';

const Stack = createStackNavigator();

const EpisodeNavigatorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode="card" >
      <Stack.Screen name="Card" component={CardScreen} />
      <Stack.Screen name="Episode" component={EpisodeScreen} />
    </Stack.Navigator>
  );
};

export { EpisodeNavigatorStack };