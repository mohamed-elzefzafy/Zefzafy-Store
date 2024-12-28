import { Box, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.appbarColor?.main,
        py: 2,
        display: "flex",
        justifyContent: "center",
        width: "100%",
        zIndex : "1100",
        position : "relative",
        mt :2
      }}
    >
      <Typography color="white" fontWeight="bold">
        Zefzafy-store &copy; {currentYear}
      </Typography>
    </Box>
  );
};

export default Footer;
