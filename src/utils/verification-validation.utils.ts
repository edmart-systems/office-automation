import { ItemRange } from "@/types/other.types";

export const codeGenerator = (length: number) => {
  try {
    const x = parseInt(`9`.repeat(length), 10);
    const y = parseInt(`1${"0".repeat(length - 1)}`, 10);
    return Math.floor(Math.random() * (x - y + 1)) + y;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const checkDigits = (numberStr: string): boolean => {
  try {
    let isOkay = true;

    for (let i = 0; i < numberStr.length; i++) {
      const char = parseInt(numberStr[i], 10);
      if (isNaN(char)) {
        isOkay = false;
        break;
      }
    }

    return isOkay;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const validRegex =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  if (phoneNumber.slice(0, 1) !== "+") {
    return false;
  }
  if (phoneNumber.match(validRegex)) {
    return true;
  }
  return false;
};

export const validateEmailAddress = (email: string) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  }
  return false;
};

export const validatePassword = (password: string) => {
  const validRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (password.match(validRegex)) {
    return true;
  }
  return false;
};

export const validateUserName = (
  name1?: string,
  name2?: string,
  name3?: string
) => {
  if (!name1 || !name2 || name1.length < 3 || name2.length < 3) {
    return false;
  }
  return true;
};

export const validateCompanyId = (id: string): boolean => {
  try {
    if (id.length !== 11) {
      return false;
    }

    const firstPart = id.substring(0, 4);
    const secondPart = id.substring(4, 8);
    const thirdPart = id.substring(8);

    if (firstPart !== "TEMP" && firstPart !== "ESUL") {
      return false;
    }

    if (secondPart.length !== 4 || !checkDigits(secondPart)) {
      return false;
    }

    if (thirdPart.length !== 3 || !checkDigits(thirdPart)) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const verifyQuotationId = (quotationId: string): boolean => {
  if (!quotationId.startsWith("Q")) {
    return false;
  }

  if (quotationId.length !== 10 && quotationId.length !== 11) {
    return false;
  }

  const numericPart = quotationId.slice(1);

  try {
    if (Number.isNaN(parseInt(numericPart, 10))) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

export const isWithinRange = (value: number, range: ItemRange): boolean => {
  return value >= range.min && value <= range.max;
};
