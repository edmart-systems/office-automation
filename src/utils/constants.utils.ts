import { ItemRange } from "@/types/other.types";
import { QuotationDocCommentary } from "@/types/quotations.types";
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

export const quotationPdfCommentary: QuotationDocCommentary = {
  IT: {
    content:
      "We are pleased to present our quotation for the items/services as per your request. Edmart Systems (U) Limited specializes in providing cutting-edge technology solutions, including networking, software, security systems, web hosting, and IT supplies. We are authorized dealers of Dell, HP, Lenovo, Canon, Epson, Microsoft, Cisco, Kaspersky, HIKVision, Bitdefender, and more. We guarantee genuine products and expert services.",
  },
  Stationery: {
    content:
      "Thank you for your interest in our stationery offerings. Edmart Systems (U) Limited is a trusted supplier of premium office and school supplies, including printing essentials, writing instruments, and paper products. Our focus is on delivering high-quality items tailored to your operational needs, ensuring affordability and reliability. We look forward to being your partner in maintaining seamless day-to-day operations with our carefully curated range of stationery products.",
  },
  General: {
    content:
      "We are pleased to provide you with our quotation for the items requested. Edmart Systems (U) Limited is a versatile supplier with expertise in delivering a broad range of products and services to meet diverse business needs. From IT solutions to general supplies, we strive to ensure quality, reliability, and value for our esteemed customers.",
  },
};
