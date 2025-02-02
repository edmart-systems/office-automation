import { useAppSelector } from "@/redux/store";
import { Currency2 } from "@/types/currency.types";
import { QuotationInputLineItem } from "@/types/quotations.types";
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
import React, { useRef, useState } from "react";
import LineItemDialog from "./line-item-dialog";

type Props = {
  num: number;
  lineItem: QuotationInputLineItem;
  deleteFn: () => void;
  updateFn: (
    id: number,
    field: keyof QuotationInputLineItem,
    value: any
  ) => void;
  selectedCurrency: Currency2;
  itemsLength: number;
  updateFullItem: (updatedItem: QuotationInputLineItem) => void;
};

const QuotationListItem = ({
  num,
  lineItem,
  deleteFn,
  updateFn,
  selectedCurrency,
  itemsLength,
  updateFullItem,
}: Props) => {
  const [openAddNewItem, setOpenNewItem] = useState<boolean>(false);
  const { units } = useAppSelector((state) => state.units);

  const totalPrice =
    lineItem.unitPrice && lineItem.quantity
      ? lineItem.unitPrice * lineItem.quantity
      : null;

  const openItemEditorHandler = () => {
    if (itemsLength < 4) {
      return;
    }
    setOpenNewItem(true);
  };

  const handleFieldChange = (
    field: keyof QuotationInputLineItem,
    value: any
  ) => {
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
          size={{ xl: 0.4, lg: 0.4, md: 0.4, sm: 0.4, xs: 1 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar sx={{ height: "30px", width: "30px" }}>
            <Typography variant="body1" id="item">
              {num}
            </Typography>
          </Avatar>
        </Grid>
        <Grid size={{ xl: 2, lg: 2, md: 5, sm: 5, xs: 11 }}>
          <TextField
            label="Product/Service Name"
            value={lineItem.name || ""}
            size="small"
            multiline
            minRows={1}
            fullWidth
            onChange={(evt) => handleFieldChange("name", evt.target.value)}
            onClick={openItemEditorHandler}
          />
        </Grid>
        <Grid size={{ xl: 3, lg: 3, md: 6.6, sm: 6.6, xs: 12 }}>
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
            onClick={openItemEditorHandler}
          />
        </Grid>
        <Grid size={{ xl: 1, lg: 1, md: 6, sm: 6, xs: 6 }}>
          <TextField
            label="Quantity"
            value={lineItem.quantity || ""}
            size="small"
            fullWidth
            onChange={(evt) => handleFieldChange("quantity", evt.target.value)}
            onClick={openItemEditorHandler}
          />
        </Grid>
        <Grid size={{ xl: 1, lg: 1, md: 6, sm: 6, xs: 6 }}>
          <TextField
            label="Units"
            value={lineItem.units || ""}
            select
            size="small"
            fullWidth
            onChange={(evt) => handleFieldChange("units", evt.target.value)}
            onClick={openItemEditorHandler}
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
        <Grid size={{ xl: 2, lg: 2, md: 6.4, sm: 6.4, xs: 12 }}>
          <TextField
            label="Unit Price"
            size="small"
            fullWidth
            value={lineItem.unitPrice || ""}
            onChange={(evt) => handleFieldChange("unitPrice", evt.target.value)}
            onClick={openItemEditorHandler}
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
        <Grid size={{ xl: 2, lg: 2, md: 5, sm: 5, xs: 11 }}>
          <TextField
            label="Total Price"
            size="small"
            fullWidth
            value={totalPrice?.toLocaleString() || ""}
            onClick={openItemEditorHandler}
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
      {openAddNewItem && (
        <LineItemDialog
          mode="update"
          itemNumber={num}
          open={openAddNewItem}
          setOpen={setOpenNewItem}
          selectedCurrency={selectedCurrency}
          updateFn={updateFullItem}
          originalItem={lineItem}
        />
      )}
    </Stack>
  );
};

export default QuotationListItem;
