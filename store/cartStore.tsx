import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type CartItem = {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | {
      type: 'ADD_TO_CART';
      payload: { bookId: string; title: string; price: number };
    }
  | {
      type: 'REMOVE_FROM_CART';
      payload: { bookId: string };
    }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { bookId: string; quantity: number };
    }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(
        (item) => item.bookId === action.payload.bookId,
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.bookId === action.payload.bookId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            bookId: action.payload.bookId,
            title: action.payload.title,
            price: action.payload.price,
            quantity: 1,
          },
        ],
      };
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.bookId !== action.payload.bookId,
        ),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.bookId !== action.payload.bookId,
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.bookId === action.payload.bookId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

type CartContextValue = CartState & {
  addToCart: (item: {
    bookId: string;
    title: string;
    price: number;
  }) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  totalQuantity: number;
  totalAmount: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: {
    bookId: string;
    title: string;
    price: number;
  }) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (bookId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { bookId } });
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { bookId, quantity } });
  };

  const totalQuantity = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const totalAmount = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    [state.items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalQuantity,
      totalAmount,
    }),
    [state.items, totalQuantity, totalAmount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
