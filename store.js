import { configureStore } from "@reduxjs/toolkit";
import playReducer from "./features/playSlice";

export const store = configureStore({
  reducer: { play: playReducer },
});
