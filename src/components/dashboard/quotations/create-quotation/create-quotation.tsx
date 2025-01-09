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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicInfo from "./basic-info";
import ClientInfo from "./client-info";
import QuotationLineItems from "./quotation-line-items";
import TaxDiscountInfo from "./tax-discount-info";
import NewQuotationTscInfo from "./new-quotation-tsc-info";
import NewQuotationPriceSummary from "./new-quotation-price-summary";
import { Save } from "@mui/icons-material";
import { CreateQuotationPageData, TcsDto } from "@/types/quotations.types";
import { Quotation_type } from "@prisma/client";

const MyDivider = styled(Divider)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#b8b8b8" : "#dadada",
}));

type Props = {
  baseData: CreateQuotationPageData;
};

const CreateQuotation = ({ baseData }: Props) => {
  const { company, quotationTypes, tcs } = baseData;
  const [editTcs, setEditTcs] = useState<boolean>(false);
  const [selectedQuoteType, setSelectedQuoteType] = useState<Quotation_type>(
    quotationTypes[0]
  );
  const [selectedTcs, setSelectedTcs] = useState<TcsDto>(tcs[0]);

  useEffect(() => {
    const newSelectedTc = tcs.filter(
      (item) => item.quotation_type_id === selectedQuoteType.type_id
    )[0];
    setSelectedTcs(newSelectedTc);
  }, [selectedQuoteType]);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <BasicInfo
            tin={company.tin ?? "N/A"}
            quotationTypes={quotationTypes}
            selectedTcs={selectedTcs}
            selectedQuoteType={selectedQuoteType}
            setSelectedQuoteType={setSelectedQuoteType}
            setSelectedTcs={setSelectedTcs}
            tcs={tcs}
            editTcs={editTcs}
            setEditTcs={setEditTcs}
          />
          <MyDivider />
          <ClientInfo />
          <MyDivider />
          <QuotationLineItems />
          <MyDivider />
          <TaxDiscountInfo />
          <MyDivider />
          <NewQuotationTscInfo
            selectedTcs={selectedTcs}
            selectedQuoteType={selectedQuoteType}
            setSelectedTcs={setSelectedTcs}
            tcs={tcs}
            editTcs={editTcs}
            setEditTcs={setEditTcs}
          />
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
