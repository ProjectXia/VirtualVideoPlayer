import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addToPlaylist: (state, action) => {
      state.items = [...state.items, action.payload];
      // ...state.items means keep what is in playlist
      // action.payload mean this append to end
    },
    removeFromPlaylist: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newPlaylist = [...state.items];

      if (index >= 0) {
        newPlaylist.splice(index, 1);
      } else {
        console.error(
          `Cant remove product (id: ${action.payload.id}) as its not in playlist!`
        );
      }
      state.items = newPlaylist;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPlaylist, removeFromPlaylist } = playlistSlice.actions;

export const selectPlaylistItems = (state) => state.playlist.items;

export const selectPlaylistItemsWithId = (state, id) =>
  state.playlist.items.filter((item) => item.id === id);

// export const selectPlaylistTotal = (state) =>
//   state.playlist.items.reduce((total, item) => (total += item.price), 0);

export default playlistSlice.reducer;
