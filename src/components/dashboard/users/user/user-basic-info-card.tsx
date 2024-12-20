"use client";

import { FullUser } from "@/types/user.types";
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { User } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import UserInfoCardItem from "./user-info-card-item";
import {
  capitalizeFirstLetter,
  formatDisplayedPhoneNumber,
  userNameFormatter,
} from "@/utils/formatters.util";
import UserStatusChip from "./user-status-chip";
import VerifiedChip from "./verified-chip";
import { toast } from "react-toastify";
import { fDateTime12, fToNow } from "@/utils/time";

type Props = {
  user: FullUser;
};

const MyCardContent = styled(CardContent)({
  paddingTop: "5px",
  paddingBottom: "5px",
});

const UserBasicInfoCard = ({ user }: Props) => {
  const openNinHandler = () => {
    toast("Card not provided", {
      type: "info",
    });
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar>
            <User size={28} />
          </Avatar>
          <Typography variant="h6">Basic Details</Typography>
        </Stack>
      </CardContent>
      <MyCardContent>
        <UserInfoCardItem title="User Id" content={user.co_user_id} />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem
          title="Name"
          content={userNameFormatter(
            user.firstName,
            user.lastName,
            user.otherName
          )}
        />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem
          title="NIN"
          content={
            <Typography
              variant="body1"
              fontWeight={600}
              letterSpacing={1}
              display="flex"
              alignItems="center"
            >
              {"Not Available"}&ensp;
              <Chip
                variant="outlined"
                label="Open"
                size="small"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={openNinHandler}
              />
            </Typography>
          }
        />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem title="Date Of Birth" content={"Not Available"} />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem
          title="Role"
          content={capitalizeFirstLetter(user.role.role)}
        />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem
          title="Email"
          content={
            <Typography
              variant="body1"
              fontWeight={600}
              letterSpacing={1}
              display="flex"
              alignItems="center"
            >
              {user.email}&ensp;
              <VerifiedChip isVerified={user.email_verified === 1} />
            </Typography>
          }
        />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem
          title="Phone"
          content={
            <Typography
              variant="body1"
              fontWeight={600}
              letterSpacing={1}
              display="flex"
              alignItems="center"
            >
              {formatDisplayedPhoneNumber(user.phone_number)}&ensp;
              <VerifiedChip isVerified={user.phone_verified === 1} />
            </Typography>
          }
        />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem
          title="Account Status"
          content={<UserStatusChip status={user.status} />}
        />
      </MyCardContent>
      <Divider />
      <MyCardContent>
        <UserInfoCardItem
          title="Created At"
          content={
            <Typography
              variant="body1"
              fontWeight={600}
              letterSpacing={1}
              display="flex"
              alignItems="center"
            >
              {fDateTime12(user.created_at)}&ensp;
              <Chip
                variant="outlined"
                label={capitalizeFirstLetter(fToNow(user.created_at))}
                size="small"
                color="default"
                sx={{ cursor: "pointer" }}
              />
            </Typography>
          }
        />
      </MyCardContent>
    </Card>
  );
};

export default UserBasicInfoCard;
