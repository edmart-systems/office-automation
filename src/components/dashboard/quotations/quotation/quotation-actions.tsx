"use client";

import { OpenInNew, Recycling } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { Download } from "@phosphor-icons/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import QuotationStatusActions from "./quotation-status-actions";
import { FullQuotation, NewQuotation } from "@/types/quotations.types";
import { useSession } from "next-auth/react";
import { CompanyDto } from "@/types/company.types";
import { getTimeNum } from "@/utils/time";
import { setReuseQuotations } from "@/redux/slices/quotation.slice";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { paths } from "@/utils/paths.utils";
import nProgress from "nprogress";
import QuotationViewDialog from "./quotation-pdf/quotation-view-dialog";
import QuotationDownloadButton from "./quotation-pdf/quotation-download-button";

type Props = {
  quotation: FullQuotation;
  company: CompanyDto;
};

const QuotationActions = ({ quotation, company }: Props) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openPdf, setOpenPdf] = useState<boolean>(false);

  const toastUnderDev = (item: string) => {
    toast(item + " functionality under development", {
      type: "info",
    });
  };

  const reuseQuotationHandler = () => {
    const date = new Date();

    const reuseQuotation: NewQuotation = {
      quotationId: getTimeNum(date),
      time: getTimeNum(date),
      type: quotation.type,
      tcsEdited: quotation.tcsEdited,
      vatExcluded: false,
      tcs: quotation.tcs,
      currency: quotation.currency,
      clientData: quotation.clientData,
      lineItems: quotation.lineItems,
    };

    dispatch(setReuseQuotations(reuseQuotation));
    nProgress.start();
    router.push(paths.dashboard.quotations.create);
  };

  const openPdfHandler = () => {
    setOpenPdf(true);
  };

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Box>
        <QuotationDownloadButton />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          endIcon={<OpenInNew />}
          onClick={openPdfHandler}
        >
          Preview
        </Button>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Recycling />}
          onClick={reuseQuotationHandler}
        >
          Reuse
        </Button>
      </Box>
      {sessionData?.user.co_user_id === quotation.user.co_user_id && (
        <Box>
          <QuotationStatusActions status="sent" />
        </Box>
      )}
      <QuotationViewDialog open={openPdf} setOpen={setOpenPdf} />
    </Stack>
  );
};

export default QuotationActions;
