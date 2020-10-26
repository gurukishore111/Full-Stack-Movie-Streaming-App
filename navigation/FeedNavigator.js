import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen';
import VideoScreen from "../screens/VideoScreen";
import EpisodeScreen from '../screens/EpisodeScreen';
import Login from '../components/Login';
import Register from '../components/Register';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal" headerModel="none" >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Video" component={VideoScreen} />
      <Stack.Screen name="Episode" component={EpisodeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };