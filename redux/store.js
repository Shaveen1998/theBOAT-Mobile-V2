// store.js

import { createStore, combineReducers } from 'redux';
import placesReducer from './reducers/placeReducer';

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer);

export default store;
