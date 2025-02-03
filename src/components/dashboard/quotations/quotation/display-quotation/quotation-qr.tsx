"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { Skeleton, Stack } from "@mui/material";
import { encryptMessage } from "@/utils/crypto.utils";
import Veil from "@/components/dashboard/common/veil";

type Props = {
  quotationId: string;
  width?: number;
  length?: number;
  qrKey: string;
};

export const generateQrBase64 = async (key: string): Promise<string> => {
  const qr = await QRCode.toDataURL(key, { errorCorrectionLevel: "Q" });
  return Promise.resolve(qr);
};

const QuotationQr = ({ quotationId, length, width, qrKey }: Props) => {
  const [qrSrc, setQrSrc] = useState<string>();

  const qrHandler = async () => {
    const key = process.env.NEXT_PUBLIC_QUOTATION_QR_URL_KEY;

    if (qrSrc || !key) return;

    const qrUrl = `https://edmartsystems.com/verify/doc/quotation/${encryptMessage(
      quotationId,
      key
    )}`;
    // const qr = await generateQrBase64(qrUrl);
    const qr = await generateQrBase64(qrKey);
    setQrSrc(qr);
  };

  useEffect(() => {
    qrHandler();
  }, [quotationId]);

  return (
    <Stack position="relative">
      {qrSrc ? (
        <Image
          src={qrSrc}
          width={width ? width : 160}
          height={length ? length : 160}
          alt="qr"
          style={{ zIndex: 0 }}
        />
      ) : (
        <Skeleton
          variant="rounded"
          width={width ? width : 160}
          height={length ? length : 160}
        />
      )}
      <Veil zIndex={1} />
    </Stack>
  );
};

export default QuotationQr;
