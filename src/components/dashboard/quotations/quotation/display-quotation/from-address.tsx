import { Stack, Typography } from "@mui/material";

const FromAddress = () => {
  return (
    <Stack flex={1} spacing={1}>
      <Typography variant="body1" fontWeight={600}>
        From
      </Typography>
      <Typography variant="body1">Edmart Systems (U) Limited</Typography>
      <Typography variant="body1">P. O. Box 33884, Kampala, Uganda</Typography>
      <Typography variant="body1">Plot 29/29A, Nkrumah Road</Typography>
      <Typography variant="body1">info@edmartsystems.com</Typography>
      <Typography variant="body1">+256 393 255022</Typography>
    </Stack>
  );
};

export default FromAddress;
