import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './index';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
  selectCartItems,
  selectTotalQuantity,
  selectTotalAmount,
  CartItem,
} from './cartSlice';

/**
 * Adapter hook (Facade Pattern) for Cart State Management.
 * Components interact with cart state and operations exclusively via useCart(),
 * decoupling them from the underlying state management library (Redux Toolkit).
 */
export function useCart() {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  const addToCart = (item: {
    bookId: string;
    title: string;
    price: number;
    quantity?: number;
  }) => {
    dispatch(addToCartAction(item));
  };

  const removeFromCart = (bookId: string) => {
    dispatch(removeFromCartAction(bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    dispatch(updateQuantityAction({ bookId, quantity }));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  const getItemQuantity = (bookId: string): number => {
    const item = items.find((i) => i.bookId === bookId);
    return item ? item.quantity : 0;
  };

  return {
    items,
    totalQuantity,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };
}
