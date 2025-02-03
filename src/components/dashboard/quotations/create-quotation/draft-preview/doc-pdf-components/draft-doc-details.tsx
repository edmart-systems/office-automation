import { QuotationInputClientData } from "@/types/quotations.types";
import { formatDisplayedPhoneNumber } from "@/utils/formatters.util";
import { fDate, fDateTime12 } from "@/utils/time";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment } from "react";

type Props = {
  quotationId: string;
  tin: string | null;
  time: number;
  client: QuotationInputClientData;
};

const DraftDocDetails = ({ quotationId, tin, time, client }: Props) => {
  return (
    <Fragment>
      <View style={styles.detailsContainer}>
        <View style={styles.col1}>
          <DetailsItem title="TIN" content={tin} />
          <DetailsItem title="Date" content={fDate(time)} />
          <DetailsItem title="To" content={client.name} />
          <DetailsItem title="Email" content={client.email} link />
        </View>
        <View style={styles.col2}>
          <DetailsItem title="Draft No" content={quotationId} />
          <DetailsItem title="Ref" content={client.ref} />
          <DetailsItem title="Contact" content={client.contactPerson} />
          <DetailsItem
            title="Tel"
            content={
              client.phone ? formatDisplayedPhoneNumber(client.phone) : ""
            }
            link
          />
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
    flex: 1,
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
  },
  detailTitleContainer: {
    width: "100%",
    flex: 1,
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
  detailContent: {
    width: "100%",
    // fontSize: "12px",
    textAlign: "left",
  },
  linkDetailContent: {
    width: "100%",
    // fontSize: "12px",
    textAlign: "left",
    color: "#D98219",
  },
});

export default DraftDocDetails;
