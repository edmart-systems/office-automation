import { fetchSingleQuotation } from "@/actions/quotations-actions/quotations.actions";
import PageGoBack from "@/components/dashboard/common/page-go-back";
import DisplayQuotation from "@/components/dashboard/quotations/quotation/display-quotation/display-quotation";
import QuotationActions from "@/components/dashboard/quotations/quotation/quotation-actions";
import QuotationPageHead from "@/components/dashboard/quotations/quotation/quotation-page-header";
import { FullQuotation } from "@/types/quotations.types";
import { paths } from "@/utils/paths.utils";
import { Stack } from "@mui/material";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quotation | Office X",
  description: "Office Automation System",
};

type Props = {
  params: Promise<{ id: string }>;
};

const getThisQuotation = async (
  quotationId: string
): Promise<FullQuotation | null> => {
  try {
    const res = await fetchSingleQuotation(quotationId);

    if (res.status && res.data) {
      return Promise.resolve(res.data as FullQuotation);
    }

    return Promise.resolve(null);
  } catch (err) {
    return Promise.resolve(null);
  }
};

const SingleQuotationPage = async ({ params }: Props) => {
  const { id } = await params;
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
        <QuotationPageHead
          quotationId={quotation.quotationId}
          userId={quotation.user.co_user_id}
          firstName={quotation.user.firstName}
          lastName={quotation.user.lastName}
          status={quotation.status}
          isExpired={quotation.isExpired}
        />
        <QuotationActions quotation={quotation} />
      </Stack>
      <DisplayQuotation quotation={quotation} />
    </Stack>
  );
};

export default SingleQuotationPage;
