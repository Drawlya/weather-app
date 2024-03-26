// search history item card
import React from "react";
// @mui/material
import { useTheme } from '@mui/material/styles';
// css
import { ColorModeContext } from '../../config';
import styles from '../../assets/css/weather/main.module.css';
import Switch from "../../shared-components/Switch";
import WeatherDetail from "./WeatherDetail";

export default function Main() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <React.Fragment>
      <div className={styles.container} data-theme={theme.palette.mode}>
        <div className={styles.switch}>
          <Switch 
            checked={theme.palette.mode==="dark"}
            onChange={() => colorMode.toggleColorMode()}
          />
        </div>
        <WeatherDetail />
      </div>
    </React.Fragment>
  );
}
