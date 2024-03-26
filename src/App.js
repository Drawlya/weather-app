import React from "react";
import { Provider } from "react-redux";
// @mui/material
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ColorModeContext } from './config';
// core components
import Main from "./components/weather/Main.js";

// import "assets/css/index.css";
import { interceptor } from "./services";
import store from "./store";

interceptor(store);

const App = () => {
  const [mode, setMode] = React.useState('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <React.Fragment>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Main />
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.Fragment>
  );
}

export default App;
