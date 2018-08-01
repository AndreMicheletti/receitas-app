import { TUTORIAL_COMPLETED } from '../actions/types';

const INITIAL_STATE = {
  tutorial: false,
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TUTORIAL_COMPLETED:
      return { ...state, tutorial: true };
    default:
      return state;
  }
};

export default settingsReducer;
