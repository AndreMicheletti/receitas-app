import axios from 'axios';

import { BACKEND_URL } from '../const';
import {
  FETCH_RECIPES_ATTEMPT,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILED,
  SELECT_CATEGORY_TYPE,
  OPEN_RECIPE_URL,
  CLOSE_RECIPE_URL,
} from './types';

export const selectCategoryType = (category) => {
  return {
    type: SELECT_CATEGORY_TYPE,
    payload: category,
  };
};

export const openRecipeUrl = (url) => {
  return { type: OPEN_RECIPE_URL, payload: url };
};

export const closeRecipeUrl = () => {
  return { type: CLOSE_RECIPE_URL };
};

export const fetchRecipes = (forCategory, ingredients, limit = 10) => {
  return (dispatch) => {
    dispatch({ type: FETCH_RECIPES_ATTEMPT });
    axios.post(`${BACKEND_URL}/recipe/${forCategory}`, { ingredients, limit })
      .then(response => recipesSuccessful(dispatch, response))
      .catch(err => recipesFailed(dispatch, err));
  };
};

export const fetchRecipesAll = (forCategory, params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_RECIPES_ATTEMPT });
    axios.get(`${BACKEND_URL}/recipe/${forCategory}`, { params })
      .then(response => recipesSuccessful(dispatch, response))
      .catch(err => recipesFailed(dispatch, err));
  };
};

function recipesSuccessful(dispatch, response) {
  dispatch({
    type: FETCH_RECIPES_SUCCESS,
    payload: response.data.success,
  });
}

function recipesFailed(dispatch, err) {
  console.log(err);
  dispatch({ type: FETCH_RECIPES_FAILED });
}
