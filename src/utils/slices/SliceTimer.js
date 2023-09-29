import { createSlice } from '@reduxjs/toolkit';

const timerReducer = createSlice({
  name: 'timer',
  initialState: 300000,
  reducers: {
    setToValue: (state, action) => {
      return action.payload; // Imposta il timer al valore fornito
    },

    addValue: (state, action) => {
      return state + action.payload; // Imposta il timer al valore attuale + il valore fornito
    },

    decrement: (state, action) => {
      return state - action.payload // Imposta il timer al valore fornito
    },
  },
});

export const { setToValue, addValue, decrement } = timerReducer.actions;

export default timerReducer.reducer;
