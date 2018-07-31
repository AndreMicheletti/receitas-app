import { combineReducers } from 'redux';

import ingredientsReducer from './ingredientsReducer';
import recipesReducer from './recipesReducer';
import savedReducer from './savedReducer';

export default combineReducers({
  ingredients: ingredientsReducer,
  recipes: recipesReducer,
  saved: savedReducer,
});
