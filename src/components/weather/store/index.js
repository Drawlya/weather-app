import { createSlice } from "@reduxjs/toolkit";
import { GetCoordinatesByLocationName, GetCurrentWeatherData } from "../../../services/WeatherService";

// initial state
const initialState = {
  currentWeather: {},
  history: [],
  searchText: '',
  countryList: [],
};

// create reducer and action creators
const weather = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setValues: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      })
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetCoordinatesByLocationName.fulfilled, (state, action) => {
        state.countryList = action.payload;
      })
      .addCase(GetCurrentWeatherData.fulfilled, (state, action) => {
        state.currentWeather = action.payload;
      })
  },
});

// export actions
export const { setValues, reset } = weather.actions;

// export the reducer
export default weather.reducer;