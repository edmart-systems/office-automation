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
  QuotationDraft,
  QuotationDraftSummary,
  QuotationError,
  QuotationInputClientData,
  QuotationLineItem,
  QuotationPriceSummary,
  TcsDto,
} from "@/types/quotations.types";
import { Quotation_type } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setUnits } from "@/redux/slices/units.slice";
import { setCurrencies } from "@/redux/slices/currencies.slice";
import { Currency2 } from "@/types/currency.types";
import { getTimeNum } from "@/utils/time";
import {
  verifyClientInfo,
  verifyClientInfoOnDraft,
  verifyLineItems,
  verifyTcs,
} from "./create-quotation-methods";
import QuotationErrors from "./quotation-errors";
import { toast } from "react-toastify";
import { saveQuotationDraft } from "@/redux/slices/quotation.slice";
import { useSearchParams } from "next/navigation";
import ClearListDialog from "./clear-list-dialog";

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

const blankLineItem = (id: number): QuotationLineItem => ({
  id: id,
  description: "",
  name: "",
  quantity: null,
  unitPrice: null,
  units: "",
});

const CreateQuotation = ({ baseData }: Props) => {
  const { quotations: draftQuotations } = useAppSelector(
    (state) => state.quotations
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const selectedDraftParams = searchParams.get("draft");
  const quotationDate = new Date();
  const { company, quotationTypes, tcs, units, currencies } = baseData;

  const [quotationId, setQuotationId] = useState<number>(
    getTimeNum(quotationDate)
  );
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
  const [lineItems, setLineItems] = useState<QuotationLineItem[]>([
    blankLineItem(quotationId),
  ]);
  const [priceSummary, setPriceSummary] = useState<QuotationPriceSummary>({
    subtotal: 0,
    vat: 0,
    finalTotal: 0,
  });
  const [isCalculating, startCalculation] = useTransition();
  const [excludeVat, setExcludeVat] = useState<boolean>(false);
  const [quotationErrors, setQuotationErrors] = useState<QuotationError[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [openResetFields, setOpenResetField] = useState<boolean>(false);

  const calculatePrices = () => {
    startCalculation(() => {
      let subtotal = 0;
      for (const item of lineItems) {
        if (!item.quantity || !item.unitPrice) continue;
        subtotal += item.quantity * item.unitPrice;
      }

      const vat = excludeVat
        ? 0
        : (subtotal * selectedTcs.vat_percentage) / 100;
      const finalTotal = subtotal + vat;
      setPriceSummary({ subtotal, vat, finalTotal });
    });
  };

  const resetQuotation = () => {
    if (isFetching) return;
    setQuotationErrors([]);
    setSelectedQuoteType(quotationTypes[0]);
    setEditTcs(false);
    setSelectedTcs(tcs[0]);
    setSelectedCurrency(currencies[0]);
    setClientData(blankClientData);
    setExcludeVat(false);
    setLineItems([blankLineItem(quotationId)]);
  };

  const setSelectedDraftHandler = () => {
    try {
      if (!selectedDraftParams) return;
      if (!draftQuotations || draftQuotations.length < 1) return;

      const draftQuotationId = parseInt(selectedDraftParams, 10);

      const selectedDraft = draftQuotations.find(
        (item) => item.quotationId === draftQuotationId
      );

      if (!selectedDraft) return;

      setQuotationErrors([]);
      setSelectedQuoteType(selectedDraft.type);
      setQuotationId(selectedDraft.quotationId);
      setEditTcs(selectedDraft.tcsEdited);
      setSelectedTcs(selectedDraft.tcs);
      setSelectedCurrency(selectedDraft.currency);
      setClientData(selectedDraft.clientData);
      setExcludeVat(selectedDraft.vatExcluded);
      setLineItems(selectedDraft.lineItems);

      toast("Quotation Draft Opened Successfully", {
        type: "success",
      });
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    setSelectedDraftHandler();
  }, [selectedDraftParams]);

  useEffect(() => {
    calculatePrices();
  }, [lineItems, excludeVat]);

  useEffect(() => {
    dispatch(setUnits(units));
    dispatch(setCurrencies(currencies));
  }, []);

  const resetErrors = () => {
    setQuotationErrors([]);
  };

  const submitQuotation = () => {
    if (isFetching) return;

    resetErrors();

    const errArr: QuotationError[] = [];

    const tcsCheckRes = verifyTcs({
      selectedTcs: selectedTcs,
      quotationType: selectedQuoteType,
      editTcs: editTcs,
    });

    const clientInfoCheckRes = verifyClientInfo(clientData);

    const lineItemsCheckRes = verifyLineItems(lineItems);

    typeof tcsCheckRes !== "boolean" && errArr.push(...tcsCheckRes);
    typeof clientInfoCheckRes !== "boolean" &&
      errArr.push(...clientInfoCheckRes);
    typeof lineItemsCheckRes !== "boolean" && errArr.push(...lineItemsCheckRes);

    if (errArr.length > 0) {
      toast("Your quotation has issues. Please resolve them to submit", {
        type: "error",
      });
      setQuotationErrors(errArr);
      return;
    }

    const newQuotation = {
      quotationId: quotationId,
      time: getTimeNum(quotationDate),
      type: selectedQuoteType,
      tcsEdited: editTcs,
      vatExcluded: excludeVat,
      tcs: selectedTcs,
      clientData: clientData,
      lineItems: lineItems,
    };

    // setIsFetching(true);
  };

  const saveQuotationDraftHandler = () => {
    if (draftQuotations.length >= 5) {
      toast(
        "Your draft box is full. You can only keep a max of 5 quotation drafts.",
        {
          type: "warning",
        }
      );

      return;
    }
    setQuotationErrors([]);
    const errArr: QuotationError[] = [];

    const clientInfoCheckRes = verifyClientInfoOnDraft(clientData);

    typeof clientInfoCheckRes !== "boolean" &&
      errArr.push(...clientInfoCheckRes);

    if (errArr.length > 0) {
      toast(
        "Your quotation has issues. Please resolve them to save as a draft",
        {
          type: "error",
        }
      );
      setQuotationErrors(errArr);
      return;
    }

    const quotationDraft: QuotationDraft = {
      quotationId: quotationId,
      time: getTimeNum(quotationDate),
      type: selectedQuoteType,
      tcsEdited: editTcs,
      vatExcluded: excludeVat,
      tcs: selectedTcs,
      currency: selectedCurrency,
      clientData: clientData,
      lineItems: lineItems,
    };

    dispatch(saveQuotationDraft(quotationDraft));

    toast("Quotation Draft Saved Successfully", {
      type: "success",
    });
  };

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
            date={quotationDate}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
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
          <TaxDiscountInfo selectedTcs={selectedTcs} excludeVat={excludeVat} />
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
            excludeVat={excludeVat}
            setExcludeVat={setExcludeVat}
          />
          {quotationErrors.length > 0 && (
            <>
              <MyDivider />
              <QuotationErrors
                quotationErrors={quotationErrors}
                closeFn={resetErrors}
              />
            </>
          )}
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
            <IconButton
              color="secondary"
              size="large"
              onClick={saveQuotationDraftHandler}
            >
              <Save />
            </IconButton>
          </Tooltip>
          {/* <Button color="secondary" variant="outlined" startIcon={<Save />}>
            Save As Draft
          </Button> */}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            color="error"
            variant="outlined"
            disabled={isFetching}
            onClick={() => setOpenResetField(true)}
          >
            Reset Quotation
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={isFetching}
            onClick={submitQuotation}
          >
            Create Quotation
          </Button>
        </Stack>
      </CardActions>
      {openResetFields && (
        <ClearListDialog
          open={openResetFields}
          setOpen={setOpenResetField}
          clearListFn={resetQuotation}
          isResetFields
        />
      )}
    </Card>
  );
};

export default CreateQuotation;
