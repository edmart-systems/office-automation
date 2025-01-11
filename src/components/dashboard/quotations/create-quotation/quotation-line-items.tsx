"use client";

import { AddCircleOutline, Clear } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import QuotationListItem from "./quotation-line-item";
import { QuotationLineItem } from "@/types/quotations.types";
import { Currency2 } from "@/types/currency.types";
import LineItemDialog from "./line-item-dialog";
import { getTimeNum } from "@/utils/time";
import ClearListDialog from "./clear-list-dialog";

type Props = {
  lineItems: QuotationLineItem[];
  setLineItems: Dispatch<SetStateAction<QuotationLineItem[]>>;
  selectedCurrency: Currency2;
};

const blankLineItem = (id: number): QuotationLineItem => ({
  id: id,
  description: "",
  name: "",
  quantity: null,
  unitPrice: null,
  units: "",
});

const QuotationListItems = ({
  lineItems,
  setLineItems,
  selectedCurrency,
}: Props) => {
  const [openAddNewItem, setOpenNewItem] = useState<boolean>(false);
  const [openClearListDialog, setOpenClearListDialog] =
    useState<boolean>(false);

  const incrementItems = () => {
    if (lineItems.length >= 3) {
      setOpenNewItem(true);
      return;
    }
    setLineItems((prev) => [...prev, blankLineItem(getTimeNum())]);
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

  const clearList = () => {
    setLineItems([blankLineItem(getTimeNum())]);
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
            onClick={() => setOpenClearListDialog(true)}
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
      {openClearListDialog && (
        <ClearListDialog
          open={openClearListDialog}
          setOpen={setOpenClearListDialog}
          clearListFn={clearList}
        />
      )}
    </Stack>
  );
};

export default QuotationListItems;
