// search history item card
import React from "react";
// @mui/material
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";

const ThemeTextField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: theme.palette.mode === 'dark' ? '#FFFFFF66' : '#00000066',
  },
  '& label.Mui-focused': {
    color: theme.palette.mode === 'dark' ? '#FFFFFF66' : '#00000066',
  },
  '& .MuiFilledInput-root': {
    borderRadius: '20px',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A1A1A80' : '#FFFFFF33',
  },
}));

export default function CustomTextField(props) {
  return (
    <React.Fragment>
      <ThemeTextField 
        {...props} 
        variant="filled"
      />
    </React.Fragment>
  );
}
