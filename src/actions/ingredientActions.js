import axios from 'axios';

import { BACKEND_URL } from '../const';
import {
  FETCH_INGREDIENTS_ATTEMPT,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
  SELECT_INGREDIENT,
  UNSELECT_ALL
} from './types';

export const selectIngredient = (index) => {
  return { type: SELECT_INGREDIENT, payload: index }
};

export const unselectAllIngredient = () => {
  return { type: UNSELECT_ALL };
};

export const fetchIngredients = (forCategory) => {
  return (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_ATTEMPT });
    axios.get(`${BACKEND_URL}/ingredient/${forCategory}`)
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
