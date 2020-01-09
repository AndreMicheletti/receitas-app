import { combineReducers } from 'redux';

import ingredientsReducer from './ingredientsReducer';
import recipesReducer from './recipesReducer';
import savedReducer from './savedReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
  ingredients: ingredientsReducer,
  recipes: recipesReducer,
  saved: savedReducer,
  settings: settingsReducer,
});
