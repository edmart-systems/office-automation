import React, {
  Dispatch,
  forwardRef,
  Fragment,
  Ref,
  SetStateAction,
  useState,
} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAppSelector } from "@/redux/store";
import { Currency2 } from "@/types/currency.types";
import { checkDigits } from "@/utils/verification-validation.utils";
import {
  Avatar,
  Divider,
  Grid2 as Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { QuotationLineItem } from "@/types/quotations.types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: "new" | "update";
  addFn?: (item: QuotationLineItem) => void;
  updateFn?: (updatedItem: QuotationLineItem) => void;
  itemNumber: number;
  originalItem?: QuotationLineItem;
  selectedCurrency: Currency2;
};

const LineItemDialog = ({
  open,
  setOpen,
  itemNumber,
  mode,
  addFn,
  originalItem,
  updateFn,
  selectedCurrency,
}: Props) => {
  const { units } = useAppSelector((state) => state.units);
  const [lineItem, setLineItem] = useState<QuotationLineItem>(
    originalItem || { id: 4 }
  );

  const totalPrice =
    lineItem.unitPrice && lineItem.quantity
      ? lineItem.unitPrice * lineItem.quantity
      : null;

  const handleClose = () => {
    setOpen(false);
  };

  const confirmBtnHandler = () => {
    if (mode === "new") {
      addFn && addFn(lineItem);
    } else {
      updateFn && updateFn(lineItem);
    }
    handleClose();
  };

  const updateLineItem = (field: keyof QuotationLineItem, value: any) => {
    setLineItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldChange = (field: keyof QuotationLineItem, value: any) => {
    try {
      if (field === "quantity" || field === "unitPrice") {
        const str = String(value);
        if (!checkDigits(str)) return;

        const num = parseInt(str, 10);
        updateLineItem(field, isNaN(num) ? 0 : num);
        return;
      }

      updateLineItem(field, value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {mode === "new" ? "Add New Line Item" : "Update Line Item"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Grid container spacing={{ xl: 1, lg: 1, md: 2, sm: 2, xs: 2 }}>
              <Grid
                size={{ xl: 0.4, lg: 0.4, md: 0.4, sm: 0.5, xs: 0.5 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Avatar sx={{ height: "30px", width: "30px" }}>
                  <Typography variant="body1">{itemNumber}</Typography>
                </Avatar>
              </Grid>
              <Grid size={{ xl: 2, lg: 3, md: 5, sm: 5, xs: 11.5 }}>
                <TextField
                  label="Product/Service Name"
                  value={originalItem?.name || ""}
                  size="small"
                  multiline
                  minRows={1}
                  fullWidth
                  onChange={(evt) =>
                    handleFieldChange("name", evt.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xl: 3, lg: 4, md: 6.6, sm: 6.5, xs: 12 }}>
                <TextField
                  label="Description"
                  value={originalItem?.description || ""}
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
                  value={originalItem?.quantity || ""}
                  size="small"
                  fullWidth
                  onChange={(evt) =>
                    handleFieldChange("quantity", evt.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xl: 1, lg: 1, md: 3, sm: 3, xs: 6 }}>
                <TextField
                  label="Units"
                  value={originalItem?.units || ""}
                  select
                  size="small"
                  fullWidth
                  onChange={(evt) =>
                    handleFieldChange("units", evt.target.value)
                  }
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
                  value={originalItem?.unitPrice || ""}
                  onChange={(evt) =>
                    handleFieldChange("unitPrice", evt.target.value)
                  }
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
            </Grid>
            <Divider />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            onClick={confirmBtnHandler}
            variant="contained"
            color="primary"
          >
            {mode === "new" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default LineItemDialog;
