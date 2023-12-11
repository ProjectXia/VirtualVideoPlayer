import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  stream: "",
};

export const playSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setStream: (state, action) => {
      state.stream = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValue } = playSlice.actions;
export const { setStream } = playSlice.actions;
export const selectPlayValue = (state) => state.play.value;
export const selectStream = (state) => state.play.stream;
export default playSlice.reducer;
