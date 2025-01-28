import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";
import { generateQrBase64 } from "../../display-quotation/quotation-qr";
import { encryptMessage } from "@/utils/crypto.utils";

type Props = {
  quotationId: string;
  qrKey: string;
};

const DocQr = ({ quotationId, qrKey }: Props) => {
  const key = process.env.NEXT_PUBLIC_QUOTATION_QR_URL_KEY;

  if (!key) {
    return <Fragment></Fragment>;
  }

  const qrUrl = `https://edmartsystems.com/verify/doc/quotation/${encryptMessage(
    quotationId,
    key
  )}`;

  return (
    <Fragment>
      <View fixed style={styles.qrContainer}>
        {/* <Image src={generateQrBase64(qrUrl)} /> */}
        <Image src={generateQrBase64(qrKey)} />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    position: "absolute",
    right: "10px",
    top: "10px",
    width: "80px",
    height: "80px",
  },
  qrImg: {
    width: "100%",
    height: "100%",
  },
});
export default DocQr;
