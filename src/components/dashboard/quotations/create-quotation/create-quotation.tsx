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
import React, { useEffect, useState, useTransition } from "react";
import BasicInfo from "./basic-info";
import ClientInfo from "./client-info";
import QuotationListItems from "./quotation-line-items";
import TaxDiscountInfo from "./tax-discount-info";
import NewQuotationTscInfo from "./new-quotation-tsc-info";
import NewQuotationPriceSummary from "./new-quotation-price-summary";
import { Save } from "@mui/icons-material";
import {
  CreateQuotationPageData,
  QuotationInputClientData,
  QuotationLineItem,
  QuotationPriceSummary,
  TcsDto,
} from "@/types/quotations.types";
import { Quotation_type } from "@prisma/client";
import { useAppDispatch } from "@/redux/store";
import { setUnits } from "@/redux/slices/units.slice";
import { setCurrencies } from "@/redux/slices/currencies.slice";
import { Currency2 } from "@/types/currency.types";

const MyDivider = styled(Divider)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#b8b8b8" : "#dadada",
}));

type Props = {
  baseData: CreateQuotationPageData;
};

const blankClientData: QuotationInputClientData = {
  name: "",
  ref: "",
  contactPerson: "",
  email: "",
  phone: "",
  boxNumber: 0,
  country: "",
  city: "",
  addressLine1: "",
};

const CreateQuotation = ({ baseData }: Props) => {
  const dispatch = useAppDispatch();
  const date = new Date();
  const quotationId = date.getTime();
  const { company, quotationTypes, tcs, units, currencies } = baseData;
  const [editTcs, setEditTcs] = useState<boolean>(false);
  const [selectedQuoteType, setSelectedQuoteType] = useState<Quotation_type>(
    quotationTypes[0]
  );
  const [selectedTcs, setSelectedTcs] = useState<TcsDto>(tcs[0]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency2>(
    currencies[0]
  );
  const [clientData, setClientData] =
    useState<QuotationInputClientData>(blankClientData);
  const [lineItems, setLineItems] = useState<QuotationLineItem[]>([{ id: 1 }]);
  const [priceSummary, setPriceSummary] = useState<QuotationPriceSummary>({
    subtotal: 0,
    vat: 0,
    finalTotal: 0,
  });
  const [isCalculating, startCalculation] = useTransition();

  const calculatePrices = () => {
    startCalculation(() => {
      let subtotal = 0;
      for (const item of lineItems) {
        if (!item.quantity || !item.unitPrice) continue;
        subtotal += item.quantity * item.unitPrice;
      }
      const vat = (subtotal * selectedTcs.vat_percentage) / 100;
      const finalTotal = subtotal + vat;
      setPriceSummary({ subtotal, vat, finalTotal });
    });
  };

  useEffect(() => {
    calculatePrices();
  }, [lineItems]);

  useEffect(() => {
    dispatch(setUnits(units));
    dispatch(setCurrencies(currencies));
  }, []);

  // useEffect(() => {
  //   const newSelectedTc = tcs.filter(
  //     (item) => item.quotation_type_id === selectedQuoteType.type_id
  //   )[0];
  //   setSelectedTcs(newSelectedTc);
  // }, [selectedQuoteType]);

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
            date={date}
          />
          <MyDivider />
          <ClientInfo setClientData={setClientData} clientData={clientData} />
          <MyDivider />
          <QuotationListItems
            lineItems={lineItems}
            setLineItems={setLineItems}
            selectedCurrency={selectedCurrency}
          />
          <MyDivider />
          <TaxDiscountInfo selectedTcs={selectedTcs} />
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
          <NewQuotationPriceSummary
            priceSummary={priceSummary}
            isCalculating={isCalculating}
            vatPercentage={selectedTcs.vat_percentage}
            selectedCurrency={selectedCurrency}
          />
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
          <Button
            color="primary"
            variant="contained"
            onClick={() => console.log(clientData)}
          >
            Create Quotation
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CreateQuotation;
