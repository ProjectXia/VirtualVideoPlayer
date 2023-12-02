import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  stream: "",
  height: 800,
  width: 600,
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
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setValue } = playSlice.actions;
export const { setStream } = playSlice.actions;
export const { setHeight } = playSlice.actions;
export const { setWidth } = playSlice.actions;
export const selectPlayValue = (state) => state.play.value;
export const selectStream = (state) => state.play.stream;
export const selectHeight = (state) => state.play.height;
export const selectWidth = (state) => state.play.width;
export default playSlice.reducer;
