"use client";

import { Stack, TablePagination, Typography } from "@mui/material";
import React, { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import QuotationsTable from "./quotations-table";
import { useSearchParams } from "next/navigation";

const QuotationsTableContainer = () => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const viewParam = searchParams.get("view");

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(() => [], []);

  return (
    <Stack spacing={2}>
      {viewParam === "list" ? (
        <QuotationsTable num={10} />
      ) : (
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>
              Sent ({3})
            </Typography>
            <QuotationsTable num={3} />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>
              Accepted ({2})
            </Typography>
            <QuotationsTable num={2} />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>
              Rejected ({3})
            </Typography>
            <QuotationsTable num={3} />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>
              Expired ({2})
            </Typography>
            <QuotationsTable num={2} />
          </Stack>
        </Stack>
      )}

      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10]}
        labelRowsPerPage="Rows Displayed"
        disabled={false}
      />
    </Stack>
  );
};

export default QuotationsTableContainer;
