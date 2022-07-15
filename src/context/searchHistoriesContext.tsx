import { createContext, useContext } from 'react';
import { State } from 'hooks/useGetItemSearchHistories';

export const SearchHistoriesContext = createContext<State | undefined>(
  undefined
);

type UpdateContextType = () => void;

export const SearchHistoriesUpdateContext = createContext<UpdateContextType>(
  () => {
    //no-op
  }
);

export const useUpdateSearchHistoriesContext = (): UpdateContextType =>
  useContext(SearchHistoriesUpdateContext);

export const SearchHistoriesContextProvider = ({
  state,
  refetch,
  children,
}: {
  state: State;
  refetch: () => void;
  children: JSX.Element;
}) => {
  return (
    <SearchHistoriesContext.Provider value={state}>
      <SearchHistoriesUpdateContext.Provider value={refetch}>
        {children}
      </SearchHistoriesUpdateContext.Provider>
    </SearchHistoriesContext.Provider>
  );
};

export const useSearchHistoriesContext = () =>
  useContext(SearchHistoriesContext);
