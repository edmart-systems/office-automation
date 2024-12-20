import { Grid2 as Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const BasicInfo = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight={600}>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Quotation Number"
            value="Auto Generated"
            size="small"
            fullWidth
            // slotProps={{
            //   input: {
            //     readOnly: false,
            //   },
            // }}
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField label="TIN" value="11002332453" size="small" fullWidth />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Issue Date"
            value={new Date().toString()}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="External Ref"
            value="Email"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField label="Validity" value="30 Days" size="small" fullWidth />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Payment Grace Period"
            value="20 Days"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BasicInfo;
