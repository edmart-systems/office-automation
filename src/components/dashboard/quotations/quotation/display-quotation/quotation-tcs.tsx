"use client";
import { TcsDto } from "@/types/quotations.types";
import { Stack, Typography } from "@mui/material";
import { Quotation_type } from "@prisma/client";
import {
  generatePaymentStr,
  generateValidityStr,
} from "../../create-quotation/new-quotation-tsc-info";
import BankDetails from "../bank-details";

type Props = {
  selectedTcs: TcsDto;
  quotationType: Quotation_type;
  tcsEdited: boolean;
};

const QuotationTcs = ({ selectedTcs, quotationType, tcsEdited }: Props) => {
  const displayTxt = {
    paymentStr: generatePaymentStr({
      selectedTcs: selectedTcs,
      selectedQuoteType: quotationType,
      editTcs: tcsEdited,
    }),
    validityStr: generateValidityStr({
      selectedTcs: selectedTcs,
      editTcs: tcsEdited,
    }),
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        <Typography variant="body1" fontWeight={600}>
          Terms And Conditions
        </Typography>
        {tcsEdited && <Typography color="error">(Customized)</Typography>}
      </Stack>
      <Stack spacing={1} justifyContent="flex-end" width={{ xl: "100%" }}>
        <Stack direction="row" spacing={2}>
          <Typography flex={1} variant="body1">
            Validity:
          </Typography>
          <Stack flex={6} direction="row" alignItems="center" spacing={5}>
            <Typography variant="body1">{displayTxt.validityStr}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography flex={1} variant="body1">
            Payment:
          </Typography>
          <Stack flex={6}>
            <Typography variant="body1">{displayTxt.paymentStr}</Typography>
            <Typography variant="body1">
              {selectedTcs.payment_method_words}
            </Typography>
            <br />
            <BankDetails bank={selectedTcs.bank} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QuotationTcs;
