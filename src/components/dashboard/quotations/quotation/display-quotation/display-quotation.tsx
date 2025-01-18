import { Logo } from "@/components/core/logo";
import {
  Card,
  CardContent,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ListItemsTable from "../list-items-table";
import QuotationDetails from "./quotation-details";
import FromAddress from "./from-address";
import ToAddress from "./to-address";
import AmountSummary from "./amount-summary";
import QuotationTcs from "./quotation-tcs";
import CostDueDateHighlight from "./cost-due-date-hitghlight";
import { FullQuotation } from "@/types/quotations.types";

type Props = {
  quotation: FullQuotation;
};

const DisplayQuotation = ({ quotation }: Props) => {
  return (
    <Card sx={{ p: 5 }}>
      <CardContent>
        <Stack spacing={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Quotation</Typography>
            <Logo color="dark" height={70} width={220} />
          </Stack>
          <QuotationDetails quotation={quotation} />
          <Grid container spacing={2}>
            <Grid size={{ sm: 6, xs: 12 }}>
              <FromAddress />
            </Grid>
            <Grid size={{ sm: 6, xs: 12 }}>
              <ToAddress />
            </Grid>
          </Grid>
          <Stack>
            <CostDueDateHighlight />
          </Stack>
          <Stack spacing={2}>
            <ListItemsTable />
            <AmountSummary />
          </Stack>
          <QuotationTcs />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DisplayQuotation;
