import { QuotationOutputLineItem } from "@/types/quotations.types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React, { Fragment, ReactElement, ReactNode } from "react";

type Props = {
  vatExcluded: boolean;
  vatPercentage: number;
  vat: number;
  subtotal: number;
  grandTotal: number;
  lineItems: QuotationOutputLineItem[];
};

const DocTable = ({
  lineItems,
  grandTotal,
  subtotal,
  vatPercentage,
  vat,
  vatExcluded,
}: Props) => {
  return (
    <Fragment>
      <View style={styles.tableContainer}>
        <View style={styles.specialRow}>
          <DocTableCell bold align="center" flex={0.5}>
            S/N
          </DocTableCell>
          <DocTableCell bold align="center" flex={4}>
            Item / Description
          </DocTableCell>
          <DocTableCell bold align="center" flex={0.5}>
            Qty
          </DocTableCell>
          <DocTableCell bold align="center" flex={1}>
            Units
          </DocTableCell>
          <DocTableCell bold align="right" flex={2}>
            Unit Price
          </DocTableCell>
          <DocTableCell bold noBorder align="right" flex={2}>
            Total
          </DocTableCell>
        </View>
        {lineItems.map((item, index) => {
          return (
            <View
              key={item.id + "-" + index}
              style={{
                ...styles.tableRow,
                // ...(index === 19 ? { borderBottom: "none" } : {}),
              }}
            >
              <DocTableCell align="center" flex={0.5}>
                {index + 1}
              </DocTableCell>
              <DocTableCell align="left" flex={4}>
                {item.name}
                {item.description && ", " + item.description}
              </DocTableCell>
              <DocTableCell align="center" flex={0.5}>
                {item.quantity}
              </DocTableCell>
              <DocTableCell align="center" flex={1}>
                {item.units}
              </DocTableCell>
              <DocTableCell special align="right" flex={2}>
                {item.unitPrice.toLocaleString()}
              </DocTableCell>
              <DocTableCell align="right" noBorder flex={2}>
                {(item.unitPrice * item.quantity).toLocaleString()}
              </DocTableCell>
            </View>
          );
        })}
        <View style={styles.specialRow}>
          <DocTableCell bold align="center" flex={8.4}>
            Sub Total
          </DocTableCell>
          <DocTableCell bold noBorder align="right" flex={2}>
            {subtotal.toLocaleString()}
          </DocTableCell>
        </View>
        {!vatExcluded && (
          <View style={styles.specialRow}>
            <DocTableCell bold align="center" flex={8.4}>
              VAT ({vatPercentage}%)
            </DocTableCell>
            <DocTableCell bold noBorder align="right" flex={2}>
              {vat.toLocaleString()}
            </DocTableCell>
          </View>
        )}
        <View style={{ ...styles.specialRow, ...{ borderBottom: "none" } }}>
          <DocTableCell bold align="center" flex={8.4}>
            Grand Total ({vatExcluded ? "VAT Exclusive" : "VAT Inclusive"})
          </DocTableCell>
          <DocTableCell bold noBorder align="right" flex={2}>
            {grandTotal.toLocaleString()}
          </DocTableCell>
        </View>
      </View>
    </Fragment>
  );
};

const DocTableCell = ({
  children,
  flex,
  special,
  bold,
  align,
  noBorder,
}: {
  children?: ReactNode;
  flex?: number;
  special?: boolean;
  bold?: boolean;
  align?: "left" | "right" | "center" | "justify";
  noBorder?: boolean;
}) => {
  return (
    <Fragment>
      <View
        style={{
          ...styles.tableCell,
          ...{ flex: flex },
          ...(special ? styles.special : {}),
          ...(noBorder ? { borderRight: "none" } : {}),
        }}
      >
        <Text
          style={{
            ...styles.tableCellContent,
            ...(bold ? styles.bold : {}),
            ...(align ? { textAlign: align } : {}),
          }}
        >
          {children && children}
        </Text>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    width: "100%",
    border: "1px solid black",
    borderRadius: "5px",
    display: "flex",
  },
  tableRow: {
    width: "100%",
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  specialRow: {
    width: "100%",
    borderBottom: "1px solid black",
    backgroundColor: "#b3b0b01a",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tableCell: {
    width: "100%",
    height: "100%",
    borderRight: "1px solid black",
    padding: "2px 2px",
  },
  tableCellContent: {
    width: "100%",
    // height: "100%",
    // fontSize: "12px",
    textAlign: "left",
  },
  bold: {
    fontWeight: 700,
  },
  special: {
    backgroundColor: "#b3b0b01a",
  },
});

export default DocTable;
