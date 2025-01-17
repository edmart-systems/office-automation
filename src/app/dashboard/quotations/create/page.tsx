"use server";

import React, { Suspense } from "react";
import { Stack, Typography } from "@mui/material";
import PageGoBack from "@/components/dashboard/common/page-go-back";
import CreateQuotation from "@/components/dashboard/quotations/create-quotation/create-quotation";
import { CreateQuotationPageData } from "@/types/quotations.types";
import { getCreateNewQuotationsPageData } from "@/actions/quotations-actions/quotations.actions";
import { paths } from "@/utils/paths.utils";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import QuotationDraftsMenu from "@/components/dashboard/quotations/create-quotation/quotation-drafts-menu";
import MyCircularProgress from "@/components/common/my-circular-progress";

export const getData = async (): Promise<CreateQuotationPageData | null> => {
  const res = await getCreateNewQuotationsPageData();
  const { message, status, data } = res;

  if (!status) {
    console.log(message);
    return Promise.resolve(null);
  }

  return Promise.resolve(data);
};

const CreateQuotationPage = async () => {
  const data: CreateQuotationPageData | null = await getData();

  if (!data) {
    toast("Failed to fetch required data", { type: "error" });
    return redirect(paths.dashboard.quotations.main);
  }

  return (
    <Stack spacing={3}>
      <Stack>
        <PageGoBack
          backName="Quotations"
          link={paths.dashboard.quotations.main}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Create Quotation</Typography>
        <Suspense fallback={<MyCircularProgress />}>
          <QuotationDraftsMenu />
        </Suspense>
      </Stack>
      <Stack>
        <Suspense fallback={<MyCircularProgress />}>
          <CreateQuotation baseData={data} />
        </Suspense>
      </Stack>
    </Stack>
  );
};

export default CreateQuotationPage;
