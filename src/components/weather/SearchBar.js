// Search bar
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
// @mui/material
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
// core components
import TextField from "../../shared-components/CustomTextField";
// service + store
import { GetCoordinatesByLocationName } from "../../services/WeatherService";
import { setValues as setWeatherValues } from "./store";
// css
import styles from '../../assets/css/weather/search.module.css';
import searchIcon from '../../assets/icons/white/search.svg';

export default function SearchBar() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const countryList = useSelector(store => store.weather.countryList);
  const history = useSelector(store => store.weather.history);
  const [searchText, setSearchText] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState(false);

  const handleOnEnter = (e) => {
    e.preventDefault();
    if (e.target[0] && e.target[0].value !== '') {
      dispatch(GetCoordinatesByLocationName({searchText: e.target[0].value}))
      .then((response) => {
        if (!response.error && response.payload.length) {
          handleOnSearch(response.payload[0]);
        }
      });
    } 
  }

  const handleOnSearch = (value) => {
    let payload = _.cloneDeep(history);
    if (typeof value === 'object') {
      const historyIndex = payload.findIndex((item) => item.country === value.country && item.name === value.name);
      if (historyIndex !== -1) {
        payload[historyIndex] = {...payload[historyIndex], datetime: moment().format()};
        payload.unshift(payload.splice(historyIndex, 1)[0]);
        localStorage.setItem('history', JSON.stringify(payload));
        dispatch(setWeatherValues({history: payload}));
      } else {
        localStorage.setItem('history', JSON.stringify([{...value, datetime: moment().format()}, ...payload]));
        dispatch(setWeatherValues({history: [{...value, datetime: moment().format()}, ...payload]}));

      }
    }
    setSearchText('');
  };

  React.useEffect(() => {
    const controller = new AbortController();
    if (searchText !== '') {
      dispatch(GetCoordinatesByLocationName({searchText, signal: controller.signal}))
      .then((response) => {
        if (!response.error && response.payload.length) {
          setErrorMsg(false);
        } else {
          setErrorMsg(true);
        }
      });
    }
    return () => {
      controller.abort();
    }
  },[dispatch, searchText]);

  return (
    <React.Fragment>
      <form className={styles.textfieldContainer} onSubmit={(e) => handleOnEnter(e)}>
        <Autocomplete
          id="search"
          freeSolo
          fullWidth
          disableClearable
          className={styles.textfield}
          options={countryList}
          getOptionLabel={(option) => option.name ? option.name + ", " + option.country : option}
          renderInput={(params) => (
            <TextField
              {...params}
              id="search"
              label="Country"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              error={errorMsg}
              helperText={errorMsg ? "No Results Found" : null}
            />
          )}
          
        />
        <IconButton type="submit" className={styles.iconButton} aria-label="search" size="small" data-theme={theme.palette.mode}>
          <img src={searchIcon} alt="search" className={styles.icon}/>
        </IconButton>
      </form>
    </React.Fragment>
  );
}
