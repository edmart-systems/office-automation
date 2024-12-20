import { fDate } from "@/utils/time";
import { Typography } from "@mui/material";
import React from "react";

const CostDueDateHighlight = () => {
  return (
    <Typography variant="body1" fontSize="larger" fontWeight={600}>
      UGX 310,000 due {fDate("12-30-2024")}
    </Typography>
  );
};

export default CostDueDateHighlight;
