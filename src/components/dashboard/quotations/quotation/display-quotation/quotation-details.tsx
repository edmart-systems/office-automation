"use client";
import { Currency2 } from "@/types/currency.types";
import { capitalizeFirstLetter } from "@/utils/formatters.util";
import { fDateTime12, fToNow } from "@/utils/time";
import { Box, Stack, Typography } from "@mui/material";

type IntroItemProps = {
  title: string;
  content: string;
};

const IntroItem = ({ title, content }: IntroItemProps) => {
  return (
    <Stack direction="row" spacing={2} sx={{ cursor: "pointer" }}>
      <Typography flex={1} variant="body1">
        {title}:
      </Typography>
      <Typography flex={2} variant="body1">
        {content}
      </Typography>
      <Box flex={{ xl: 3, lg: 3, md: 3, sm: 2, xs: 0 }}></Box>
    </Stack>
  );
};

type Props = {
  quotationId: string;
  tin: string | null;
  quotationType: string;
  currency: Currency2;
  createdAt: number;
  expiringAt: number;
  validityDays: number;
  _ref: string | null;
};

const QuotationDetails = ({
  quotationId,
  quotationType,
  tin,
  createdAt,
  currency,
  expiringAt,
  validityDays,
  _ref,
}: Props) => {
  return (
    <Stack spacing={1} justifyContent="flex-start">
      <IntroItem title="Number" content={quotationId} />
      <IntroItem title="Type" content={quotationType} />
      <IntroItem
        title="Currency"
        content={`${currency.currency_name}, ${currency.currency_code}`}
      />
      <IntroItem
        title="Issue Date"
        content={`${fDateTime12(createdAt)} (${capitalizeFirstLetter(
          fToNow(createdAt)
        )})`}
      />
      <IntroItem
        title="Due Date"
        content={`${fDateTime12(expiringAt)} (${capitalizeFirstLetter(
          fToNow(expiringAt)
        )})`}
      />
      {_ref && <IntroItem title="External Ref" content={_ref} />}
      <IntroItem title="Validity" content={`${validityDays} days`} />
      <IntroItem title="TIN" content={tin ?? "N/A"} />
    </Stack>
  );
};

export default QuotationDetails;
