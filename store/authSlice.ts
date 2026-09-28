import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: string;
  memberRank?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  token: string | null;
}

// Mock data mẫu dùng để test trước khi nối API ở Tuần 7
export const DEFAULT_MOCK_USER: UserInfo = {
  id: 'usr-2026-001',
  name: 'Nguyễn Văn Trường',
  email: 'vantruong@example.com',
  phone: '0987 654 321',
  avatar: '👨‍💻',
  address: 'Hà Nội, Việt Nam',
  memberRank: 'Thành viên Vàng',
};

export const DEFAULT_MOCK_TOKEN = 'mock-jwt-token-tuan6-demo-2026';

const initialState: AuthState = {
  isLoggedIn: false,
  userInfo: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userInfo?: UserInfo;
        token?: string;
      } | undefined>,
    ) => {
      state.isLoggedIn = true;
      state.userInfo = action?.payload?.userInfo ?? DEFAULT_MOCK_USER;
      state.token = action?.payload?.token ?? DEFAULT_MOCK_TOKEN;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.token = null;
    },

    updateUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          ...action.payload,
        };
      }
    },
  },
});

export const { login, logout, updateUserInfo } = authSlice.actions;

// Selectors
export const selectAuth = (state: { auth: AuthState }): AuthState => state.auth;

export const selectIsLoggedIn = (state: { auth: AuthState }): boolean =>
  state.auth.isLoggedIn;

export const selectUserInfo = (state: {
  auth: AuthState;
}): UserInfo | null => state.auth.userInfo;

export const selectToken = (state: { auth: AuthState }): string | null =>
  state.auth.token;

export default authSlice.reducer;
