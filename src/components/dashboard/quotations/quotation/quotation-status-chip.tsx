import { Chip, Tooltip } from "@mui/material";
import React, { ReactElement } from "react";
import {
  CheckCircle,
  RemoveCircle,
  QueryBuilder,
  HighlightOff,
} from "@mui/icons-material";
import { capitalizeFirstLetter } from "@/utils/formatters.util";
import { QuotationStatus } from "@/types/quotations.types";

const statusConfig: {
  [key in QuotationStatus]: {
    icon: ReactElement;
  };
} = {
  sent: {
    icon: <QueryBuilder color="action" />,
  },
  accepted: {
    icon: <CheckCircle color="success" />,
  },
  expired: {
    icon: <RemoveCircle color="error" />,
  },
  rejected: {
    icon: <HighlightOff color="error" />,
  },
};

type Props = {
  status: QuotationStatus;
};

const QuotationStatusChip = ({ status }: Props) => {
  const statusName = capitalizeFirstLetter(status);
  const fullStatus = statusConfig[status];

  return (
    <Tooltip title={"Description"}>
      <Chip
        color="default"
        icon={fullStatus.icon}
        label={statusName}
        variant="outlined"
        size="small"
      />
    </Tooltip>
  );
};

export default QuotationStatusChip;
