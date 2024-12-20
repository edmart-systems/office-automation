import { AppNotification } from "@/types/app.types";

export const dummyNotifications: AppNotification[] = [
  {
    id: "1",
    message: "Your profile has been successfully updated.",
    sender: "System",
    picture: undefined,
    action: undefined,
    isRead: false,
  },
  {
    id: "2",
    message: "Your profile has been successfully approved and activated.",
    sender: "System",
    picture: undefined,
    action: "Update Now",
    isRead: false,
  },
  {
    id: "3",
    message:
      "Scheduled maintenance will occur on Dec 10th, 2024, from 1:00 AM to 3:00 AM EAT.",
    sender: "Admin",
    picture: undefined,
    action: undefined,
    isRead: true,
  },
  {
    id: "4",
    message:
      "Your subscription will expire in 3 days. Renew to continue uninterrupted service.",
    sender: "Billing",
    picture: undefined,
    action: "Renew Now",
    isRead: false,
  },
  {
    id: "5",
    message: "Security Alert: A login was detected from a new device.",
    sender: "Security",
    picture: undefined,
    action: "View Details",
    isRead: true,
  },
];
