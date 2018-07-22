import axios from 'axios';

import { BACKEND_URL } from '../const';
import {
  FETCH_INGREDIENTS_ATTEMPT,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
  SELECT_INGREDIENT
} from './types';

export const selectIngredient = (index) => {
  return { type: SELECT_INGREDIENT, payload: index }
};

export const fetchIngredients = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_ATTEMPT });
    axios.get(`${BACKEND_URL}/ingredient`)
      .then(response => {
        dispatch({
          type: FETCH_INGREDIENTS_SUCCESS,
          payload: response.data.success
        });
        return;
      })
      .catch(err => {
        dispatch({ type: FETCH_INGREDIENTS_FAILED });
        return;
      })
  }
}
