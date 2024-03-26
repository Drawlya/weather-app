import React from 'react';

//weather API
export var WeatherURL = "https://api.openweathermap.org/";
export var APIKey = "a91161fb0592e92f6124e0f4cd1327c9";

//theme settings
export const ColorModeContext = React.createContext({
    toggleColorMode: () => {},
  });