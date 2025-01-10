import { Currency2 } from "@/types/currency.types";
import { QuotationPriceSummary } from "@/types/quotations.types";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  priceSummary: QuotationPriceSummary;
  isCalculating: boolean;
  vatPercentage: number;
  selectedCurrency: Currency2;
};

const NewQuotationPriceSummary = ({
  priceSummary,
  isCalculating,
  vatPercentage,
  selectedCurrency,
}: Props) => {
  return (
    <Stack spacing={1} justifyContent="flex-end">
      <Stack direction="row" spacing={2}>
        <Box flex={{ xl: 6, lg: 5, md: 3, sm: 2, xs: 0 }}></Box>
        <Typography flex={1} variant="body1">
          Subtotal
        </Typography>
        <Typography flex={1} variant="body1" align="right">
          {selectedCurrency.currency_code}{" "}
          {priceSummary.subtotal.toLocaleString()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Box flex={{ xl: 6, lg: 5, md: 3, sm: 2, xs: 0 }}></Box>
        <Typography flex={1} variant="body1">
          VAT ({vatPercentage}%)
        </Typography>
        <Typography flex={1} variant="body1" align="right">
          {selectedCurrency.currency_code} {priceSummary.vat.toLocaleString()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Box flex={{ xl: 6, lg: 5, md: 3, sm: 2, xs: 0 }}></Box>
        <Typography flex={1} variant="body1" fontWeight={600}>
          Total
        </Typography>
        <Typography flex={1} variant="body1" align="right" fontWeight={600}>
          {selectedCurrency.currency_code}{" "}
          {priceSummary.finalTotal.toLocaleString()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NewQuotationPriceSummary;
