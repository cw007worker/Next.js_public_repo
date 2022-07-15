import { createContext, useContext, useReducer, Dispatch } from 'react';
import {
  authReducer,
  inialAuthState,
  AuthActionType,
  AuthState,
} from 'reducer/auth';

export const AuthContext = createContext<AuthState | undefined>(undefined);
//@ts-ignore TODO: 修正しよう
export const AuthUpdateContext = createContext<Dispatch<AuthActionType>>(null);

//@ts-ignore TODO: 修正しよう
export const AuthContextProvider = ({ children }) => {
  const [currentUser, authDispatch] = useReducer(authReducer, inialAuthState);

  return (
    <AuthContext.Provider value={currentUser}>
      <AuthUpdateContext.Provider value={authDispatch}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
