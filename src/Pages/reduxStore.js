import { createSlice } from "@reduxjs/toolkit";

export const reduxStoreSlice = createSlice({
  name: "reduxStore",
  initialState: {
    musicData: null,
    updateData: null,
    refreshTime: null
  },
  reducers: {
    setMusicData: (state, action) => {
      state.musicData = action.payload;
    },
    setUpdateData: (state, action) => {
      state.updateData = action.payload;
    },
    setRefreshTime: (state, action) => {
      state.refreshTime = action.payload;
    },
  },
});

export const { setMusicData, setUpdateData, setRefreshTime } = reduxStoreSlice.actions;
export default reduxStoreSlice.reducer;
