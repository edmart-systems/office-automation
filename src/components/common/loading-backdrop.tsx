import React, { Dispatch, SetStateAction } from "react";
import Backdrop from "@mui/material/Backdrop";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const LoadingBackdrop = ({ open, setOpen }: Props) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={() => false}
    >
      <Image
        alt="Under development"
        src="/assets/Animation.gif"
        width={150}
        height={35}
      />
    </Backdrop>
  );
};

export default LoadingBackdrop;
