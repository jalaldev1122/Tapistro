import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodeDrawerOpen: false,
  nodeDrawerNodeId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openNodeDrawer(state, action) {
      state.nodeDrawerOpen = true;
      state.nodeDrawerNodeId = action.payload;
    },
    closeNodeDrawer(state) {
      state.nodeDrawerOpen = false;
      state.nodeDrawerNodeId = null;
    },
  },
});

export const { openNodeDrawer, closeNodeDrawer } = uiSlice.actions;
export default uiSlice.reducer;
