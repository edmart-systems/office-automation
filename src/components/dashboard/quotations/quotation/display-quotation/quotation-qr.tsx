"use client";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { Skeleton, Stack } from "@mui/material";

type Props = {
  quotationKey: string;
  width?: number;
  length?: number;
};

export const generateQrBase64 = async (key: string): Promise<string> => {
  const qr = await QRCode.toDataURL(key, { errorCorrectionLevel: "Q" });
  return Promise.resolve(qr);
};

const QuotationQr = ({ quotationKey, length, width }: Props) => {
  const [qrSrc, setQrSrc] = useState<string>();

  const qrHandler = async () => {
    if (qrSrc) return;
    const qr = await generateQrBase64(quotationKey);
    setQrSrc(qr);
  };

  useEffect(() => {
    qrHandler();
  }, [quotationKey]);

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
        <>
          <Skeleton
            variant="rounded"
            width={width ? width : 160}
            height={length ? length : 160}
          />
        </>
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
