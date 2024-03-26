import { createAsyncThunk } from "@reduxjs/toolkit";

import {WeatherMS} from ".";
import { APIKey } from "../config";

export const GetCoordinatesByLocationName = createAsyncThunk(
  "weather/getCoordinatesByLocationName", 
  async ({signal, searchText}, {rejectWithValue}) => {
    const params = {
      q: searchText,
      limit: 10,
      appid: APIKey
    };
    try {
      const response = await WeatherMS.get("geo/1.0/direct", {params, signal, noLoading: true});
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const GetCurrentWeatherData = createAsyncThunk(
  "weather/getCurrentWeatherData", 
  async ({...param}, {rejectWithValue}) => {
    const params = {
      ...param,
      units: 'metric',
      appid: APIKey
    };
    try {
      const response = await WeatherMS.get("/data/2.5/weather", {params});
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);