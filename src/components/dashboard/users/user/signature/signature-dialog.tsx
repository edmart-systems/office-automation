"use client";
import React, {
  Dispatch,
  forwardRef,
  Ref,
  SetStateAction,
  useState,
} from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Draggable from "react-draggable";
import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
  PaperProps,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import SignatureView from "./signature-view";
import { Signature } from "@phosphor-icons/react/dist/ssr";
import CreateSignature from "./create-signature";
import { SignatureMode } from "@/types/signature.types";
import { toast } from "react-toastify";
import { htmlToDatUrl } from "@/utils/html-base64-converter";
import ConfirmSignatureDialog from "./confirm-signature-dialog";

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
  src: string | null;
};

const SignatureDialog = ({ open, setOpen, src }: Props) => {
  const [createMode, setCreateMode] = useState<boolean>(false);
  const [signTxt, setSignTxt] = useState<string>("");
  const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);
  const [mode, setMode] = useState<SignatureMode>("type");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [dataUrl, setDataUrl] = useState<string>("");

  const backHandler = () => {
    if (mode === "type") {
      setSignTxt("");
      setCreateMode(false);
    } else {
      setSignTxt("");
      setMode("type");
    }
  };

  const closeHandler = () => {
    setSignTxt("");
    setMode("type");
    setCreateMode(false);
    setIsFetching(false);
    setTrimmedDataURL(null);
    setOpenConfirm(false);
    setDataUrl("");
    setOpen(false);
  };

  const saveTypeSignatureHandler = async () => {
    if (isFetching) return;
    if (signTxt.length < 2) {
      toast("Invalid signature", { type: "error" });
      return;
    }

    let dataUrl = "";

    try {
      dataUrl = await htmlToDatUrl("sign-export-txt");
    } catch (err) {
      console.log(err);
      toast("Something went wrong", { type: "error" });
      return;
    }

    setDataUrl(dataUrl);
    setOpenConfirm(true);
  };

  const saveDrawSignatureHandler = () => {
    if (isFetching) return;
    if (!trimmedDataURL) {
      toast("Invalid signature", { type: "error" });
      return;
    }

    setDataUrl(trimmedDataURL);
    setOpenConfirm(true);
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={open}
      TransitionComponent={Transition}
      PaperComponent={PaperComponent}
      keepMounted
      // onClose={closeHandler}
      aria-describedby="filter-quotations-dialog-slide"
      aria-labelledby="draggable-dialog-title"
    >
      <Card sx={{ height: "600px" }}>
        <CardContent sx={{ height: "72px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ cursor: "move" }}
            id={"draggable-dialog-title"}
          >
            <Typography variant="h6" fontWeight={600}>
              Your Signature
            </Typography>
            <IconButton onClick={closeHandler}>
              <Close />
            </IconButton>
          </Stack>
        </CardContent>
        <Divider />
        <CardContent sx={{ height: "456px" }}>
          {createMode ? (
            <CreateSignature
              setSignTxt={setSignTxt}
              signTxt={signTxt}
              setMode={setMode}
              mode={mode}
              trimmedDataURL={trimmedDataURL}
              setTrimmedDataURL={setTrimmedDataURL}
            />
          ) : (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <SignatureView src={src} />
            </Stack>
          )}
        </CardContent>
        <Divider />
        <CardContent sx={{ height: "72px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {createMode ? (
              <Button
                variant="contained"
                color="inherit"
                sx={{ width: "100px" }}
                onClick={backHandler}
              >
                Back
              </Button>
            ) : (
              <>&ensp;</>
            )}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              {createMode && mode === "type" && signTxt.length > 1 && (
                <Button
                  variant="contained"
                  endIcon={<Signature />}
                  onClick={saveTypeSignatureHandler}
                >
                  Save Signature
                </Button>
              )}
              {createMode && mode === "draw" && trimmedDataURL && (
                <Button
                  variant="contained"
                  endIcon={<Signature />}
                  onClick={saveDrawSignatureHandler}
                >
                  Save Signature
                </Button>
              )}
              {!src && !createMode && (
                <Button
                  variant="contained"
                  endIcon={<Signature />}
                  onClick={() => setCreateMode(true)}
                >
                  Create Signature
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      {openConfirm && dataUrl && (
        <ConfirmSignatureDialog
          open={openConfirm}
          setOpen={setOpenConfirm}
          dataUrl={dataUrl}
        />
      )}
    </Dialog>
  );
};

export default SignatureDialog;
