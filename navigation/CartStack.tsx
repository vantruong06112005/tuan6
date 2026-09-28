import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

export type CartStackParamList = {
  CartMain: undefined;
  Checkout: {
    total: number;
  };
};

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartMain"
        component={CartScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: 'Thanh toán' }}
      />
    </Stack.Navigator>
  );
}
