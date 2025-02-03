import { UserSignatureDto } from "@/types/user.types";
import { userNameFormatter } from "@/utils/formatters.util";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

type Props = {
  firstName: string;
  lastName: string;
  companyName: string;
  signature: UserSignatureDto;
};

const DocCreator = ({ firstName, lastName, companyName, signature }: Props) => {
  return (
    <Fragment>
      <View style={styles.detailsContainer}>
        <View style={styles.col1}>
          <DetailsItem
            title="Generated by"
            content={userNameFormatter(firstName, lastName)}
          />
          <DetailsItem title="On behalf of" content={companyName} />
        </View>
        <View style={styles.col2}>
          <View style={styles.detailContainer}>
            <View style={styles.detailTitleContainer}>
              <Text style={styles.detailTitle}>Signature:</Text>
            </View>
            <View style={styles.detailSignatureContainer}>
              <Image src={signature.dataUrl} style={styles.signatureImage} />
            </View>
          </View>
        </View>
      </View>
    </Fragment>
  );
};

const DetailsItem = ({
  title,
  content,
  link,
}: {
  title: string;
  content?: string | null;
  link?: boolean;
}) => {
  return (
    <Fragment>
      <View style={styles.detailContainer}>
        <View style={styles.detailTitleContainer}>
          <Text style={styles.detailTitle}>{title}:</Text>
        </View>
        <View style={styles.detailContentContainer}>
          <Text style={link ? styles.linkDetailContent : styles.detailContent}>
            {content ? content : ""}
          </Text>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  col1: {
    width: "100%",
    flex: 2,
    display: "flex",
    gap: "2px",
  },
  col2: {
    width: "100%",
    flex: 1,
    display: "flex",
    gap: "2px",
  },
  detailContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  detailTitleContainer: {
    width: "100%",
    flex: 2,
    display: "flex",
  },
  detailTitle: {
    width: "100%",
    // fontSize: "12px",
    textAlign: "left",
  },
  detailContentContainer: {
    width: "100%",
    flex: 3,
    display: "flex",
  },
  detailSignatureContainer: {
    maxWidth: "120px",
    maxHeight: "30px",
    flex: 3,
    display: "flex",
  },
  signatureImage: {
    // maxWidth: "100%",
    // maxHeight: "100%",
  },
  detailContent: {
    width: "100%",
    fontWeight: 700,
    // fontSize: "12px",
    textAlign: "left",
  },
  linkDetailContent: {
    width: "100%",
    fontWeight: 700,
    // fontSize: "12px",
    textAlign: "left",
    color: "#D98219",
  },
});

export default DocCreator;
