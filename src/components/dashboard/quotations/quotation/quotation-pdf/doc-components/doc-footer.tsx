import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

const DocFooter = () => {
  return (
    <Fragment>
      <View fixed style={styles.footerContainer}>
        <View style={styles.stripesContainer}>
          <View style={styles.stripe1}></View>
          <View style={styles.stripe2}></View>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactTxt}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
            aperiam, officia ipsa assumenda ut praesentium mollitia consequuntur
            asperiores sed error. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Cum aperiam, officia ipsa assumenda
          </Text>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    paddingHorizontal: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stripesContainer: {
    width: "96%",
    display: "flex",
    gap: "1px",
  },
  stripe1: {
    backgroundColor: "#D98219",
    width: "100%",
    height: "5px",
  },
  stripe2: {
    backgroundColor: "#000",
    width: "100%",
    height: "5px",
  },
  contactContainer: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contactTxt: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default DocFooter;
