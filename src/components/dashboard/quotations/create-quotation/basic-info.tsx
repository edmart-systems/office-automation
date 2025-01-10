import { useAppSelector } from "@/redux/store";
import { Currency2 } from "@/types/currency.types";
import { TcsDto } from "@/types/quotations.types";
import { fDate } from "@/utils/time";
import { checkDigits } from "@/utils/verification-validation.utils";
import { CalendarMonth } from "@mui/icons-material";
import {
  FormControl,
  Grid2 as Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Quotation_type } from "@prisma/client";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  tin: string;
  selectedTcs: TcsDto;
  selectedQuoteType: Quotation_type;
  setSelectedQuoteType: Dispatch<SetStateAction<Quotation_type>>;
  setSelectedTcs: Dispatch<SetStateAction<TcsDto>>;
  quotationTypes: Quotation_type[];
  tcs: TcsDto[];
  editTcs: boolean;
  setEditTcs: Dispatch<SetStateAction<boolean>>;
  date: Date;
  selectedCurrency: Currency2;
  setSelectedCurrency: Dispatch<SetStateAction<Currency2>>;
};

const BasicInfo = ({
  tin,
  selectedTcs,
  selectedQuoteType,
  setSelectedQuoteType,
  setSelectedTcs,
  quotationTypes,
  tcs,
  editTcs,
  setEditTcs,
  date,
  selectedCurrency,
  setSelectedCurrency,
}: Props) => {
  const { currencies } = useAppSelector((state) => state.currencies);

  const handleQuoteTypeChange = (evt: SelectChangeEvent) => {
    const selectedType = quotationTypes.filter(
      (item) => item.name == evt.target.value
    )[0];
    const newSelectedTc = tcs.filter(
      (item) => item.quotation_type_id === selectedType.type_id
    )[0];
    setSelectedQuoteType(selectedType);
    setSelectedTcs(newSelectedTc);
    setEditTcs(false);
  };

  const handleCurrencyChange = (evt: SelectChangeEvent) => {
    if (!currencies) return;

    const _selectedCurrency = currencies.filter(
      (item) => item.currency_code === evt.target.value
    )[0];

    setSelectedCurrency(_selectedCurrency);
  };

  const validityChangeHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      if (!editTcs) return;
      const str = evt.target.value;

      if (!checkDigits(str)) return;

      const num = parseInt(str, 10);

      setSelectedTcs((prev) => ({
        ...prev,
        edited_validity_days: isNaN(num) ? 0 : num,
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const graceDaysChangeHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      if (!editTcs) return;
      const str = evt.target.value;

      if (!checkDigits(str)) return;

      const num = parseInt(str, 10);

      setSelectedTcs((prev) => ({
        ...prev,
        edited_payment_grace_days: isNaN(num) ? 0 : num,
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const initialPaymentPercentageChangeHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      if (!editTcs) return;
      const str = evt.target.value;

      if (!checkDigits(str)) return;

      const num = parseInt(str, 10);

      setSelectedTcs((prev) => ({
        ...prev,
        edited_initial_payment_percentage: isNaN(num) ? 0 : num,
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const lastPaymentPercentageChangeHandler = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    try {
      if (!editTcs) return;
      const str = evt.target.value;

      if (!checkDigits(str)) return;

      const num = parseInt(str, 10);

      setSelectedTcs((prev) => ({
        ...prev,
        edited_last_payment_percentage: isNaN(num) ? 0 : num,
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight={600}>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Quotation Number"
            value="Auto Generated"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Issue Date"
            value={fDate(date)}
            size="small"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarMonth />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField label="TIN" value={tin} size="small" fullWidth />
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              id="currency-select"
              value={selectedCurrency.currency_code}
              label="Currency"
              onChange={handleCurrencyChange}
              size="small"
            >
              {currencies &&
                currencies.map((item, index) => {
                  return (
                    <MenuItem
                      key={item.currency_code}
                      value={item.currency_code}
                    >
                      {item.currency_name} ({item.currency_code})
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Quotation Type
            </InputLabel>
            <Select
              labelId="quote-type-select-label"
              id="quote-type-select"
              value={selectedQuoteType.name}
              label="Quotation Type"
              onChange={handleQuoteTypeChange}
              size="small"
            >
              {quotationTypes.map((item, index) => {
                return (
                  <MenuItem key={item.type_id + "-" + index} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Validity"
            value={selectedTcs.edited_validity_days}
            size="small"
            fullWidth
            onChange={validityChangeHandler}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">Days</InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        {selectedQuoteType.type_id === 1 ? (
          <Grid size={{ lg: 6, md: 6, sm: 12 }}>
            <TextField
              label="Payment Grace Period"
              value={selectedTcs.edited_payment_grace_days}
              size="small"
              fullWidth
              onChange={graceDaysChangeHandler}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">Days</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        ) : (
          <Grid size={{ lg: 6, md: 6, sm: 12 }} container spacing={1}>
            <Grid size={6}>
              <TextField
                label="Payment % On Commissioning"
                value={selectedTcs.edited_initial_payment_percentage}
                size="small"
                fullWidth
                onChange={initialPaymentPercentageChangeHandler}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label="Payment % On Completion"
                value={selectedTcs.edited_last_payment_percentage}
                size="small"
                fullWidth
                onChange={lastPaymentPercentageChangeHandler}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

export default BasicInfo;
