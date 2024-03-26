import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  isLoading: false,
};

// create reducer and action creators
const general = createSlice({
  name: "general",
  initialState,
  reducers: {
    setValues: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      })
    },
    reset: () => initialState,
  },
});

// export actions
export const { setValues, reset } = general.actions;

// export the reducer
export default general.reducer;