"use client";

import { Box, Button } from "@mui/material";
import { Signature } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import SignatureDialog from "./signature-dialog";

const UserSignatureButton = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <Button
        variant="outlined"
        endIcon={<Signature />}
        onClick={() => setOpen(true)}
      >
        Your Signature
      </Button>
      {open && (
        <SignatureDialog
          open={open}
          setOpen={setOpen}
          src={
            // "https://signaturely.com/wp-content/uploads/2020/04/with-underline-signaturely.svg"
            null
          }
        />
      )}
    </Box>
  );
};

export default UserSignatureButton;
