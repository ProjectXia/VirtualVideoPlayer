import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValue } = tourSlice.actions;
export const selectTourValue = (state) => state.tour.value;
export default tourSlice.reducer;
