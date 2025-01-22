import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";
import { generateQrBase64 } from "../../display-quotation/quotation-qr";
// import QuotationQr from "../../display-quotation/quotation-qr";

const DocQr = () => {
  return (
    <Fragment>
      <View fixed style={styles.qrContainer}>
        <Image
          src={generateQrBase64(
            "Hooray#Usaama@Usaama#Usaama$Usaama%Usaama^Usaama&Usaama*Usaama(Usaama)Usaama_Usaama+Usaama`Usaama!"
          )}
        />
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
