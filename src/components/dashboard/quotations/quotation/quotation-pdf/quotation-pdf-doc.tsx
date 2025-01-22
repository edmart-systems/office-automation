import React from "react";
import { Page, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import DocHeader from "./doc-components/doc-header";
import DocTitle from "./doc-components/doc-title";
import DocFooter from "./doc-components/doc-footer";
import DocAboutUs from "./doc-components/doc-about-us";
import DocDetails from "./doc-components/doc-details";
import DocCurrency from "./doc-components/doc-currency";
import DocTable from "./doc-components/doc-table";
import DocTcs from "./doc-components/doc-tcs";
import DocLastTxt from "./doc-components/doc-last-txt";
import DocCreator from "./doc-components/doc-creator";
import { FullQuotation } from "@/types/quotations.types";
import { CompanyDto } from "@/types/company.types";
import { userNameFormatter } from "@/utils/formatters.util";
import DocQr from "./doc-components/doc-qr";

Font.register({
  family: "Comic Sans MS",
  src: "/assets/fonts/ComicSansMS.ttf",
});

type Props = {
  quotation: FullQuotation;
  company: CompanyDto;
};

const QuotationPdfDoc = ({ company, quotation }: Props) => {
  const date = new Date(quotation.time);

  return (
    <Document
      title={`Quotation-${(
        quotation.clientData.name ??
        quotation.clientData.contactPerson ??
        ""
      ).replace(/ /g, "_")}-${quotation.quotationId}`}
      creator={company.legal_name ?? company.business_name}
      author={userNameFormatter(
        quotation.user.firstName,
        quotation.user.lastName
      )}
      subject={quotation.type.name}
      language="En"
      creationDate={date}
    >
      <Page size="A4" style={styles.page}>
        <DocHeader />
        <DocQr />
        <View style={styles.mainContainer}>
          <DocTitle companyName={company.legal_name ?? company.business_name} />
          <DocDetails
            quotationId={quotation.quotationId}
            tin={company.tin}
            time={quotation.time}
            client={quotation.clientData}
          />
          <DocAboutUs />
          <DocCurrency currency={quotation.currency} />
          <DocTable
            lineItems={quotation.lineItems}
            grandTotal={quotation.grandTotal}
            subtotal={quotation.subTotal}
            vat={quotation.vat}
            vatPercentage={quotation.tcs.vat_percentage}
            vatExcluded={quotation.vatExcluded}
          />
          <DocTcs
            tcsEdited={quotation.tcsEdited}
            quotationType={quotation.type}
            selectedTcs={quotation.tcs}
          />
          <DocCreator
            firstName={quotation.user.firstName}
            lastName={quotation.user.lastName}
            companyName={company.legal_name ?? company.business_name}
          />
          <DocLastTxt />
        </View>
        <DocFooter company={company} />
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Comic Sans MS",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: "100px",
    // justifyContent: "center",
  },
  mainContainer: {
    width: "100%",
    paddingHorizontal: "40px",
    display: "flex",
    gap: "6px",
  },

  sam: {
    fontSize: "12px",
    textAlign: "justify",
  },
});

export default QuotationPdfDoc;
