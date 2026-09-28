import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import CartStack from './CartStack';
import CategoryScreen from '../screens/CategoryScreen';
import AccountScreen from '../screens/AccountScreen';

import CustomTabBar from '../components/CustomTabBar';

export type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Cart: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home">
        {() => <HomeStack />}
      </Tab.Screen>

      <Tab.Screen name="Categories">
        {() => <CategoryScreen />}
      </Tab.Screen>

      <Tab.Screen name="Cart">
        {() => <CartStack />}
      </Tab.Screen>

      <Tab.Screen name="Account">
        {() => <AccountScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
