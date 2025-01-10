"use client";

import { AddCircleOutline, Clear } from "@mui/icons-material";
import { Button, Grid2 as Grid, Stack, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import QuotationListItem from "./quotation-line-item";
import { QuotationLineItem } from "@/types/quotations.types";
import { Currency2 } from "@/types/currency.types";
import LineItemDialog from "./line-item-dialog";

type Props = {
  lineItems: QuotationLineItem[];
  setLineItems: Dispatch<SetStateAction<QuotationLineItem[]>>;
  selectedCurrency: Currency2;
};

const QuotationListItems = ({
  lineItems,
  setLineItems,
  selectedCurrency,
}: Props) => {
  const [openAddNewItem, setOpenNewItem] = useState<boolean>(false);

  const incrementItems = () => {
    if (lineItems.length >= 3) {
      return;
    }
    setLineItems((prev) => [...prev, { id: prev.length + 1 }]);
  };

  const addFullItem = (item: QuotationLineItem) => {
    setLineItems((prev) => [...prev, item]);
  };

  const removeItem = (id: number) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateLineItem = (
    id: number,
    field: keyof QuotationLineItem,
    value: any
  ) => {
    setLineItems((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, [field]: value } : item;
      })
    );
  };

  const updateFullItem = (updatedItem: QuotationLineItem) => {
    setLineItems((prev) =>
      prev.map((item) => {
        return item.id === updatedItem.id ? updatedItem : item;
      })
    );
  };

  const ClearList = () => {
    setLineItems([{ id: 1 }]);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="body1" fontWeight={600}>
        Line Items {lineItems.length > 0 && `(${lineItems.length})`}
      </Typography>
      {lineItems.map((item, index) => {
        return (
          <QuotationListItem
            key={item.id + "-" + index}
            itemsLength={lineItems.length}
            num={index + 1}
            lineItem={item}
            deleteFn={() => removeItem(item.id)}
            selectedCurrency={selectedCurrency}
            updateFn={updateLineItem}
            updateFullItem={updateFullItem}
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
        {lineItems.length > 1 && (
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
      {openAddNewItem && (
        <LineItemDialog
          mode="new"
          itemNumber={lineItems.length + 1}
          open={openAddNewItem}
          setOpen={setOpenNewItem}
          selectedCurrency={selectedCurrency}
          addFn={addFullItem}
        />
      )}
    </Stack>
  );
};

export default QuotationListItems;
