"use client";

import { AddCircleOutline, Clear, Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import QuotationListItem from "./quotation-list-item";

const QuotationLineItems = () => {
  const [items, setItems] = useState<number[]>([1]);

  const incrementItems = () => {
    setItems((prev) => [...prev, prev.length + 1]);
  };

  const decrementItems = () => {
    setItems((prev) => prev.slice(0, prev.length - 1));
  };

  const ClearList = () => {
    setItems([1]);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight={600}>
        Line Items {items.length > 0 && `(${items.length})`}
      </Typography>
      {items.map((item, index) => {
        return (
          <QuotationListItem
            key={index}
            num={index + 1}
            deleteFn={decrementItems}
          />
        );
      })}

      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<AddCircleOutline />}
          onClick={incrementItems}
        >
          Add Item
        </Button>
        {items.length > 1 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<Clear />}
            onClick={ClearList}
          >
            Clear List
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default QuotationLineItems;
