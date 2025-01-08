import { BankDto } from "@/types/company.types";
import { TcsDto } from "@/types/quotations.types";
import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import { Quotation_type } from "@prisma/client";
import React from "react";

type Props = {
  selectedTcs: TcsDto;
  selectedQuoteType: Quotation_type;
};

const NewQuotationTscInfo = ({ selectedTcs, selectedQuoteType }: Props) => {
  const paymentStr =
    selectedQuoteType.type_id == 1
      ? selectedTcs.payment_words?.replace(
          "{payment_grace_days}",
          String(selectedTcs.payment_grace_days ?? "N/A")
        )
      : selectedTcs.payment_words
          ?.replace(
            "{initial_payment_percentage}",
            String(selectedTcs.initial_payment_percentage ?? "N/A")
          )
          .replace(
            "{last_payment_percentage}",
            String(selectedTcs.last_payment_percentage ?? "N/A")
          );
  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight={600}>
        Terms And Conditions
      </Typography>
      <Stack spacing={1} justifyContent="flex-end" width={{ xl: "100%" }}>
        <Stack direction="row" spacing={2}>
          <Typography flex={1} variant="body1">
            Validity:
          </Typography>
          <Typography flex={6} variant="body1">
            {selectedTcs.validity_words?.replace(
              "{validity_days}",
              String(selectedTcs.validity_days ?? "N/A")
            )}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography flex={1} variant="body1">
            Payment:
          </Typography>
          <Stack flex={6}>
            <Typography variant="body1">{paymentStr}</Typography>
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

const BankDetails = ({ bank }: { bank: BankDto }) => {
  return (
    <Stack>
      <Stack direction="row">
        <Typography variant="body1" fontWeight={600} flex={1}>
          Title:
        </Typography>
        <Typography variant="body1" flex={5}>
          {bank.ac_title}
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="body1" fontWeight={600} flex={1}>
          A/C No:
        </Typography>
        <Typography variant="body1" flex={5}>
          {bank.ac_number}
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="body1" fontWeight={600} flex={1}>
          Bank:
        </Typography>
        <Typography variant="body1" flex={5}>
          {bank.name}
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="body1" fontWeight={600} flex={1}>
          Branch:
        </Typography>
        <Typography variant="body1" flex={5}>
          {bank.branch_name}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default NewQuotationTscInfo;
