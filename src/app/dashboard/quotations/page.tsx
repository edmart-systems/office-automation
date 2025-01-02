import FilterQuotationsDialog from "@/components/dashboard/quotations/filter-quotations-dialog";
import QuotationsDisplayMode from "@/components/dashboard/quotations/quotations-display-mode";
import QuotationsFilterCard from "@/components/dashboard/quotations/quotations-filter-card";
import QuotationsPageAnalytics from "@/components/dashboard/quotations/quotations-page-analytics";
import QuotationsSortByTime from "@/components/dashboard/quotations/quotations-sort-by-time";
import QuotationsTableContainer from "@/components/dashboard/quotations/quotations-table-container";
import { QuotationsAnalyticSummary } from "@/types/quotations.types";
import { paths } from "@/utils/paths.utils";
import { Add, AddCircle } from "@mui/icons-material";
import {
  Button,
  Card,
  CircularProgress,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Quotations | Office X",
  description: "Office Automation System",
};

const QuotationsPage = () => {
  const quotationsSummary: QuotationsAnalyticSummary = {
    sent: {
      count: 40,
      total: 2000000,
    },
    accepted: {
      count: 8,
      total: 400000,
    },
    rejected: {
      count: 12,
      total: 800000,
    },
    expired: {
      count: 20,
      total: 800000,
    },
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
      <Stack spacing={3} direction="row" justifyContent="flex-end">
        <Stack
          sx={{ display: { xl: "none", lg: "flex", md: "flex", sm: "flex" } }}
        >
          <FilterQuotationsDialog />
        </Stack>
        <Suspense fallback={<CircularProgress color="primary" size="30px" />}>
          <QuotationsSortByTime />
        </Suspense>
        <Suspense fallback={<CircularProgress color="primary" size="30px" />}>
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
          <Suspense fallback={<CircularProgress color="primary" size="30px" />}>
            <QuotationsFilterCard />
          </Suspense>
        </Grid>
        <Grid size={{ xl: 9, lg: 12, md: 12, sm: 12 }}>
          <Suspense fallback={<CircularProgress color="primary" size="30px" />}>
            <QuotationsTableContainer />
          </Suspense>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default QuotationsPage;
