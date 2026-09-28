import React from 'react';

import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './store/cartStore';

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
