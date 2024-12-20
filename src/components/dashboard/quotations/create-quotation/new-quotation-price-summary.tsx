import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const NewQuotationPriceSummary = () => {
  return (
    <Stack spacing={1} justifyContent="flex-end">
      <Stack direction="row" spacing={2}>
        <Box flex={{ xl: 6, lg: 5, md: 3, sm: 2, xs: 0 }}></Box>
        <Typography flex={1} variant="body1">
          Subtotal
        </Typography>
        <Typography flex={1} variant="body1" align="right">
          UGX {(200000).toLocaleString()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Box flex={{ xl: 6, lg: 5, md: 3, sm: 2, xs: 0 }}></Box>
        <Typography flex={1} variant="body1">
          VAT (18%)
        </Typography>
        <Typography flex={1} variant="body1" align="right">
          UGX {(110000).toLocaleString()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Box flex={{ xl: 6, lg: 5, md: 3, sm: 2, xs: 0 }}></Box>
        <Typography flex={1} variant="body1" fontWeight={600}>
          Total
        </Typography>
        <Typography flex={1} variant="body1" align="right" fontWeight={600}>
          UGX {(310000).toLocaleString()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NewQuotationPriceSummary;
