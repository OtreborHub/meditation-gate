import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './slices/SliceTimer';
import videoReducer from './slices/SliceVideo';

const store = configureStore({
  reducer: {
    timer: timerReducer,
    environment: videoReducer,
  },
});

export default store;