import { combineReducers } from '@reduxjs/toolkit';
import MovieSlice from './slices/MovieSlice';

const rootReducer = combineReducers({
  movies: MovieSlice
  // watchlist: watchlistSlice,
});

export default rootReducer;
