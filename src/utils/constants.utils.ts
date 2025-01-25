import { ItemRange } from "@/types/other.types";
import { SignatureFonts } from "@/types/signature.types";

export const quotationValidityRange: ItemRange = {
  min: 1,
  max: 365,
};

export const quotationGraceDaysRange: ItemRange = {
  min: 1,
  max: 365,
};

export const quotationDeliveryDaysRange: ItemRange = {
  min: 1,
  max: 365,
};

export const signatureFonts: SignatureFonts = {
  "Lavishly Your": {},
  "Playwrite IN": {},
  "Princess Sofia": {},
  "Send Flowers": {},
  "Style Script": {},
  Borel: {},
  Yellowtail: {},
  Vibur: {},
};
