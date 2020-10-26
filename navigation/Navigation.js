import React from "react";
import { MainStackNavigator } from "./FeedNavigator";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EpisodeNavigatorStack } from "./CardNavigator";

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
   initialRouteName="Home"
   inactiveColor="#909090"
   activeColor="#19cc25"
   shifting={true}
   barStyle={{ backgroundColor: '#f2f2f2' }}>
    <Tab.Screen
      name="Home"
      component={MainStackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={21} />
        ),           
      }}
    />
    <Tab.Screen
      name="Trending"
      component={EpisodeNavigatorStack}
      options={() => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="fire" color={color} size={21} />
        ),
      })}
    />
  </Tab.Navigator>
);

export default AppNavigator;
