import { QuotationInputClientData } from "@/types/quotations.types";
import { formatDisplayedPhoneNumber } from "@/utils/formatters.util";
import { CallOutlined, MailOutline } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
  client: QuotationInputClientData;
};

const ToAddress = ({ client }: Props) => {
  const locationStr = client.boxNumber
    ? `P. O. Box ${client.boxNumber}`
    : "" + client.city
    ? ", " + client.city
    : "" + client.country
    ? ", " + client.country
    : "";

  return (
    <Stack flex={1} spacing={1}>
      <Typography variant="body1" fontWeight={600}>
        To
      </Typography>
      {client.name && <Typography variant="body1">{client.name}</Typography>}
      {locationStr.length > 3 && (
        <Typography variant="body1">{locationStr}.</Typography>
      )}
      {client.addressLine1 && (
        <Typography variant="body1">{client.addressLine1}</Typography>
      )}
      {client.contactPerson && (
        <Typography variant="body1">
          <strong>Contact Person:</strong>&ensp;{client.contactPerson}
        </Typography>
      )}
      {client.ref && (
        <Typography variant="body1">
          <strong>Ref:</strong>&ensp;{client.ref}
        </Typography>
      )}
      {client.email && (
        <Typography
          variant="body1"
          component={Link}
          href={`mailto:${client.email}`}
          target="_blank"
          color="primary"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          sx={{ textDecoration: "none", width: "fit-content" }}
        >
          <MailOutline sx={{ height: 18, width: 18 }} />
          &ensp;{client.email}
        </Typography>
      )}
      {client.phone && (
        <Typography
          variant="body1"
          component={Link}
          href={`tel:${client.phone}`}
          target="_blank"
          color="primary"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          sx={{ textDecoration: "none", width: "fit-content" }}
        >
          <CallOutlined sx={{ height: 18, width: 18 }} />
          &ensp;{formatDisplayedPhoneNumber(client.phone)}
        </Typography>
      )}
    </Stack>
  );
};

export default ToAddress;
