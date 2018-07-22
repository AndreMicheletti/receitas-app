import { combineReducers } from 'redux';

import ingredientsReducer from './ingredientsReducer';
import recipesReducer from './recipesReducer';

export default combineReducers({
  ingredients: ingredientsReducer,
  recipes: recipesReducer
});
