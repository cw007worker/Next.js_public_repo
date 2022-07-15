import { createContext, Dispatch, useContext, useReducer } from 'react';
import {
  uiReducer,
  initialState,
  InitialState,
  uiActions,
  UIActionType,
} from 'reducer/ui';

export const uiActionTypes = {};

export const UIContext = createContext<InitialState | undefined>(initialState);

type UpdateContextType = any;

//@ts-ignore TODO: 修正しよう
export const UIUpdateContext = createContext<Dispatch<UIActionType>>(null);

export const useUpdateUserContext = (): UpdateContextType =>
  useContext(UIUpdateContext);

export const UIContextProvider: any = ({ children }: any) => {
  const [uiState, uiDispatch] = useReducer(uiReducer, initialState);
  return (
    <UIUpdateContext.Provider value={uiDispatch}>
      <UIContext.Provider value={uiState}>{children}</UIContext.Provider>
    </UIUpdateContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);
export const useUIUpdateContext = () => useContext(UIUpdateContext);
