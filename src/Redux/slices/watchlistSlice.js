import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchlistMovies: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      state.watchlistMovies.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlistMovies = state.watchlistMovies.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
