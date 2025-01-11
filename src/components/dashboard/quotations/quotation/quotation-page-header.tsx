"use client";

import { Stack, Typography } from "@mui/material";
import React from "react";
import { userNameFormatter } from "@/utils/formatters.util";
import { useSession } from "next-auth/react";
import QuotationStatusChip from "./quotation-status-chip";

type Props = {};

const QuotationPageHead = ({}: Props) => {
  const { data: sessionData } = useSession();

  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
      sx={{ cursor: "pointer" }}
    >
      <Stack gap={0}>
        <Typography
          fontWeight={600}
          variant="h4"
          // fontSize="24px"
          alignItems="center"
        >
          {`Q250111002`}&ensp;
          <QuotationStatusChip status="accepted" />
        </Typography>
        <Typography variant="body1" color="textSecondary">
          &ensp;By {userNameFormatter("Nkangi", "Usaama")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default QuotationPageHead;
