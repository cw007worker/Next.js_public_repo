import { createContext, useContext } from 'react';
import { State, useGetMe } from 'hooks/useGetMe';

export const UserContext = createContext<State | undefined>(undefined);

type UpdateContextType = () => void;

export const UserUpdateContext = createContext<UpdateContextType>(() => {
  //no-op
});

export const useUpdateUserContext = (): UpdateContextType =>
  useContext(UserUpdateContext);

export const UserContextProvider = ({
  state,
  refetch,
  children,
}: {
  state: State;
  refetch: () => void;
  children: JSX.Element;
}) => {
  return (
    <UserContext.Provider value={state}>
      <UserUpdateContext.Provider value={refetch}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
