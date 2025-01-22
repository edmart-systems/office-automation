import { StyleSheet, Text } from "@react-pdf/renderer";
import React, { Fragment } from "react";

const DocLastTxt = () => {
  return (
    <Fragment>
      <Text style={styles.txt1}>
        Thank you for the Inquiry, Please get back to us in case of anything.
      </Text>
      <Text style={styles.txt2}>For verification, scan the QR code.</Text>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  txt1: {
    fontSize: "12px",
  },
  txt2: {
    fontSize: "10px",
  },
});
export default DocLastTxt;
