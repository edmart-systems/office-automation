import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";
import { generateQrBase64 } from "../../display-quotation/quotation-qr";
import { encryptMessage } from "@/utils/crypto.utils";

type Props = {
  quotationId: string;
};

const DocQr = ({ quotationId }: Props) => {
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
        <Image src={generateQrBase64(qrUrl)} />
        {/* <QuotationQr
          width={200}
          length={200}
          quotationKey="#Usaama@Usaama#Usaama$Usaama%Usaama^Usaama&Usaama*Usaama(Usaama)Usaama_Usaama+Usaama`Usaama!"
        /> */}
        {/* <Text>sasd</Text> */}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    position: "absolute",
    right: "0px",
    top: "0px",
    width: "100px",
    height: "100px",
  },
  qrImg: {
    width: "100%",
    height: "100%",
  },
});
export default DocQr;
