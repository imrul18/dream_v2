import { createSlice } from "@reduxjs/toolkit";

export const reduxStoreSlice = createSlice({
  name: "reduxStore",
  initialState: {
    musicData: null,
  },
  reducers: {
    setMusicData: (state, action) => {
      state.musicData = action.payload;
    },
  },
});

export const { setMusicData } = reduxStoreSlice.actions;
export default reduxStoreSlice.reducer;
