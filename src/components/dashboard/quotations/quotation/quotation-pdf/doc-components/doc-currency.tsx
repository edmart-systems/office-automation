import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

const DocCUrrency = () => {
  return (
    <Fragment>
      <View style={styles.currencyContainer}>
        <Text style={styles.currencyTxt}>Currency: UGX</Text>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  currencyContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  currencyTxt: {
    width: "100%",
    fontSize: "12px",
    textAlign: "right",
    // marginRight: "10px",
  },
});

export default DocCUrrency;
