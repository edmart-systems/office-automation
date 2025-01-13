import { AppNotification } from "@/types/app.types";
import { dummyNotifications } from "@/utils/dummies";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationsState {
  notifications: AppNotification[];
  count: number;
  unread: number;
}

const initialState: NotificationsState = {
  notifications: dummyNotifications,
  count: 5,
  unread: 3,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      const _new = action.payload;
      state.notifications.push(_new);
      state.count += 1;
      state.unread += 1;
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const removeId = action.payload;
      const omitted = state.notifications.find((item) => item.id === removeId);

      if (!omitted) {
        return;
      }

      state.notifications = state.notifications.filter(
        (item) => item.id !== removeId
      );
      state.count -= 1;
      !omitted.isRead ? (state.unread -= 1) : "";
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const id = action.payload as string;
      const altered = state.notifications.find((item) => item.id === id);

      if (!altered) {
        return;
      }

      if (altered.isRead) {
        return;
      }

      altered.isRead = true;
      state.unread -= 1;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((item) => {
        if (item.isRead) {
          return;
        }
        item.isRead = true;
        state.unread -= 1;
      });
    },
    clearAllNotifications: (state) => {
      state = initialState;
    },
  },
});

export const {
  addNotification,
  clearAllNotifications,
  deleteNotification,
  markNotificationAsRead,
  markAllAsRead,
} = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
