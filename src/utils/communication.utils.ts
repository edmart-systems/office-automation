import Mail from "nodemailer/lib/mailer";

export const systemEmailSender: Mail.Address = {
  name: "Office Automata - Auth",
  address: "ofiiceautomata@edmartsystems.com",
};

export const systemEmailRecipients: Mail.Address[] = [];

export const systemEmailBccRecipients: Mail.Address[] = [];
