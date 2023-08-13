import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  watchLater: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const movie = action.payload;
      if (!state.favorites.find(item => item.id === movie.id)) {
        state.favorites.push(movie);
      }
    },
    removeFromFavorites: (state, action) => {
      const movieId = action.payload;
      state.favorites = state.favorites.filter(item => item.id !== movieId);
    },
    addToWatchLater: (state, action) => {
      const movie = action.payload;
      if (!state.watchLater.find(item => item.id === movie.id)) {
        state.watchLater.push(movie);
      }
    },
    removeFromWatchLater: (state, action) => {
      const movieId = action.payload;
      state.watchLater = state.watchLater.filter(item => item.id !== movieId);
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addToWatchLater,
  removeFromWatchLater,
} = movieSlice.actions;

export default movieSlice.reducer;
