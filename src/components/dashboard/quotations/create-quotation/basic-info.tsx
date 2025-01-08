import { TcsDto } from "@/types/quotations.types";
import { fDate } from "@/utils/time";
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
import React, { ChangeEvent } from "react";

type Props = {
  tin: string;
  selectedTcs: TcsDto;
  selectedQuoteType: Quotation_type;
  setSelectedQuoteType: React.Dispatch<React.SetStateAction<Quotation_type>>;
  setSelectedTcs: React.Dispatch<React.SetStateAction<TcsDto>>;
  quotationTypes: Quotation_type[];
  tcs: TcsDto[];
};

const BasicInfo = ({
  tin,
  selectedTcs,
  selectedQuoteType,
  setSelectedQuoteType,
  setSelectedTcs,
  quotationTypes,
  tcs,
}: Props) => {
  const handleQuoteTypeChange = (evt: SelectChangeEvent) => {
    const selectedType = quotationTypes.filter(
      (item) => item.name == evt.target.value
    )[0];
    const newSelectedTc = tcs.filter(
      (item) => item.quotation_type_id === selectedQuoteType.type_id
    )[0];
    setSelectedQuoteType(selectedType);
    setSelectedTcs(newSelectedTc);
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
            value={fDate(new Date())}
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
        {/* <Grid size={{ lg: 6, md: 6, sm: 12 }}>
          <TextField
            label="Quotation Type"
            defaultValue={quotationTypes[0].name}
            value={selectedQuoteType.name}
            size="small"
            select
            fullWidth
            onChange={handleQuoteTypeChange}
          >
            {quotationTypes.map((item, index) => {
              return (
                <MenuItem key={item.type_id + "-" + index} value={item.name}>
                  {item.name}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid> */}

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
            value={selectedTcs.validity_days}
            size="small"
            fullWidth
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
              value={selectedTcs.payment_grace_days}
              size="small"
              fullWidth
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
                value={selectedTcs.initial_payment_percentage}
                size="small"
                fullWidth
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
                value={selectedTcs.last_payment_percentage}
                size="small"
                fullWidth
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
