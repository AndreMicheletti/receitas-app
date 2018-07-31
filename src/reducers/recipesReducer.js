import {
  FETCH_RECIPES_ATTEMPT,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILED,
  SELECT_CATEGORY_TYPE,
  UPDATE_RECIPE,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  selectedCategory: null,
  list: [],
  openRecipe: null,
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CATEGORY_TYPE:
      return { ...state, selectedCategory: action.payload };
    case FETCH_RECIPES_ATTEMPT:
      return { ...state, loading: true, endReached: false };
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case FETCH_RECIPES_FAILED:
      return { ...state, loading: false };
    case UPDATE_RECIPE:
      return {
        ...state,
        list: state.list.map((recipe) => {
          if (recipe.id === action.payload.id) {
            return action.payload;
          }
          return recipe;
        }),
      };
    default:
      return state;
  }
};

export default recipesReducer;
