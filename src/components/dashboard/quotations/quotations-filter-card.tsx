"use client";

import { Close } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  compareFilters,
  Quotation_Status,
  QuotationFilterKeys,
  QuotationFilters,
} from "@/types/quotations.types";
import { capitalizeFirstLetter } from "@/utils/formatters.util";
import { useRouter, useSearchParams } from "next/navigation";
import { paths } from "@/utils/paths.utils";
import nProgress from "nprogress";

type Props = {
  closeHandler?: () => void;
};

const statuses: Quotation_Status[] = [
  "all",
  "sent",
  "accepted",
  "rejected",
  "expired",
];

const today = (): string => {
  const date = new Date();
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

const initParamsState: QuotationFilters = {
  id: "",
  status: "all",
  user: "You",
  start: "01-01-2024",
  end: today(),
};

const QuotationsFilterCard = ({ closeHandler }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paramsSet, setParamsSet] = useState<boolean>(false);
  const [prevParams, setPrevParams] =
    useState<QuotationFilters>(initParamsState);

  const [newParams, setNewParams] = useState<QuotationFilters>(initParamsState);

  const onSubmit = () => {
    const currentParams = new URLSearchParams(searchParams as any);
    let somethingChanged = false;

    const entries = Object.entries(newParams);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      const _key = key as QuotationFilterKeys;
      if (!value) continue;
      // if (prevParams[_key] === value) continue;
      if (_key === "user" && value.length < 3) continue;
      if (_key === "id" && value.length < 3) continue;

      currentParams.delete(_key);
      currentParams.append(_key, value);
      somethingChanged = true;
    }

    if (!somethingChanged) return;

    setParamsSet(true);

    nProgress.start();
    router.push(
      paths.dashboard.quotations.main + `?${currentParams.toString()}`
    );
  };

  const applyButtonNotReady: boolean = useMemo(() => {
    paramsSet && setParamsSet(false);
    return compareFilters(initParamsState, newParams);
  }, [newParams, prevParams]);

  const setDate = (dayJsObj: Dayjs | null, target: string) => {
    try {
      if (!dayJsObj) return;

      const mm = dayJsObj.month();
      const dd = dayJsObj.date();
      const yy = dayJsObj.year();

      if (isNaN(mm) || isNaN(dd) || isNaN(yy)) {
        throw new Error("Invalid date selection");
      }

      if (target === "start") {
        setNewParams((prev) => ({ ...prev, start: `${mm + 1}-${dd}-${yy}` }));
      } else if (target === "end") {
        setNewParams((prev) => ({ ...prev, end: `${mm + 1}-${dd}-${yy}` }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onReset = () => {
    const currentParams = new URLSearchParams(searchParams as any);

    const entries = Object.entries(initParamsState);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      currentParams.delete(key);
    }

    router.push(
      paths.dashboard.quotations.main + `?${currentParams.toString()}`
    );
    setPrevParams(initParamsState);
    setNewParams(initParamsState);
    // closeHandler && closeHandler();
  };

  return (
    <Card sx={{ height: "fit-content" }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={600}>
            Filters
          </Typography>
          {closeHandler && (
            <IconButton onClick={closeHandler}>
              <Close />
            </IconButton>
          )}
        </Stack>
      </CardContent>
      <CardContent>
        <Stack spacing={3}>
          <TextField
            label="Quotation Id"
            value={newParams.id}
            onChange={(evt) =>
              setNewParams((prev) => ({ ...prev, id: evt.target.value }))
            }
          />
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              label="Status"
              value={newParams.status}
              onChange={(evt) =>
                setNewParams((prev) => ({
                  ...prev,
                  status: evt.target.value as Quotation_Status,
                }))
              }
            >
              {statuses.map((item, index) => {
                return (
                  <MenuItem value={item} key={item + index}>
                    {capitalizeFirstLetter(item)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="User Name"
            value={newParams.user}
            onChange={(evt) =>
              setNewParams((prev) => ({ ...prev, user: evt.target.value }))
            }
          />
          <DatePicker
            label="Start"
            disableFuture
            value={dayjs(newParams.start)}
            onChange={(date) => setDate(date, "start")}
          />

          <DatePicker
            label="End"
            disableFuture
            value={dayjs(newParams.end)}
            onChange={(date) => setDate(date, "end")}
          />

          <Stack spacing={1}>
            <Button
              variant="contained"
              size="large"
              onClick={onSubmit}
              disabled={applyButtonNotReady || paramsSet}
            >
              Apply
            </Button>

            {paramsSet && (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={onReset}
              >
                Clear
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuotationsFilterCard;
