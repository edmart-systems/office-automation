"use client";
import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CaretDown, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { PopupState as PopupStateHook } from "material-ui-popup-state/hooks";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { ActionResponse } from "@/types/actions-response.types";
import { useRouter } from "next/navigation";
import nProgress from "nprogress";
import {
  QuotationStatusKeys,
  QuotationStatusAction,
  QuotationStatusActionType,
} from "@/types/quotations.types";
import { HighlightOff } from "@mui/icons-material";

const MyMenuItem = styled("div")({
  padding: "6px 16px",
  // width: "200px",
});

const actions: QuotationStatusAction = {
  sent: [
    {
      name: "setAccepted",
      label: "Set to Accepted",
      desc: "Client approved the quotation",
      color: "success",
      icon: <CheckCircle />,
    },
    {
      name: "setRejected",
      label: "Set to Rejected",
      desc: "Client declined the quotation",
      color: "error",
      icon: <HighlightOff />,
    },
  ],
  accepted: [
    {
      name: "setRejected",
      label: "Set to Rejected",
      desc: "Client declined the quotation",
      color: "error",
      icon: <HighlightOff />,
    },
  ],
  rejected: [
    {
      name: "setAccepted",
      label: "Set to Accepted",
      desc: "Client approved the quotation",
      color: "success",
      icon: <CheckCircle />,
    },
  ],
  expired: [],
};

type Props = {
  status: QuotationStatusKeys;
};

const QuotationStatusActions = ({ status }: Props) => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const [isFetching, setIsFetching] = useState(false);
  const [selectedAction, setSelectedAction] =
    useState<QuotationStatusActionType | null>(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  // const isYou = sessionData
  //   ? sessionData.user.co_user_id === user.co_user_id
  //   : false;

  const isYou = true;

  const actionsArr = actions[status];

  const handleOpenDialog = async (action: QuotationStatusActionType) => {
    if (isFetching) {
      return;
    }
    setSelectedAction(action);
    setConfirmationDialogOpen(true);
  };

  const closeDialogHandler = () => {
    setConfirmationDialogOpen(false);
    setSelectedAction(null);
  };

  const updateUserStatusHandler = async (
    popupState: PopupStateHook,
    reason?: string
  ) => {
    if (isFetching || !selectedAction) {
      return;
    }

    setIsFetching(true);

    let res: ActionResponse | null = null;

    switch (selectedAction) {
      case "setAccepted":
        res = { message: "", status: false };
        break;
      case "setRejected":
        res = { message: "", status: false };
        break;
    }

    if (!res) {
      toast("Failed to update quotation status", {
        type: "error",
      });
      closeDialogHandler();
      setIsFetching(false);
      return;
    }

    if (!res.status) {
      toast(res.message, {
        type: "error",
      });
      closeDialogHandler();
      setIsFetching(false);
      return;
    }

    toast(res.message, {
      type: "success",
    });
    setIsFetching(false);
    closeDialogHandler();
    popupState && popupState.close();

    nProgress.start();
    router.refresh();
    return;
  };

  return (
    <PopupState variant="popover" popupId="actions-popup-menu">
      {(popupState) => {
        return (
          <Fragment>
            <Fragment>
              {/* {selectedAction && confirmationDialogOpen && (
                <ConfirmUserStatusDialog
                  action={selectedAction}
                  isOpen={confirmationDialogOpen}
                  closeHandler={closeDialogHandler}
                  submitHandler={updateUserStatusHandler}
                  isFetching={isFetching}
                  user={user}
                  popupState={popupState}
                />
              )} */}
            </Fragment>
            {isYou && status !== "expired" && (
              <Button
                variant="outlined"
                color="primary"
                endIcon={<CaretDown />}
                {...bindTrigger(popupState)}
              >
                Status Actions
              </Button>
            )}
            <Menu {...bindMenu(popupState)}>
              <MyMenuItem>
                {actionsArr.length < 1 ? (
                  <Typography>No Actions</Typography>
                ) : (
                  <Typography>Select an action</Typography>
                )}
              </MyMenuItem>
              {actionsArr.map((item) => {
                return (
                  <MyMenuItem key={item.name}>
                    <Button
                      variant="contained"
                      color={item.color}
                      endIcon={item.icon}
                      onClick={() => handleOpenDialog(item.name)}
                      fullWidth
                    >
                      {item.label}
                    </Button>
                  </MyMenuItem>
                );
              })}
            </Menu>
          </Fragment>
        );
      }}
    </PopupState>
  );
};

export default QuotationStatusActions;
