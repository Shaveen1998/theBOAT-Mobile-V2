// placesReducer.js

import { SET_PLACES } from "../actions/placeAcitions";

const initialState = {
  places: [],
};

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.payload,
      };
    default:
      return state;
  }
};

export default placesReducer;
