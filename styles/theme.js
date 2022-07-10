import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#263238",
      dark: "#08081c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#bf360c",
      contrastText: "#fff",
      dark: "rgb(133, 37, 8)",
      light: "rgb(203, 94, 60)",
    },
    error: {
      main: "#b71c1c",
    },
  },
});

export { theme };
