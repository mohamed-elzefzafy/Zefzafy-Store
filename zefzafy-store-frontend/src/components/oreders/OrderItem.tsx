import { Box, Button, Stack, Typography, useTheme } from "@mui/material";


const OrderItem = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        gap: { xs: 2, sm: 4 },
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: 150, sm: 200, md: 250 },
          height: { xs: 150, sm: 200, md: 250 },
          overflow: "hidden",
          borderRadius: 2,
          backgroundColor: theme.palette.grey[200],
        }}
      >
        <img
          alt="Product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Box>

      <Stack spacing={2} sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h6" fontWeight="bold">
          {/* Product Name */}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent={{ xs: "center", sm: "flex-start" }} gap={2}>
          <Typography variant="body1" fontWeight="bold">
            Price:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {/* $ Price */}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent={{ xs: "center", sm: "flex-start" }} gap={2}>
          <Typography variant="body2" color="text.secondary">
            In Stock:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* Stock Count */}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="flex-end" justifyContent={{ xs: "center", sm: "flex-start" }} gap={2}>
          <Typography variant="body1">Quantity:</Typography>
          <Typography variant="body1">2</Typography>
        </Stack>

        <Box>
          <Button size="small" variant="contained" sx={{ textTransform: "capitalize" }}>
            Remove
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};


export default OrderItem;