import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: {}
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isAuthenticated: true, user: action.payload };

    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false, user: {} };

    default:
      return state;
  }
}
