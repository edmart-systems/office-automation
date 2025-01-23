"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { Skeleton, Stack } from "@mui/material";
import { encryptMessage } from "@/utils/crypto.utils";

type Props = {
  quotationId: string;
  width?: number;
  length?: number;
};

export const generateQrBase64 = async (key: string): Promise<string> => {
  const qr = await QRCode.toDataURL(key, { errorCorrectionLevel: "Q" });
  return Promise.resolve(qr);
};

const QuotationQr = ({ quotationId, length, width }: Props) => {
  const [qrSrc, setQrSrc] = useState<string>();

  const qrHandler = async () => {
    const key = process.env.NEXT_PUBLIC_QUOTATION_QR_URL_KEY;
    console.log(key);
    if (qrSrc || !key) return;

    const qrUrl = `https://edmartsystems.com/verify/doc/quotation/${encryptMessage(
      quotationId,
      key
    )}`;
    const qr = await generateQrBase64(qrUrl);
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
      <div
        style={{
          zIndex: 1,
          position: "absolute",
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          // background: "#0000004b",
        }}
      ></div>
    </Stack>
  );
};

export default QuotationQr;
