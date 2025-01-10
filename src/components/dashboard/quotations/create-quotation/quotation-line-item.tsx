import { useAppSelector } from "@/redux/store";
import { Currency2 } from "@/types/currency.types";
import { QuotationLineItem } from "@/types/quotations.types";
import { checkDigits } from "@/utils/verification-validation.utils";
import { DeleteForever } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  num: number;
  lineItem: QuotationLineItem;
  deleteFn: () => void;
  updateFn: (id: number, field: keyof QuotationLineItem, value: any) => void;
  selectedCurrency: Currency2;
};

const QuotationListItem = ({
  num,
  lineItem,
  deleteFn,
  updateFn,
  selectedCurrency,
}: Props) => {
  const { units } = useAppSelector((state) => state.units);
  const totalPrice =
    lineItem.unitPrice && lineItem.quantity
      ? lineItem.unitPrice * lineItem.quantity
      : null;

  const handleFieldChange = (field: keyof QuotationLineItem, value: any) => {
    try {
      if (field === "quantity" || field === "unitPrice") {
        const str = String(value);
        if (!checkDigits(str)) return;

        const num = parseInt(str, 10);
        updateFn(lineItem.id, field, isNaN(num) ? 0 : num);
        return;
      }

      updateFn(lineItem.id, field, value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack spacing={2}>
      <Grid container spacing={{ xl: 1, lg: 1, md: 2, sm: 2, xs: 2 }}>
        <Grid
          size={{ xl: 0.4, lg: 0.4, md: 0.4, sm: 0.5, xs: 0.5 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar sx={{ height: "30px", width: "30px" }}>
            <Typography variant="body1">{num}</Typography>
          </Avatar>
        </Grid>
        <Grid size={{ xl: 2, lg: 3, md: 5, sm: 5, xs: 11.5 }}>
          <TextField
            label="Product/Service Name"
            value={lineItem.name || ""}
            size="small"
            multiline
            minRows={1}
            fullWidth
            onChange={(evt) => handleFieldChange("name", evt.target.value)}
          />
        </Grid>
        <Grid size={{ xl: 3, lg: 4, md: 6.6, sm: 6.5, xs: 12 }}>
          <TextField
            label="Description"
            value={lineItem.description || ""}
            size="small"
            multiline
            minRows={1}
            fullWidth
            onChange={(evt) =>
              handleFieldChange("description", evt.target.value)
            }
          />
        </Grid>
        <Grid size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 6 }}>
          <TextField
            label="Quantity"
            value={lineItem.quantity || ""}
            size="small"
            fullWidth
            onChange={(evt) => handleFieldChange("quantity", evt.target.value)}
          />
        </Grid>
        <Grid size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 6 }}>
          <TextField
            label="Units"
            value={lineItem.units || ""}
            select
            size="small"
            fullWidth
            onChange={(evt) => handleFieldChange("units", evt.target.value)}
          >
            {units &&
              units.map((item, index) => {
                return (
                  <MenuItem key={item.short_name} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
          </TextField>
        </Grid>
        <Grid size={{ xl: 2, lg: 2, md: 5.4, sm: 5.4, xs: 11 }}>
          <TextField
            label="Unit Price"
            size="small"
            fullWidth
            value={lineItem.unitPrice || ""}
            onChange={(evt) => handleFieldChange("unitPrice", evt.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {selectedCurrency.currency_code}
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={{ xl: 2, lg: 2, md: 5.4, sm: 5.4, xs: 11 }}>
          <TextField
            label="Total Price"
            size="small"
            fullWidth
            value={totalPrice?.toLocaleString() || ""}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {selectedCurrency.currency_code}
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid
          size={{ xl: 0.6, lg: 0.6, md: 0.6, sm: 0.6, xs: 1 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton onClick={deleteFn}>
            <DeleteForever />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </Stack>
  );
};

export default QuotationListItem;
