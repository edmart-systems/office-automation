export type AppNotification = {
  id: string;
  message: string;
  sender: string;
  picture?: string;
  action?: string;
  isRead: boolean;
};
