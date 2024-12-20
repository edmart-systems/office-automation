import { setNotificationsDrawer } from "@/redux/slices/app.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const NotificationsButton = () => {
  const { unread } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  return (
    <Tooltip title="Notifications">
      <IconButton
        size="medium"
        onClick={() => dispatch(setNotificationsDrawer(true))}
      >
        <Badge badgeContent={unread} color="primary" variant="standard">
          <Bell />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default NotificationsButton;
