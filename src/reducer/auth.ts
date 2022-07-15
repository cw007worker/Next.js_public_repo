import { User } from 'type/user';

const SET_USER = 'SET_USER' as const;
const RESET_USER = 'RESET_USER' as const;

export const authActionTypes = {
  SET_USER,
  RESET_USER,
};

// @ts-ignore TODO: 修正しよう
const setuser = (user) => {
  return { type: SET_USER, payload: user };
};

const resetuser = () => {
  return { type: RESET_USER, payload: undefined };
};

export const authActions = {
  setuser,
  resetuser,
};

export type AuthActionType =
  | ReturnType<typeof setuser>
  | ReturnType<typeof resetuser>;

export type AuthState = { currentUser: undefined } | { currentUser: User };

export const inialAuthState: AuthState = { currentUser: undefined };

export const authReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: {
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          email: action.payload.email,
          emailVerified: action.payload.emailVerified,
        },
      };
    case RESET_USER:
      return {
        ...state,
        currentUser: undefined,
      };
    default:
      return state;
  }
};
