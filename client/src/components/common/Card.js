import React from 'react';
import { Div } from 'atomize';

export const Card = (props) => {
  const initialProps = {
    d: "flex",
    flexDir: "column",
    // border: "1px solid",
    // borderColor: "black700",
    border: { t: "4px solid" },
    borderColor: "black700",
    w: { xs: "100%", md: "21rem", lg: "27rem" },
    maxW: "100%",
    m: { xs: "1rem", md: "0", x: "1rem", b: "1rem" },
    right: "0",
    top: "0",
    rounded: "md",
    h: { lg: "28rem" },
    bg: "black800",
    shadow: "1",
    p: "2rem"
  };

  const flatProps = {
    ...initialProps,
    bg: !!props.$flattened && "none",
    shadow: !!props.$flattened && "0",
    border: !!props.$flattened && "none",
  };

  return (
    <Div
      {...(!!props.$flattened ? flatProps : initialProps)}
      {...props}
    />
  );
};
