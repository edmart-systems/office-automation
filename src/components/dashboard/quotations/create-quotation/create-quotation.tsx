"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import BasicInfo from "./basic-info";
import ClientInfo from "./client-info";
import QuotationLineItems from "./quotation-line-items";
import TaxDiscountInfo from "./tax-discount-info";
import NewQuotationTscInfo from "./new-quotation-tsc-info";
import NewQuotationPriceSummary from "./new-quotation-price-summary";
import { Save } from "@mui/icons-material";

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
          <TaxDiscountInfo />
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
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Tooltip title="Save As Draft" arrow>
            <IconButton color="secondary" size="large">
              <Save />
            </IconButton>
          </Tooltip>
          {/* <Button color="secondary" variant="outlined" startIcon={<Save />}>
            Save As Draft
          </Button> */}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button color="error" variant="outlined">
            Cancel
          </Button>
          <Button color="primary" variant="contained">
            Create Quotation
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CreateQuotation;
