import { createSlice } from '@reduxjs/toolkit';

const videoReducer = createSlice({
  name: 'environment',
  initialState: 0,
  reducers: {
    setToValue: (state, action) => {
      return action.payload;
    },

  },
});

export const { setToValue } = videoReducer.actions;

export default videoReducer.reducer;
