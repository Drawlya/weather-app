// search history item card
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
// @mui/material
import { useTheme } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
// css
import styles from '../../assets/css/weather/SearchHistory.module.css';
import searchLight from '../../assets/icons/light/search.svg';
import deleteLight from '../../assets/icons/light/delete.svg';
import searchDark from '../../assets/icons/dark/search.svg';
import deleteDark from '../../assets/icons/dark/delete.svg';
import { setValues } from "./store";

export default function SearchHistory({item, index}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useSelector(store => store.weather.history);

  const handleOnSearch = () => {
    let payload = _.cloneDeep(history);
    payload[index] = {...payload[index], datetime: moment().format()}; // update new date time
    payload.unshift(payload.splice(index, 1)[0]); // move to first in array
    localStorage.setItem('history', JSON.stringify(payload));
    dispatch(setValues({history: payload}));
  };

  const handleOnDelete = () => {
    let payload = _.cloneDeep(history);
    payload.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(payload));
    dispatch(setValues({history: payload}));
  };

  return (
    <React.Fragment>
      {item 
      ? <Paper elevation={0} className={styles.paper} data-theme={theme.palette.mode}>
          <div className={styles.leftContent}>
            <Typography className={styles.country}>
              {item.name + ', ' + item.country}
            </Typography>
            <Typography className={styles.datetime} data-theme={theme.palette.mode}>
              {moment(item.datetime).format("DD-MM-YYYY hh:mm a")}
            </Typography>
          </div>
          <div className={styles.rightContent}>
            <IconButton className={styles.iconButton} aria-label="search" size="small" data-theme={theme.palette.mode} onClick={handleOnSearch}>
              <img src={theme.palette.mode==='dark' ? searchDark : searchLight} alt="search" className={styles.icon}/>
            </IconButton>
            <IconButton className={styles.iconButton} aria-label="delete" size="small" data-theme={theme.palette.mode} onClick={handleOnDelete}>
              <img src={theme.palette.mode==='dark' ? deleteDark : deleteLight} alt="delete" className={styles.icon}/>
            </IconButton>
          </div>
        </Paper>
      : null}
    </React.Fragment>
  );
}
