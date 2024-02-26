import { createTheme } from "@mui/material/styles";

const themeMui = createTheme({
  typography: {
    fontFamily: "Kanit, sans-serif", // Specify your desired font-family
  },
  palette: {
    primary: {
      main: "#f87198", // Specify your desired primary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Remove the box shadow
        },
      },
    },
   
  },
});

export default themeMui;
