import { createContext, useState, useMemo } from "react";
import { createTheme, Theme, PaletteOptions } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

// Define a type for the color mode (either "light" or "dark")
type Mode = "light" | "dark";

// Extend MUI's Palette interface to include custom colors
declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
    };
    favColor: {
      main: string;
    };
    myColor: {
      main: string;
    };
    bg: {
      main: string;
    };
  }

  interface PaletteOptions {
    neutral?: {
      main: string;
    };
    favColor?: {
      main: string;
    };
    myColor?: {
      main: string;
    };
    bg?: {
      main: string;
    };
  }
}

// Define the type for the design tokens based on the mode
export const getDesignTokens = (mode: Mode): PaletteOptions => ({
  mode,
  ...(mode === "light"
    ? {
        text: { primary: "#2B3445" },
        neutral: { main: "#64748B" },
        favColor: { main: grey[300] },
        myColor: { main: "#F6F9FC" },
        bg: { main: "#F6F6F6" }, // Ensure this is defined
      }
    : {
        text: { primary: "#fff" },
        neutral: { main: "#64748B" },
        favColor: { main: grey[800] },
        myColor: { main: "#252b32" },
        bg: { main: "#1D2021" },
      }),
});

// Define the shape of the ColorModeContext
interface ColorModeContextType {
  toggleColorMode: () => void;
}

// Create the context with a default value
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});

// Custom hook to handle theme and color mode toggling
export const useMode = (): [Theme, ColorModeContextType] => {
  const [mode, setMode] = useState<Mode>(
    (localStorage.getItem("mode") as Mode) || "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme({ palette: getDesignTokens(mode) }), [mode]);

  return [theme, colorMode];
};
