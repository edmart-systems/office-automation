import UsersTable from "@/components/dashboard/users/users-table";
import { Stack, Typography } from "@mui/material";
import { Metadata } from "next";

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
      <UsersTable />
    </Stack>
  );
};

export default UsersPage;
