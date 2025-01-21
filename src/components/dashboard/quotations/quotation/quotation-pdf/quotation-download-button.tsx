import { usePDF } from "@react-pdf/renderer";
import React, { Fragment } from "react";
import QuotationPdfDoc from "./quotation-pdf-doc";
import Link from "next/link";
import { Button, Stack, Typography } from "@mui/material";
import { Download } from "@phosphor-icons/react";
import MyCircularProgress from "@/components/common/my-circular-progress";

const QuotationDownloadButton = () => {
  const [instance, updateInstance] = usePDF({
    document: <QuotationPdfDoc />,
  });

  return (
    <Fragment>
      <Stack direction="row" alignItems="center" spacing={1}>
        {instance.error && <Typography>{instance.error}</Typography>}
        {instance.loading ? (
          <MyCircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            endIcon={<Download />}
            LinkComponent={Link}
            href={instance.url ?? ""}
            target="_blank"
            rel="no-referrer"
            download="quotation1.pdf"
            disabled={instance.error ? true : false}
          >
            Download
          </Button>
        )}
      </Stack>
    </Fragment>
  );
};

export default QuotationDownloadButton;
