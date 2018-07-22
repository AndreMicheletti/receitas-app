import {
  FETCH_INGREDIENTS_ATTEMPT,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
  SELECT_INGREDIENT,
  UNSELECT_ALL
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  list: []
}

const ingredientsReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type) {
    case SELECT_INGREDIENT:
      let copy = [...state.list]
      copy[action.payload].selected = !copy[action.payload].selected
      return { ...state, list: copy };
    case UNSELECT_ALL:
      return {
        ...state,
        list: state.list.map(i => { return {...i, selected: false}})
      }
    case FETCH_INGREDIENTS_ATTEMPT:
      return {...state, loading: true };
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.map(item => {
          return { name: item, selected: false };
        })
      };
    case FETCH_INGREDIENTS_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default ingredientsReducer;
