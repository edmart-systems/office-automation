import {
  Grid2 as Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const TaxDiscountInfo = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight={600}>
        Discount
      </Typography>
      <Grid container spacing={3}>
        <Grid size={6}>
          <TextField
            label="Discount"
            value="0"
            size="small"
            fullWidth
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              },
            }}
          />
        </Grid>
        {/* <Grid size={4}>
          <TextField label="Shipping Rate" value={0} size="small" fullWidth />
        </Grid> */}
        <Grid size={6}>
          <TextField
            label="Tax Rate"
            value="18"
            size="small"
            fullWidth
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              },
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TaxDiscountInfo;
