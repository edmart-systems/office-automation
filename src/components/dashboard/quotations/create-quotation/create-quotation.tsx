"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import BasicInfo from "./basic-info";
import ClientInfo from "./client-info";
import QuotationLineItems from "./quotation-line-items";
import DiscountInfo from "./discount-info";
import NewQuotationTscInfo from "./new-quotation-tsc-info";
import NewQuotationPriceSummary from "./new-quotation-price-summary";

const MyDivider = styled(Divider)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#b8b8b8" : "#dadada",
}));

const CreateQuotation = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <BasicInfo />
          <MyDivider />
          <ClientInfo />
          <MyDivider />
          <QuotationLineItems />
          <MyDivider />
          <DiscountInfo />
          <MyDivider />
          <NewQuotationTscInfo />
          <MyDivider />
          <NewQuotationPriceSummary />
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button color="error" variant="outlined">
          Cancel
        </Button>
        <Button color="primary" variant="contained">
          Create Quotation
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateQuotation;
