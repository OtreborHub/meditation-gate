import { createSlice } from '@reduxjs/toolkit';

const videoReducer = createSlice({
  name: 'environment',
  initialState: "Rain Forest",
  reducers: {
    setToValue: (state, action) => {
      return action.payload; // Imposta il timer al valore fornito
    },

  },
});

export const { setToValue } = videoReducer.actions;

export default videoReducer.reducer;
