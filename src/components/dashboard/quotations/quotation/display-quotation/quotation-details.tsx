import { FullQuotation } from "@/types/quotations.types";
import { capitalizeFirstLetter } from "@/utils/formatters.util";
import { fDateTime12, fToNow } from "@/utils/time";
import { Box, Stack, Typography } from "@mui/material";

type IntroItemProps = {
  title: string;
  content: string;
};

const IntroItem = ({ title, content }: IntroItemProps) => {
  return (
    <Stack direction="row" spacing={2}>
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
  quotation: FullQuotation;
};

const QuotationDetails = ({ quotation }: Props) => {
  return (
    <Stack spacing={1} justifyContent="flex-start">
      <IntroItem title="Number" content={quotation.quotationId} />
      <IntroItem title="Type" content={quotation.type.name} />
      <IntroItem title="Currency" content={quotation.currency.currency_code} />
      <IntroItem
        title="Issue Date"
        content={`${fDateTime12(quotation.time)} (${capitalizeFirstLetter(
          fToNow(quotation.time)
        )})`}
      />
      <IntroItem
        title="Due Date"
        content={`${fDateTime12(quotation.expiryTime)} (${capitalizeFirstLetter(
          fToNow(quotation.expiryTime)
        )})`}
      />
      <IntroItem
        title="Validity"
        content={`${quotation.tcs.validity_days} days`}
      />
      <IntroItem title="TIN" content={"11002332453"} />
    </Stack>
  );
};

export default QuotationDetails;
