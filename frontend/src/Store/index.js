import { configureStore } from '@reduxjs/toolkit';
import aircraftReducer from './aircraftSlice';
import paramReducer from './paramsSlice';

export const store = configureStore({
  reducer: {
    aircraft: aircraftReducer,
    params: paramReducer,
  },
});