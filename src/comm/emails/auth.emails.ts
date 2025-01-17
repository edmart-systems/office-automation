"use server";
import { UserRegInfo } from "@/types/user.types";
import { emailVerCodeOtpEmailTemplate } from "./templates/email-verification-otp-mail-template";
import { SendEmailDto } from "@/types/communication.types";
import { systemEmailSender } from "@/utils/communication.utils";
import { sendEmail } from "@/comm/emails/emails.config";

export const sendEmailVerificationOtp = async ({
  userInfo,
  verCode,
}: {
  userInfo: UserRegInfo;
  verCode: number;
}): Promise<boolean> => {
  try {
    const emailContent: string | null = emailVerCodeOtpEmailTemplate({
      firstName: userInfo.firstName!,
      verCode: String(verCode),
    });

    if (emailContent) {
      const emailData: SendEmailDto = {
        recipients: [
          {
            name: userInfo.firstName!,
            address: userInfo.email!,
          },
        ],
        sender: systemEmailSender,
        subject: `Email Verification - ${verCode}`,
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
