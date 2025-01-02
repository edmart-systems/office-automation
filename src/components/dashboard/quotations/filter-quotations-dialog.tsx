"use client";
import React, { forwardRef, Fragment, Ref, Suspense, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Funnel } from "@phosphor-icons/react/dist/ssr";
import QuotationsFilterCard from "./quotations-filter-card";
import { CircularProgress } from "@mui/material";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FilterQuotationsDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      <Button
        variant="text"
        color="inherit"
        size="large"
        startIcon={<Funnel />}
        onClick={openHandler}
      >
        Filter
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeHandler}
        aria-describedby="filter-quotations-dialog-slide"
        sx={{ display: { xl: "none", lg: "block", md: "block", sm: "block" } }}
      >
        <Suspense fallback={<CircularProgress color="primary" size="30px" />}>
          <QuotationsFilterCard closeHandler={closeHandler} />
        </Suspense>
      </Dialog>
    </Fragment>
  );
};

export default FilterQuotationsDialog;
