"use client";

import { OpenInNew, Recycling } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { Download } from "@phosphor-icons/react";
import React from "react";
import { toast } from "react-toastify";
import QuotationStatusActions from "./quotation-status-actions";
import { FullQuotation } from "@/types/quotations.types";
import { useSession } from "next-auth/react";

type Props = {
  quotation: FullQuotation;
};

const QuotationActions = ({ quotation }: Props) => {
  const { data: sessionData } = useSession();
  const toastUnderDev = (item: string) => {
    toast(item + " functionality under development", {
      type: "info",
    });
  };
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Box>
        <Button
          variant="outlined"
          color="inherit"
          endIcon={<Download />}
          onClick={() => toastUnderDev("Download")}
        >
          Download
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          endIcon={<OpenInNew />}
          onClick={() => toastUnderDev("Preview")}
        >
          Preview
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Recycling />}
          onClick={() => toastUnderDev("Recycle")}
        >
          Reuse
        </Button>
      </Box>
      {sessionData?.user.co_user_id === quotation.user.co_user_id && (
        <Box>
          <QuotationStatusActions status="sent" />
        </Box>
      )}
    </Stack>
  );
};

export default QuotationActions;
