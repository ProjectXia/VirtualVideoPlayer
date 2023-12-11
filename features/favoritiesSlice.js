import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const favoritiesSlice = createSlice({
  name: "favlist",
  initialState,
  reducers: {
    addTofavlist: (state, action) => {
      const newItem = action.payload;
      const isDuplicate = state.items.some((item) => item.id === newItem.id);

      if (!isDuplicate) {
        state.items = [...state.items, newItem];
      } else {
        console.warn(
          `Item with ID ${newItem.id} already exists in the favlist.`
        );
      }
    },
    removeFromfavlist: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newFavlist = [...state.items];

      if (index >= 0) {
        newFavlist.splice(index, 1);
      } else {
        console.error(
          `Cant remove product (id: ${action.payload.id}) as its not in favlist!`
        );
      }
      state.items = newFavlist;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTofavlist, removeFromfavlist } = favoritiesSlice.actions;

export const selectfavlistItems = (state) => state.favlist.items;

export const selectfavlistItemsWithHTTP = (state, http) =>
  state.favlist.items.filter((item) => item.name === http);

export default favoritiesSlice.reducer;
