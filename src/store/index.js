import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './general';
import weatherReducer from '../components/weather/store';

const store = configureStore({
  reducer: {
    general: generalReducer,
    weather: weatherReducer,
  }
})

export default store