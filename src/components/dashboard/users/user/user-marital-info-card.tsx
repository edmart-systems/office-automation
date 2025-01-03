"use client";

import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { UsersThree } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import UserInfoCardItem from "./user-info-card-item";

const MyCardContent = styled(CardContent)({
  paddingTop: "5px",
  paddingBottom: "5px",
});

const UserMaritalInfoCard = () => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar>
            <UsersThree size={28} />
          </Avatar>
          <Typography variant="h6">Marital Details</Typography>
        </Stack>
      </CardContent>
      <MyCardContent>
        <UserInfoCardItem title="Marital Status" content="Not Available" />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem title="Number Of Wives" content="Not Available" />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem
          title="Number Of Dependents"
          content="Not Available"
        />
      </MyCardContent>
      <Divider />
      <MyCardContent>&ensp; &ensp;</MyCardContent>
      <Divider />
      <MyCardContent>&ensp; &ensp;</MyCardContent>
      <Divider />
      <MyCardContent>&ensp; &ensp;</MyCardContent>
      <Divider />
      <MyCardContent>&ensp; &ensp;</MyCardContent>
    </Card>
  );
};

export default UserMaritalInfoCard;
