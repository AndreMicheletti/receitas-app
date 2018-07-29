import axios from 'axios';

import { BACKEND_URL } from '../const';
import {
  LIKED_RECIPE,
  UPDATE_RECIPE,
} from './types';

export const likeRecipe = (recipeData, isLifetimeLiked) => {
  return (dispatch) => {
    dispatch({
      type: LIKED_RECIPE,
      payload: recipeData,
    });
    if (!isLifetimeLiked) {
      axios.put(`${BACKEND_URL}/recipe/like/${recipeData.id}`)
        .then((response) => {
          dispatch({
            type: UPDATE_RECIPE,
            payload: response.data.success,
          });
        });
    }
  };
};
