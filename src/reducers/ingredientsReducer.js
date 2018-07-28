import {
  FETCH_INGREDIENTS_ATTEMPT,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
  SELECT_INGREDIENT,
  UNSELECT_ALL,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  list: [],
  selected: [],
};

const ingredientsReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case SELECT_INGREDIENT:
      const index = state.selected.indexOf(action.payload);
      const selectedCopy = [...state.selected];
      if (index >= 0) {
        selectedCopy.splice(index, 1);
      } else {
        selectedCopy.push(action.payload);
      }
      return { ...state, selected: selectedCopy };
    case UNSELECT_ALL:
      return { ...state, selected: [] };
    case FETCH_INGREDIENTS_ATTEMPT:
      return { ...state, loading: true };
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        selected: [],
        list: action.payload,
      };
    case FETCH_INGREDIENTS_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default ingredientsReducer;
