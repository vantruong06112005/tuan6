import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  BookDetail: {
    bookId: string;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{
          title: 'Chi tiết sách',
        }}
      />
    </Stack.Navigator>
  );
}
