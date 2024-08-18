import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import { ColorModeContext, useMode } from "./muiTheme/MuiTheme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode(); // Corrected: use the theme from useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ bgcolor: theme.palette.bg.main }}> {/* Use theme here */}
          <Header />
          <Outlet />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;