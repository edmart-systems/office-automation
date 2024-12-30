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

const QuotationDetails = () => {
  return (
    <Stack spacing={1} justifyContent="flex-start">
      <IntroItem title="Number" content="QUO-107" />
      <IntroItem title="Currency" content="UGX" />
      <IntroItem
        title="Issue Date"
        content={`${fDateTime12("12-12-2024")} (${capitalizeFirstLetter(
          fToNow("12-12-2024")
        )})`}
      />
      <IntroItem
        title="Due Date"
        content={`${fDateTime12("12-30-2024")} (${capitalizeFirstLetter(
          fToNow("12-30-2024")
        )})`}
      />
      <IntroItem title="Validity" content="20 days" />
      <IntroItem title="TIN" content="11002332453" />
    </Stack>
  );
};

export default QuotationDetails;
