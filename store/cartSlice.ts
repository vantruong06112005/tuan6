import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        bookId: string;
        title: string;
        price: number;
        quantity?: number;
      }>,
    ) => {
      const { bookId, title, price, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.bookId === bookId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          bookId,
          title,
          price,
          quantity,
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<string | { bookId: string }>,
    ) => {
      const bookId =
        typeof action.payload === 'string'
          ? action.payload
          : action.payload.bookId;
      state.items = state.items.filter((item) => item.bookId !== bookId);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ bookId: string; quantity: number }>,
    ) => {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.bookId !== bookId);
      } else {
        const item = state.items.find((i) => i.bookId === bookId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }): CartItem[] =>
  state.cart.items;

export const selectTotalQuantity = (state: { cart: CartState }): number =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalAmount = (state: { cart: CartState }): number =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartItemById =
  (bookId: string) =>
  (state: { cart: CartState }): CartItem | undefined =>
    state.cart.items.find((item) => item.bookId === bookId);

export const selectCartItemQuantity =
  (bookId: string) =>
  (state: { cart: CartState }): number =>
    state.cart.items.find((item) => item.bookId === bookId)?.quantity ?? 0;

export default cartSlice.reducer;
