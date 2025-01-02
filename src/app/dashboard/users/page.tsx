import UsersTable from "@/components/dashboard/users/users-table";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users | Office X",
  description: "Office Automation System",
};

const UsersPage = () => {
  return (
    <Stack spacing={3}>
      <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
        <Typography variant="h4">Users</Typography>
      </Stack>
      <Suspense fallback={<CircularProgress color="primary" size="30px" />}>
        <UsersTable />
      </Suspense>
    </Stack>
  );
};

export default UsersPage;
