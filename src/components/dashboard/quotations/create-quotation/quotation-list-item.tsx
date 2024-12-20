import { DeleteForever } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Grid2 as Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  num: number;
  deleteFn: () => void;
};

const QuotationListItem = ({ num, deleteFn }: Props) => {
  return (
    <Stack spacing={2}>
      <Grid container spacing={{ xl: 1, lg: 1, md: 2, sm: 2, xs: 2 }}>
        <Grid
          size={{ xl: 0.4, lg: 0.4, md: 0.4, sm: 0.5, xs: 0.5 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar sx={{ height: "30px", width: "30px" }}>
            <Typography variant="body1">{num}</Typography>
          </Avatar>
        </Grid>
        <Grid size={{ xl: 3, lg: 3, md: 5, sm: 5, xs: 11.5 }}>
          <TextField
            label="Product/Service Name"
            value="Network Installation"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ xl: 4, lg: 4, md: 6.6, sm: 6.5, xs: 12 }}>
          <TextField
            label="Description"
            value="Survey and structured cable installation"
            size="small"
            multiline
            minRows={1}
            fullWidth
          />
        </Grid>
        <Grid size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 6 }}>
          <TextField label="Quantity" value="1" size="small" fullWidth />
        </Grid>
        <Grid size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 6 }}>
          <TextField label="Units" value="Lump-sum" size="small" fullWidth />
        </Grid>
        <Grid size={{ xl: 2, lg: 2, md: 5.4, sm: 5.4, xs: 11 }}>
          <TextField
            label="Unit Price"
            value="UGX 33,000,000"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid
          size={{ xl: 0.6, lg: 0.6, md: 0.6, sm: 0.6, xs: 1 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton onClick={deleteFn}>
            <DeleteForever />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </Stack>
  );
};

export default QuotationListItem;
