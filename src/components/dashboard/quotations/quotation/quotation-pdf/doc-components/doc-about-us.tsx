import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

const DocAboutUs = () => {
  return (
    <Fragment>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTxt}>
          We are pleased to present to you our quotation as per your request for
          the items enlisted hereunder: Edmart Systems (U) Limited is an
          authorized dealer of Dell, HP, Lenovo, Canon, Epson, Kaspersky,
          Microsoft, Bit defender, CISCO, COMMANDO and with a well-equipped
          workshop and qualified personnel.
        </Text>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    width: "100%",
  },
  aboutTxt: {
    width: "100%",
    fontSize: "12px",
    textAlign: "justify",
  },
});
export default DocAboutUs;
