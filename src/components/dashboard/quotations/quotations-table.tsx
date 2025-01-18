"use client";

import {
  Box,
  Card,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import QuotationTableUser from "./quotations-table-user";
import nProgress from "nprogress";
import { paths } from "@/utils/paths.utils";
import { East } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { fDate, fDateTime12, fToNow } from "@/utils/time";
import { capitalizeFirstLetter } from "@/utils/formatters.util";
import QuotationStatusChip from "./quotation/quotation-status-chip";
import {
  QuotationStatusKeys,
  SummarizedQuotation,
} from "@/types/quotations.types";

type Props = {
  isFetching: boolean;
  visibleRows: SummarizedQuotation[];
};

const QuotationsTable = ({ isFetching, visibleRows }: Props) => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const dense = false;
  const emptyRows = 0;
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  return (
    <Card>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <TableBody>
                {visibleRows.map((row, index) => {
                  const openQuotation = () => {
                    nProgress.start();
                    router.push(
                      paths.dashboard.quotations.single(row.quotationId)
                    );
                  };

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row + "" + index}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        <QuotationTableUser
                          userName={row.userName}
                          quotationId={row.quotationId}
                          profilePic={row.profilePic}
                          openQuotation={openQuotation}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack>
                          <Typography
                            fontWeight={600}
                            variant="body2"
                            alignItems="center"
                          >
                            Client
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {row.clientName
                              ? `${row.clientName}${
                                  row.contactPerson
                                    ? ` (${row.contactPerson})`
                                    : ""
                                }`
                              : row.contactPerson || "Unknown"}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography
                          fontWeight={600}
                          variant="body2"
                          alignItems="center"
                        >
                          {row.currency} {row.grandTotal.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title={`${fDateTime12(
                            row.time
                          )} (${capitalizeFirstLetter(fToNow(row.time))})`}
                        >
                          <Stack>
                            <Typography
                              fontWeight={600}
                              variant="body2"
                              alignItems="center"
                            >
                              Issued
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {fDate(row.time)}
                            </Typography>
                          </Stack>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title={`${fDateTime12(
                            row.expiryTime
                          )} (${capitalizeFirstLetter(
                            fToNow(row.expiryTime)
                          )})`}
                        >
                          <Stack>
                            <Typography
                              fontWeight={600}
                              variant="body2"
                              alignItems="center"
                            >
                              Due
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {fDate(row.expiryTime)}
                            </Typography>
                          </Stack>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <QuotationStatusChip
                          status={
                            row.isExpired
                              ? "expired"
                              : (row.status as QuotationStatusKeys)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Open">
                          <IconButton color="primary" onClick={openQuotation}>
                            <East sx={{ width: "20px", height: "20px" }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
                {visibleRows.length < 1 &&
                  isFetching &&
                  Array.from(Array(3)).map((item, index) => (
                    <TableRow key={item + "" + index}>
                      <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                        <Typography variant="h5">
                          <Skeleton variant="rounded" />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                {visibleRows.length < 1 && !isFetching && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                      <Typography variant="body1">
                        No quotations found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Card>
  );
};

export default QuotationsTable;
