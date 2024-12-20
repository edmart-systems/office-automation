import React, { forwardRef, Fragment, Ref } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { FullUser, UserStatusActionType } from "@/types/user.types";
import UserBasicInfoCard from "./user-basic-info-card";
import { PopupState as PopupStateHook } from "material-ui-popup-state/hooks";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type Props = {
  isOpen: boolean;
  action: UserStatusActionType;
  closeHandler: () => void;
  submitHandler: (popupState: PopupStateHook) => void;
  isFetching: boolean;
  user: FullUser;
  popupState: PopupStateHook;
};

type ConfigType = {
  [key in UserStatusActionType]: {
    bodyTxt: string;
    buttonTxt: string;
  };
};

const config: ConfigType = {
  activate: {
    bodyTxt: "activate user?",
    buttonTxt: "Activate",
  },
  block: {
    bodyTxt: "block user?",
    buttonTxt: "Block",
  },
  delete: {
    bodyTxt: "delete user?",
    buttonTxt: "Delete",
  },
  setLeft: {
    bodyTxt: "set user as left?",
    buttonTxt: "Set As Left",
  },
};

const ConfirmUserStatusDialog = ({
  action,
  isOpen,
  closeHandler,
  submitHandler,
  isFetching,
  user,
  popupState,
}: Props) => {
  return (
    <Fragment>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeHandler}
        aria-describedby="status-confirm-dialog-slide"
      >
        <DialogTitle>Confirm Updating User Account Status</DialogTitle>
        <DialogContent>
          <DialogContentText id="status-confirm-dialog-slide">
            {"Are you sure you want to " + config[action].bodyTxt}
          </DialogContentText>
          <br />
          <UserBasicInfoCard user={user} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeHandler}
            variant="outlined"
            disabled={isFetching}
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={() => submitHandler(popupState)}
            disabled={isFetching}
            variant="contained"
            color="primary"
          >
            {config[action].buttonTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmUserStatusDialog;
