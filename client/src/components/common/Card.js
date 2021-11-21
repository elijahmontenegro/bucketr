import React from 'react';
import { Div } from 'atomize';

const Card = (props) => {
  const initialProps = {
    d: "flex",
    flexDir: "column",
    // border: "1px solid",
    // borderColor: "darkalpha1",
    border: { t: "4px solid", x:"0px solid", b: "0px solid" },
    borderColor: "black500",
    w: { xs: "100%", md: "21rem", lg: "27rem" },
    maxW: "100%",
    m: { xs: "1rem", md: "0", x: "0.5rem", b: "1rem" },
    right: "0",
    top: "0",
    rounded: "4px",
    h: { lg: "28rem" },
    bg: "black900",
    shadow: "2",
    p: "2rem",
    zIndex: 0
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

export default Card;