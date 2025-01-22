import React, {
  Dispatch,
  forwardRef,
  Fragment,
  Ref,
  SetStateAction,
} from "react";
import {
  IconButton,
  Paper,
  PaperProps,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Draggable from "react-draggable";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { PDFViewer } from "@react-pdf/renderer";
import QuotationPdfDoc from "./quotation-pdf-doc";
import { Close } from "@mui/icons-material";
import { FullQuotation } from "@/types/quotations.types";
import { CompanyDto } from "@/types/company.types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const PaperComponent = (props: PaperProps) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
};

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  quotation: FullQuotation;
  company: CompanyDto;
};

const QuotationViewDialog = ({ open, setOpen, company, quotation }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Dialog
        maxWidth="xl"
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        PaperComponent={PaperComponent}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Quotation {quotation.quotationId}</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ height: "85vh" }}>
          <PDFViewer showToolbar width="100%" height="99%">
            <QuotationPdfDoc quotation={quotation} company={company} />
          </PDFViewer>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default QuotationViewDialog;
