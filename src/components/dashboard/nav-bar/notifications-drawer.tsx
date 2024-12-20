"use client";

import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  ArrowLeft,
  ArrowRight,
  Envelope,
} from "@phosphor-icons/react/dist/ssr";
import { Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setNotificationsDrawer } from "@/redux/slices/app.slice";

const drawerWidth = 540;

const NotificationsDrawer = () => {
  const { notificationsBar } = useAppSelector((state) => state.app);
  const { notifications } = useAppSelector((state) => state.notifications);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    dispatch(setNotificationsDrawer(false));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={notificationsBar}
      >
        <DrawerHeader>
          <Typography variant="h6">Notifications</Typography>
          <Tooltip title="Close">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ArrowLeft /> : <ArrowRight />}
            </IconButton>
          </Tooltip>
        </DrawerHeader>
        <Divider />
        <List>
          {notifications.length > 0 ? (
            [...notifications, ...notifications, ...notifications].map(
              (item, index) => (
                <ListItem key={item.id + index}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Envelope />
                    </ListItemIcon>
                    <ListItemText primary={item.message} />
                  </ListItemButton>
                </ListItem>
              )
            )
          ) : (
            <ListItem>You have no notifications yet</ListItem>
          )}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export default NotificationsDrawer;
