import { logger } from "@/logger/default-logger";
import { ObjectVerifyResponse } from "@/types/other.types";
import {
  QuotationClientData,
  QuotationInputClientData,
  QuotationLineItem,
  RawQuotationLineItem,
  TcsDto,
} from "@/types/quotations.types";
import {
  quotationDeliveryDaysRange,
  quotationGraceDaysRange,
  quotationValidityRange,
} from "@/utils/constants.utils";
import { ERROR_MESSAGES } from "@/utils/error.utils";
import {
  capitalizeFirstLetter,
  formatPhoneNumber,
} from "@/utils/formatters.util";
import {
  checkDigits,
  isWithinRange,
  validateEmailAddress,
  validatePhoneNumber,
} from "@/utils/verification-validation.utils";
import { Quotation_type } from "@prisma/client";

export const verifyTcs = ({
  selectedTcs,
  quotationType,
  editTcs,
}: {
  selectedTcs: TcsDto;
  quotationType: Quotation_type;
  editTcs: boolean;
}): ObjectVerifyResponse => {
  if (!editTcs) {
    return { valid: true };
  }

  let isOkay = true;
  const errArr: string[] = [];

  const {
    edited_validity_days,
    edited_payment_grace_days,
    edited_initial_payment_percentage,
    edited_last_payment_percentage,
    edited_delivery_days,
  } = selectedTcs;

  if (
    !edited_validity_days ||
    !isWithinRange(edited_validity_days, quotationValidityRange)
  ) {
    isOkay = false;
    errArr.push(ERROR_MESSAGES.INVALID_VALIDITY);
  }

  if (
    !edited_delivery_days ||
    !isWithinRange(edited_delivery_days, quotationDeliveryDaysRange)
  ) {
    isOkay = false;
    errArr.push(ERROR_MESSAGES.INVALID_DELIVERY);
  }

  if (quotationType.type_id == 1) {
    //Supply of Products
    if (
      !edited_payment_grace_days ||
      !isWithinRange(edited_payment_grace_days, quotationGraceDaysRange)
    ) {
      isOkay = false;
      errArr.push(ERROR_MESSAGES.INVALID_GRACE);
    }
  } else {
    if (
      !edited_initial_payment_percentage ||
      !edited_last_payment_percentage ||
      edited_initial_payment_percentage + edited_last_payment_percentage !== 100
    ) {
      isOkay = false;
      errArr.push(ERROR_MESSAGES.INVALID_PERCENTAGES);
    }
  }

  return { valid: isOkay, errors: errArr };
};

export const verifyClientInfo = (
  clientData: QuotationInputClientData
): ObjectVerifyResponse => {
  const errArr: string[] = [];
  let atLeastNameOrContactPerson = false;

  const keys = Object.keys(clientData) as (keyof QuotationClientData)[];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = clientData[key];
    try {
      if (
        (key === "name" && value && String(value).length > 5) ||
        (key === "contactPerson" && value && String(value).length > 5)
      ) {
        atLeastNameOrContactPerson = true;
      }

      if (String(value).length > 64) {
        errArr.push(
          `${capitalizeFirstLetter(
            key
          )} field is too long. Reduce to a max of 64 Characters`
        );
      }

      if (
        key == "email" &&
        value &&
        !validateEmailAddress(String(value ?? ""))
      ) {
        errArr.push(`Invalid email address.`);
      }

      if (key == "phone" && value) {
        try {
          const formattedPhone = formatPhoneNumber(String(value));
          if (!validatePhoneNumber(formattedPhone)) {
            errArr.push(`Invalid phone number.`);
          }
        } catch (err) {
          errArr.push(`Invalid phone number.`);
        }
      }
    } catch (err) {
      logger.error(err);
      errArr.push(`Invalid inputs on field ${capitalizeFirstLetter(key)}`);
    }
  }

  if (!atLeastNameOrContactPerson) {
    errArr.push(
      `At least the client name or contact person must be provided, with at least 5 characters.`
    );
  }

  return errArr.length > 0 ? { valid: false, errors: errArr } : { valid: true };
};

export const verifyLineItems = (
  lineItems: QuotationLineItem[]
): ObjectVerifyResponse => {
  const errArr: string[] = [];

  if (lineItems.length < 1) {
    errArr.push(`No items provided.`);
  }

  lineItems.forEach((item, index) => {
    const missing: string[] = [];
    const tooLong: string[] = [];
    const invalid: string[] = [];

    Object.keys(item).forEach((_key) => {
      const key = _key as keyof QuotationLineItem;
      const value = item[key];

      if (key !== "description") {
        if (!value) {
          missing.push(capitalizeFirstLetter(key));
        }

        if (String(value).length > 30) {
          tooLong.push(capitalizeFirstLetter(key));
        }

        if (key == "quantity" || key == "unitPrice") {
          if (!checkDigits(String(value))) {
            invalid.push(capitalizeFirstLetter(key));
          }
        }
      }

      if (key == "description") {
        if (value) {
          if (String(value).length > 60) {
            tooLong.push(capitalizeFirstLetter(key));
          }
        }
      }
    });

    let errorMessage = `Line item ${index + 1}:`;

    if (missing.length > 0) {
      errorMessage += ` ${missing.join(", ")} field(s) missing.`;
    }

    if (tooLong.length > 0) {
      errorMessage += ` ${tooLong.join(", ")} field(s) too long.`;
    }

    if (invalid.length > 0) {
      errorMessage += ` ${invalid.join(", ")} field(s) invalid.`;
    }

    if (missing.length > 0 || tooLong.length > 0 || invalid.length > 0) {
      errorMessage += " Correct or remove item.";
      errArr.push(errorMessage);
    }
  });

  return errArr.length > 0 ? { valid: false, errors: errArr } : { valid: true };
};

export const processQuotationLineItems = (
  lineItems: QuotationLineItem[],
  excludeVat: boolean,
  tcs: TcsDto
): {
  lineItems: RawQuotationLineItem[];
  vat: number;
  sub_total: number;
  grand_total: number;
} => {
  let subtotal = 0;
  const _lineItems: RawQuotationLineItem[] = [];
  for (let i = 0; i < lineItems.length; i++) {
    const item = lineItems[i];
    const qty = item.quantity;
    const price = item.unitPrice;
    if (!qty || !price) continue;

    subtotal += qty * price;

    _lineItems.push({
      name: item.name!,
      description: item.description ? item.description : null,
      quantity: qty,
      unitPrice: price,
      units: item.units!,
    });
  }

  const vat = excludeVat ? 0 : (subtotal * tcs.vat_percentage) / 100;
  const grandTotal = subtotal + vat;

  return {
    grand_total: grandTotal,
    sub_total: subtotal,
    vat: vat,
    lineItems: _lineItems,
  };
};
