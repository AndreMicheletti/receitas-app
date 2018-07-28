import {
  FETCH_INGREDIENTS_ATTEMPT,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
  INGREDIENT_INPUT_TEXT,
  INGREDIENT_REMOVE,
  UNSELECT_ALL,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  list: [],
  selected: ['açucar', 'ovos', 'leite'],
  textInput: '',
};

const ingredientsReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case INGREDIENT_INPUT_TEXT:
      if (action.payload.includes(',')) {
        const formatted = action.payload.replace(',', '').trim().toLowerCase();
        if (state.selected.indexOf(formatted) === -1) {
          return {
            ...state,
            textInput: '',
            selected: [...state.selected, formatted],
          };
        }
        return { ...state, textInput: '' };
      }
      return { ...state, textInput: action.payload };
    case INGREDIENT_REMOVE:
      return {
        ...state,
        selected: state.selected.filter(i => i !== action.payload),
      };
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
