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
import { generateQrKeyTemp } from "../display-quotation/display-quotation";

Font.register({
  family: "Comic Sans MS",
  fonts: [
    { src: "/assets/fonts/ComicSansMS.ttf" },
    { src: "/assets/fonts/ComicSansMS_B.ttf", fontWeight: 700 },
  ],
});

type Props = {
  quotation: FullQuotation;
  company: CompanyDto;
};

const QuotationPdfDoc = ({ company, quotation }: Props) => {
  const date = new Date(quotation.time);
  const qrKey = generateQrKeyTemp({ quotation, company });

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
        <DocQr quotationId={quotation.quotationId} qrKey={qrKey} />
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
            signature={quotation.signature}
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
    fontSize: "11px",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: "24px",
    paddingBottom: "100px",
    // justifyContent: "center",
  },
  mainContainer: {
    width: "100%",
    paddingHorizontal: "50px",
    display: "flex",
    gap: "5px",
  },
});

export default QuotationPdfDoc;
