import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import { ColorModeContext, useMode } from "./muiTheme/MuiTheme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Footer from "./components/shared/Footer";

function App() {
  const [theme, colorMode] = useMode(); 

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ bgcolor: theme.palette.bg.main }}> 
          <Header />
          <Box sx={{ minHeight: "calc(100vh - 120px)" }}>
      <Outlet />
      </Box>
          <Footer/>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;