import { Message, Phone } from "@mui/icons-material";
import {
  Grid2 as Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const ClientInfo = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight={600}>
        Client Information
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Name"
            value="Uzima Chicken"
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
          <TextField
            label="Contact Person"
            value="Optimus Prime"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Email"
            value="procurement@uzimachicken.com"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Phone"
            value="0393255022"
            size="small"
            fullWidth
            // slotProps={{
            //   input: {
            //     startAdornment: (
            //       <InputAdornment position="start">
            //         <Phone />
            //       </InputAdornment>
            //     ),
            //   },
            // }}
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Box Number"
            // value="11233"
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">P. O. Box</InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField label="Country" value="Uganda" size="small" fullWidth />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField label="City" value="Kampala" size="small" fullWidth />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Street Address"
            value="Plot 128, Ntinda"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ClientInfo;
