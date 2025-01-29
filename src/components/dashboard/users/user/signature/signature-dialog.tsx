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
import { UserSignatureDto } from "@/types/user.types";
import { ActionResponse } from "@/types/actions-response.types";
import {
  registerUserSignature,
  updateUserSignature,
} from "@/actions/user-actions/user-signature/user-signature.actions";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import LoadingBackdrop from "@/components/common/loading-backdrop";

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
  userId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userSignature: UserSignatureDto | null;
  setUserSignature: Dispatch<SetStateAction<UserSignatureDto | null>>;
  notFound: boolean;
  setNotFound: Dispatch<SetStateAction<boolean>>;
};

const SignatureDialog = ({
  userId,
  open,
  setOpen,
  userSignature,
  setUserSignature,
  notFound,
  setNotFound,
}: Props) => {
  const router = useRouter();
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

  const resetHandler = () => {
    setSignTxt("");
    setMode("type");
    setCreateMode(false);
    setIsFetching(false);
    setTrimmedDataURL(null);
    setOpenConfirm(false);
    setDataUrl("");
  };

  const closeHandler = () => {
    if (isFetching) return;
    resetHandler();
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

  const uploadSignatureHandler = async () => {
    if (isFetching) return;
    if (dataUrl.length < 10) return;

    setIsFetching(true);

    let res: ActionResponse<UserSignatureDto>;

    if (userSignature) {
      res = await updateUserSignature({ dataUrl: dataUrl, userId: userId });
    } else {
      res = await registerUserSignature({ dataUrl: dataUrl, userId: userId });
    }

    if (!res.status || !res.data) {
      setIsFetching(false);
      return toast(res.message, { type: "error" });
    }

    setNotFound(false);
    setUserSignature(res.data);
    setIsFetching(false);

    resetHandler();

    nProgress.start();
    router.refresh();
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
            <IconButton onClick={closeHandler} disabled={isFetching}>
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
              <SignatureView
                src={userSignature ? userSignature.dataUrl : null}
              />
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
                disabled={isFetching}
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
                  disabled={isFetching}
                >
                  Save Signature
                </Button>
              )}
              {createMode && mode === "draw" && trimmedDataURL && (
                <Button
                  variant="contained"
                  endIcon={<Signature />}
                  onClick={saveDrawSignatureHandler}
                  disabled={isFetching}
                >
                  Save Signature
                </Button>
              )}
              {notFound && !createMode && (
                <Button
                  variant="contained"
                  endIcon={<Signature />}
                  onClick={() => setCreateMode(true)}
                  disabled={isFetching}
                >
                  Create Signature
                </Button>
              )}

              {userSignature &&
                Boolean(userSignature.canUpdate) &&
                !createMode && (
                  <Button
                    variant="contained"
                    endIcon={<Signature />}
                    onClick={() => setCreateMode(true)}
                  >
                    Update Signature
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
          submitFn={uploadSignatureHandler}
        />
      )}
      <LoadingBackdrop open={isFetching} />
    </Dialog>
  );
};

export default SignatureDialog;
