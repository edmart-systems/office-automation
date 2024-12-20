import React from "react";
import { Stack, Typography } from "@mui/material";
import PageGoBack from "@/components/dashboard/common/page-go-back";
import CreateQuotation from "@/components/dashboard/quotations/create-quotation/create-quotation";

const CreateQuotationPage = () => {
  return (
    <Stack spacing={3}>
      <Stack>
        <PageGoBack backName="Quotations" />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Create Quotation</Typography>
      </Stack>
      <Stack>
        <CreateQuotation />
      </Stack>
    </Stack>
  );
};

export default CreateQuotationPage;
