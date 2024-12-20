import { CallOutlined, MailOutline } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";

const ToAddress = () => {
  return (
    <Stack flex={1} spacing={1}>
      <Typography variant="body1" fontWeight={600}>
        To
      </Typography>
      <Typography variant="body1">Uzima Chicken</Typography>
      <Typography variant="body1">P. O. Box 11233, Kampala, Uganda</Typography>
      <Typography variant="body1">Plot 128, Ntinda</Typography>
      <Typography
        variant="body1"
        component={Link}
        href="mailto:procurement@uzimachicken.com"
        target="_blank"
        color="primary"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ textDecoration: "none", width: "fit-content" }}
      >
        <MailOutline sx={{ height: 18, width: 18 }} />
        &ensp;procurement@uzimachicken.com
      </Typography>
      <Typography
        variant="body1"
        component={Link}
        href="tel:+256393255022"
        target="_blank"
        color="primary"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ textDecoration: "none", width: "fit-content" }}
      >
        <CallOutlined sx={{ height: 18, width: 18 }} />
        &ensp;+256 393 255022
      </Typography>
    </Stack>
  );
};

export default ToAddress;
