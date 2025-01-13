import { Box, Stack, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices | Office X",
  description: "Office Automation System",
};

const SettingsPage = () => {
  return (
    <Stack spacing={3}>
      <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
        <Typography variant="h4">Invoices</Typography>
      </Stack>
      <Stack width="100%" justifyContent="center" alignItems="center">
        <Box
          component="img"
          alt="Dash"
          src="/assets/Invoice.gif"
          borderRadius={2}
          sx={{
            display: "inline-block",
            height: "auto",
            maxWidth: "100%",
            width: "600px",
            opacity: 0.4,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default SettingsPage;
