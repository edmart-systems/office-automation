"use server";

import { User } from "@prisma/client";
import { newAccountEmailTemplate } from "./templates/new-account-mail-template";
import { systemEmailSender } from "@/utils/comm.utils";
import { sendEmail } from "@/comm/emails/emails.config";
import { approvedAccountEmailTemplate } from "./templates/approved-account-mail-template";
import { SendEmailDto } from "@/types/comm.types";

export const sendNewAccountEmail = async (user: User): Promise<boolean> => {
  try {
    const emailContent: string | null = newAccountEmailTemplate({
      firstName: user.firstName,
    });

    if (emailContent) {
      const emailData: SendEmailDto = {
        recipients: [
          {
            name: user.firstName,
            address: user.email,
          },
        ],
        sender: systemEmailSender,
        subject: `New Account`,
        message: emailContent,
        isHtml: true,
      };

      const sendEmailRes = await sendEmail(emailData);

      if (sendEmailRes.accepted.length < 1) {
        console.log("Failed to send email");
        return Promise.resolve(false);
      } else {
        console.log("Email Sent successfully");
        return Promise.resolve(true);
      }
    }

    return Promise.resolve(false);
  } catch (err) {
    console.log(err);
    return Promise.resolve(false);
  }
};

export const sendAccountApprovedEmail = async (
  user: User
): Promise<boolean> => {
  try {
    const emailContent: string | null = approvedAccountEmailTemplate({
      firstName: user.firstName,
      co_user_id: user.co_user_id,
    });

    if (emailContent) {
      const emailData: SendEmailDto = {
        recipients: [
          {
            name: user.firstName,
            address: user.email,
          },
        ],
        sender: systemEmailSender,
        subject: `Account Approved`,
        message: emailContent,
        isHtml: true,
      };

      const sendEmailRes = await sendEmail(emailData);

      if (sendEmailRes.accepted.length < 1) {
        console.log("Failed to send email");
        return Promise.resolve(false);
      } else {
        console.log("Email Sent successfully");
        return Promise.resolve(true);
      }
    }

    return Promise.resolve(false);
  } catch (err) {
    console.log(err);
    return Promise.resolve(false);
  }
};
