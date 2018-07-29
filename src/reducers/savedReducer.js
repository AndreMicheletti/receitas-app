import {
  LIKED_RECIPE,
  UPDATE_RECIPE,
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  idList: [],
};

const savedReducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case LIKED_RECIPE:
      const { id } = action.payload;
      // this device has liked the recipe once?
      const isLifetimeLiked = state.idList.indexOf(id) >= 0;
      // this device has the recipe on its favorites?
      const isLiked = state.list.filter(recipe => recipe.id === id).length > 0;
      const resultState = {
        idList: isLifetimeLiked ? state.idList : [...state.idList, id],
      };
      if (isLiked) {
        // Remove from saved
        resultState.list = state.list.filter(i => i.id !== id);
      } else {
        // Add to saved
        resultState.list = [...state.list, action.payload];
      }
      return resultState;
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

export default savedReducer;
