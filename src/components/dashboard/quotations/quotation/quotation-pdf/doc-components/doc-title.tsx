import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

type Props = {
  companyName: string;
};

const DocTitle = ({ companyName }: Props) => {
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.companyNameContainer}>
          <Text style={styles.companyName}>{companyName}</Text>
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
    fontSize: "14px",
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
    borderRadius: "5px",
  },
  docName: {
    fontSize: "16px",
    fontWeight: 700,
    textAlign: "center",
    color: "#fff",
    textShadow: "0.9px 0px #fff",
  },
});

export default DocTitle;
