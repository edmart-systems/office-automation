import PageGoBack from "@/components/dashboard/common/page-go-back";
import DisplayQuotation from "@/components/dashboard/quotations/quotation/display-quotation/display-quotation";
import QuotationActions from "@/components/dashboard/quotations/quotation/quotation-actions";
import QuotationPageHead from "@/components/dashboard/quotations/quotation/quotation-page-header";
import { paths } from "@/utils/paths.utils";
import { Stack } from "@mui/material";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quotation | Office X",
  description: "Office Automation System",
};

type Props = {
  params: { id: string };
};

const getThisQuotation = async (quotationId: string): Promise<any> => {
  try {
    // const res = await fetchSingleUser(userId);

    // if (res.status) {
    //   return Promise.resolve(res.data);
    // }

    return Promise.resolve(quotationId);
  } catch (err) {
    return Promise.resolve(null);
  }
};

const SingleQuotationPage = async ({ params }: Props) => {
  const { id } = params;
  const quotation = await getThisQuotation(id);

  if (!quotation) {
    return redirect(paths.errors.notFound);
  }

  return (
    <Stack spacing={3}>
      <Stack>
        <PageGoBack
          backName="Quotations"
          link={paths.dashboard.quotations.main}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <QuotationPageHead />
        <QuotationActions />
      </Stack>
      <DisplayQuotation />
    </Stack>
  );
};

export default SingleQuotationPage;
