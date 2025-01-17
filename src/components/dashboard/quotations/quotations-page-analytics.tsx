"use client";

import { Grid2 as Grid, useTheme } from "@mui/material";
import React from "react";
import AnalyticV1, { analyticIconStyle } from "../common/analytic-v1";
import { QuotationStatusCounts } from "@/types/quotations.types";
import {
  Done,
  HighlightOff,
  QueryBuilder,
  RemoveCircle,
} from "@mui/icons-material";
import { fShortenNumber } from "@/utils/number.utils";

type Props = {
  quotationsSummary: QuotationStatusCounts;
};

const QuotationsPageAnalytics = ({ quotationsSummary }: Props) => {
  const { sent, accepted, expired, rejected, all } = quotationsSummary;
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xl: 3, lg: 6, md: 6, sm: 12, xs: 12 }}>
        <AnalyticV1
          title="Sent"
          icon={<QueryBuilder {...analyticIconStyle(theme, true)} />}
          content={`UGX ${fShortenNumber(sent.sum)}`}
          secondaryContent={`From ${sent.count} Quotations`}
        />
      </Grid>
      <Grid size={{ xl: 3, lg: 6, md: 6, sm: 12, xs: 12 }}>
        <AnalyticV1
          title="Accepted"
          icon={<Done {...analyticIconStyle(theme, true)} />}
          content={`UGX ${fShortenNumber(accepted.sum)}`}
          secondaryContent={`From ${accepted.count} Quotations`}
        />
      </Grid>
      <Grid size={{ xl: 3, lg: 6, md: 6, sm: 12, xs: 12 }}>
        <AnalyticV1
          title="Rejected"
          icon={<HighlightOff {...analyticIconStyle(theme, true)} />}
          content={`UGX ${fShortenNumber(rejected.sum)}`}
          secondaryContent={`From ${rejected.count} Quotations`}
        />
      </Grid>
      <Grid size={{ xl: 3, lg: 6, md: 6, sm: 12, xs: 12 }}>
        <AnalyticV1
          title="Expired"
          icon={<RemoveCircle {...analyticIconStyle(theme, false)} />}
          content={`UGX ${fShortenNumber(expired.sum)}`}
          secondaryContent={`From ${expired.count} Quotations`}
        />
      </Grid>
    </Grid>
  );
};

export default QuotationsPageAnalytics;
