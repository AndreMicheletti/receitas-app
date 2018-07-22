import axios from 'axios';

import { BACKEND_URL } from '../const';
import {
  FETCH_RECIPES_ATTEMPT,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILED,
  SELECT_INGREDIENT
} from './types';

export const fetchRecipes = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_RECIPES_ATTEMPT });
    axios.post(`${BACKEND_URL}/recipe`, params)
      .then(response => recipesSuccessful(dispatch, response))
      .catch(err => recipesFailed(dispatch, err))
  };
};

export const fetchRecipesAll = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_RECIPES_ATTEMPT });
    axios.get(`${BACKEND_URL}/recipe`)
      .then(response => recipesSuccessful(dispatch, response))
      .catch(err => recipesFailed(dispatch, err))
  };
};

function recipesSuccessful(dispatch, response) {
  dispatch({
    type: FETCH_RECIPES_SUCCESS,
    payload: response.data.success
  });
}

function recipesFailed(dispatch, err) {
  console.log(err);
  dispatch({ type: FETCH_RECIPES_FAILED });
}
