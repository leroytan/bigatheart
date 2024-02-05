import { createTheme } from "@mui/material";
import { deepOrange, green, grey, orange, purple, teal } from "@mui/material/colors";


  export const lightTheme = createTheme({
    spacing: 4,
    components: {
      MuiToolbar: {
          styleOverrides: {
              dense: {
                  height: 60,
                  minHeight: 60,
              }
          }
      }
  },
    palette: {
        background : {
        },
        mode: "light",
        text:{
        },
      primary: {
        
        main: orange[800],
        
      },
      
    },
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
  });
  