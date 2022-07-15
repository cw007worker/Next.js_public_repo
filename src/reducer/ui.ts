import { ExpandedIndex } from '@chakra-ui/react';

const SET_ACCORDION_INDEX = 'SEARCH/SET_ACCORDION_INDEX' as const;

export const uiActionTypes = {
  search: {
    SET_ACCORDION_INDEX,
  },
};

const setAccordionIndex = (numbers: ExpandedIndex) => {
  return { type: SET_ACCORDION_INDEX, payload: numbers };
};

export const uiActions = {
  setAccordionIndex,
};

export type UIActionType = ReturnType<typeof setAccordionIndex>;

export type InitialState = {
  search: {
    accordionIndex: ExpandedIndex;
  };
};

export const initialState: InitialState = {
  search: {
    accordionIndex: [],
  },
};

export const uiReducer = (state: InitialState, action: UIActionType) => {
  switch (action.type) {
    case SET_ACCORDION_INDEX:
      return {
        ...state,
        search: {
          ...state.search,
          accordionIndex: action.payload,
        },
      };
    default:
      return state;
  }
};
