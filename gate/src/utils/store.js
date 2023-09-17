import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './SliceTimer';
import videoReducer from './SliceVideo';

const store = configureStore({
  reducer: {
    timer: timerReducer,
    environment: videoReducer,
  },
});

export default store;