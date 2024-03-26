// axios interceptors
import axios from "axios";
import { WeatherURL } from "../config";
import { setValues } from "../store/general";

/**
 * parse error response
 */
const parseError = (response) => {
  // error
  if (response.error) {
    if (response.error.message) {
      return Promise.reject({ message: response.error.message });
    }
  } else {
    return Promise.reject({ error: {message: 'An error has occurred!'} });
  }
}

/**
 * parse response
 */
const parseBody = (response) => {
  if (response.status === 200) {
    return response;
  } else {
    return this.parseError(response.data.messages);
  }
}

/**
 * axios instance
 */
export const WeatherMS = axios.create({
  baseURL: WeatherURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const interceptor = (store) => {
  // request header
  WeatherMS.interceptors.request.use((config) => {
    if (!config.noLoading) {
      store.dispatch(setValues({isLoading: true}));
    }
    return config;
  }, error => {
    return Promise.reject(error);
  }, null)

  // response parse
  WeatherMS.interceptors.response.use((response) => {
    store.dispatch(setValues({isLoading: false}));
    return parseBody(response, store);
  }, error => {
    store.dispatch(setValues({isLoading: false, error: error.message !== 'canceled' ? "An internal error occurred during your request!" : false}));
    console.warn('Error status', error.response.status);
    if (error.response) { 
      return parseError(error.response.data);
    } else {
      return Promise.reject(error);
    }
  })
}