import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import DocHeader from "./doc-components/doc-header";
import DocTitle from "./doc-components/doc-title";
import DocFooter from "./doc-components/doc-footer";
import DocAboutUs from "./doc-components/doc-about-us";
import DocDetails from "./doc-components/doc-details";
import DocCUrrency from "./doc-components/doc-currency";

Font.register({
  family: "Comic Sans MS",
  src: "/assets/fonts/ComicSansMS.ttf",
});

const QuotationPdfDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <DocHeader />
      <View style={styles.mainContainer}>
        <DocTitle />
        <DocDetails />
        <DocAboutUs />
        <DocCUrrency />
        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>

        <Text style={styles.sam}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam et
          vitae impedit dicta exercitationem officia amet pariatur quis harum
          inventore excepturi, facilis tenetur dignissimos reiciendis ex
          sapiente, eligendi aliquid eius!
        </Text>
      </View>
      <DocFooter />
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Comic Sans MS",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: "90px",
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
