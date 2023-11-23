import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValue } = playSlice.actions;
export const selectPlayValue = (state) => state.play.value;
export default playSlice.reducer;
