import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './index';
import {
  login as loginAction,
  logout as logoutAction,
  updateUserInfo as updateUserInfoAction,
  selectIsLoggedIn,
  selectUserInfo,
  selectToken,
  UserInfo,
  DEFAULT_MOCK_USER,
  DEFAULT_MOCK_TOKEN,
} from './authSlice';

/**
 * Adapter hook (Facade Pattern) for Authentication State.
 * Decouples screens and components from Redux Toolkit implementation.
 */
export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);

  const login = (params?: { userInfo?: UserInfo; token?: string }) => {
    dispatch(loginAction(params));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const updateProfile = (data: Partial<UserInfo>) => {
    dispatch(updateUserInfoAction(data));
  };

  return {
    isLoggedIn,
    userInfo,
    token,
    login,
    logout,
    updateProfile,
    defaultMockUser: DEFAULT_MOCK_USER,
    defaultMockToken: DEFAULT_MOCK_TOKEN,
  };
}
