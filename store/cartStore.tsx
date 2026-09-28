import React from 'react';
import { Provider } from 'react-redux';
import { store } from './index';

export * from './cartSlice';
export * from './authSlice';
export * from './useCart';
export * from './useAuth';
export { store };

/**
 * Provider component wrapping Redux Provider with our configured store.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
