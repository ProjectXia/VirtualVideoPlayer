import { configureStore } from "@reduxjs/toolkit";
import playReducer from "./features/playSlice";
import playlistSlice from "./features/playlistSlice";
import favoritiesSlice from "./features/favoritiesSlice";
import tourSlice from "./features/tourSlice";

export const store = configureStore({
  reducer: {
    play: playReducer,
    playlist: playlistSlice,
    favlist: favoritiesSlice,
    tour: tourSlice,
  },
});
