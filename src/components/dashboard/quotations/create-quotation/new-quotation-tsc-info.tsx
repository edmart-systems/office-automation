import { Grid2 as Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const NewQuotationTscInfo = () => {
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
            20 Days
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography flex={1} variant="body1">
            Payment:
          </Typography>
          <Stack flex={6}>
            <Typography variant="body1">
              30 days after delivery of the items and presentation of a tax
              invoice
            </Typography>
            <Typography variant="body1">
              The payment shall be by Cheque, EFT or RTGS to our account with
              the following details
            </Typography>
            <br />
            <BankDetails />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const BankDetails = () => {
  return (
    <Stack>
      <Stack direction="row">
        <Typography variant="body1" fontWeight={600} flex={1}>
          Title:
        </Typography>
        <Typography variant="body1" flex={5}>
          Edmart Systems Uganda Limited
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="body1" fontWeight={600} flex={1}>
          A/C No:
        </Typography>
        <Typography variant="body1" flex={5}>
          3443634564562356
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="body1" fontWeight={600} flex={1}>
          Bank:
        </Typography>
        <Typography variant="body1" flex={5}>
          Stanbic Bank
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="body1" fontWeight={600} flex={1}>
          Branch:
        </Typography>
        <Typography variant="body1" flex={5}>
          Garden City
        </Typography>
      </Stack>
    </Stack>
  );
};
export default NewQuotationTscInfo;
