import { getQuotationsSums } from "@/actions/quotations-actions/quotations.actions";
import MyCircularProgress from "@/components/common/my-circular-progress";
import FilterQuotationsDialog from "@/components/dashboard/quotations/filter-quotations-dialog";
import QuotationsDisplayMode from "@/components/dashboard/quotations/quotations-display-mode";
import QuotationsFetchingProgress from "@/components/dashboard/quotations/quotations-fetching-progress";
import QuotationsFilterCard from "@/components/dashboard/quotations/quotations-filter-card";
import QuotationsPageAnalytics from "@/components/dashboard/quotations/quotations-page-analytics";
import QuotationsSortByTime from "@/components/dashboard/quotations/quotations-sort-by-time";
import QuotationsTableContainer from "@/components/dashboard/quotations/quotations-table-container";
import { ActionResponse } from "@/types/actions-response.types";
import { QuotationStatusCounts } from "@/types/quotations.types";
import { paths } from "@/utils/paths.utils";
import { AddCircle } from "@mui/icons-material";
import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Quotations | Office X",
  description: "Office Automation System",
};

const getSummaryData = async (): Promise<QuotationStatusCounts | null> => {
  const res: ActionResponse = await getQuotationsSums();

  if (!res.status) {
    console.log(res.message);
    return Promise.resolve(null);
  }

  const summaryData = res.data as QuotationStatusCounts;
  return Promise.resolve(summaryData);
};

const blankCount = {
  count: 0,
  sum: 0,
};

const QuotationsPage = async () => {
  const quotationsSummary = (await getSummaryData()) ?? {
    sent: blankCount,
    accepted: blankCount,
    rejected: blankCount,
    expired: blankCount,
    all: blankCount,
  };

  return (
    <Stack spacing={3}>
      <Stack
        spacing={1}
        sx={{ flex: "1 1 auto" }}
        justifyContent="space-between"
        direction="row"
      >
        <Typography variant="h4">Quotations</Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddCircle />}
          LinkComponent={Link}
          href={paths.dashboard.quotations.create}
        >
          New
        </Button>
      </Stack>
      <QuotationsPageAnalytics quotationsSummary={quotationsSummary} />
      <Stack
        spacing={3}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <QuotationsFetchingProgress />
        <Stack
          sx={{ display: { xl: "none", lg: "flex", md: "flex", sm: "flex" } }}
        >
          <FilterQuotationsDialog />
        </Stack>
        {/* <Suspense fallback={<MyCircularProgress />}>
          <QuotationsSortByTime />
        </Suspense> */}
        <Suspense fallback={<MyCircularProgress />}>
          <QuotationsDisplayMode />
        </Suspense>
      </Stack>
      <Grid container spacing={3}>
        <Grid
          size={{ xl: 3, lg: 12, md: 12, sm: 12 }}
          sx={{
            display: {
              xl: "grid",
              lg: "none",
              md: "none",
              sm: "none",
              xs: "none",
            },
          }}
        >
          <QuotationsFilterCard />
        </Grid>
        <Grid size={{ xl: 9, lg: 12, md: 12, sm: 12 }}>
          <Suspense fallback={<MyCircularProgress />}>
            <QuotationsTableContainer quotationsSummary={quotationsSummary} />
          </Suspense>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default QuotationsPage;
