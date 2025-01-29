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
import CostDueDateHighlight from "./cost-due-date-highlight";
import { FullQuotation } from "@/types/quotations.types";
import { CompanyDto } from "@/types/company.types";
import { fDate } from "@/utils/time";

type Props = {
  quotation: FullQuotation;
  company: CompanyDto;
};

export const generateQrKeyTemp = ({ quotation, company }: Props): string => {
  return `${quotation.quotationId}#${(
    company.legal_name ?? company.business_name
  ).replace(/ /g, "-")}#To#${(
    quotation.clientData.name ?? quotation.clientData.contactPerson
  )?.replace(/ /g, "-")}#${fDate(quotation.time)
    .replace(/ /g, "-")
    .replace(/,/g, "")}`.toUpperCase();
};

const DisplayQuotation = ({ quotation, company }: Props) => {
  return (
    <Card sx={{ p: 5 }}>
      <CardContent>
        <Stack spacing={4}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Quotation</Typography>
            <Logo color="dark" height={70} width={220} />
          </Stack>
          <QuotationDetails
            createdAt={quotation.time}
            currency={quotation.currency}
            expiringAt={quotation.expiryTime}
            quotationId={quotation.quotationId}
            quotationType={quotation.type.name}
            quotationCategory={quotation.category.cat}
            tin={company.tin}
            validityDays={quotation.tcs.validity_days}
            _ref={quotation.clientData.ref}
          />
          <Grid container spacing={2}>
            <Grid size={{ sm: 6, xs: 12 }}>
              <FromAddress company={company} />
            </Grid>
            <Grid size={{ sm: 6, xs: 12 }}>
              <ToAddress client={quotation.clientData} />
            </Grid>
          </Grid>
          <Stack>
            <CostDueDateHighlight
              total={quotation.grandTotal}
              currency={quotation.currency}
              dueDate={quotation.expiryTime}
            />
          </Stack>
          <Stack spacing={2}>
            <ListItemsTable
              currency={quotation.currency}
              listItems={quotation.lineItems}
            />
            <AmountSummary
              currency={quotation.currency}
              vatExcluded={quotation.vatExcluded}
              vatPercentage={quotation.tcs.vat_percentage}
              priceSummary={{
                subtotal: quotation.subTotal,
                vat: quotation.vat,
                finalTotal: quotation.grandTotal,
              }}
            />
          </Stack>
          <QuotationTcs
            quotationId={quotation.quotationId}
            tcsEdited={quotation.tcsEdited}
            quotationType={quotation.type}
            selectedTcs={quotation.tcs}
            qrKey={generateQrKeyTemp({ quotation, company })}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DisplayQuotation;
