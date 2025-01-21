import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

const DocTitle = () => {
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.companyNameContainer}>
          <Text style={styles.companyName}>EDMART SYSTEMS (U) LIMITED</Text>
        </View>
        <View style={styles.docNameContainer}>
          <Text style={styles.docName}>QUOTATION</Text>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  companyNameContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  companyName: {
    fontSize: "12px",
    fontWeight: 700,
    textAlign: "center",
  },
  docNameContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D98219",
    paddingVertical: "3px",
  },
  docName: {
    fontSize: "16px",
    fontWeight: 700,
    textAlign: "center",
    color: "#fff",
  },
});

export default DocTitle;
