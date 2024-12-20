"use client";

import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import UserAvatar from "../nav-bar/user-avatar";
import { userNameFormatter } from "@/utils/formatters.util";

type Props = {
  openQuotation: () => void;
};

const QuotationTableUser = ({ openQuotation }: Props) => {
  const userName = userNameFormatter("Nkangi", "Usaama");
  const profilePic = "";

  const theme = useTheme();

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <UserAvatar
        clickHandler={openQuotation}
        userName={userName}
        src={profilePic}
      />
      <Stack>
        <Typography
          fontWeight={600}
          variant="body2"
          alignItems="center"
          sx={{
            color: theme.typography.body2.color,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={openQuotation}
        >
          QUO-107
        </Typography>
        <Typography variant="caption">{userName}</Typography>
      </Stack>
    </Stack>
  );
};

export default QuotationTableUser;
