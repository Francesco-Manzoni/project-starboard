import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5a3c',
    },
    secondary: {
      main: '#ff0783',
    },
    error: {
      main: '#cc0000',
    },
    success: {
      main: '#4BB543',
    },
    info: {
      main: '#ffffff',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
