import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './Slices/SliceTimer';
import videoReducer from './Slices/SliceVideo';

const store = configureStore({
  reducer: {
    timer: timerReducer,
    environment: videoReducer,
  },
});

export default store;