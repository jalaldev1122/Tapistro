import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './slices/workflowSlice';

export const store = configureStore({
  reducer: {
    flow: workflowReducer,
  },
});

export default store;
