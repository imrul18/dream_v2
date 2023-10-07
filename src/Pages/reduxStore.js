import { createSlice } from "@reduxjs/toolkit";

export const reduxStoreSlice = createSlice({
  name: "reduxStore",
  initialState: {
    musicData: null,
    oldData: null,
    updateData: null,
    refreshTime: null
  },
  reducers: {
    setMusicData: (state, action) => {
      state.musicData = action.payload;
    },
    setOldData: (state, action) => {
      state.oldData = action.payload;
    },
    setUpdateData: (state, action) => {
      state.updateData = action.payload;
    },
    setRefreshTime: (state, action) => {
      state.refreshTime = action.payload;
    },
  },
});

export const { setMusicData, setOldData, setUpdateData, setRefreshTime } = reduxStoreSlice.actions;
export default reduxStoreSlice.reducer;
