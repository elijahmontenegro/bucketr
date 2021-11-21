import React from 'react';
import { Div } from 'atomize';

export const Content = (props) => {

  return (
    <Div
      d="flex"
      flexGrow="1"
      m={{ x: "auto" }}
      justify="center"
      align="start"
      w="100%"
      h="100%"
      // maxW="90rem"
    >
      <Div
        className="layoutContent"
        d="flex"
        flexDir="column"
        m={{ x: { xs: "14rem", sm: "14rem", md: "14rem", lg: "14rem", xl: "16.5rem"} }}
        p={{ x: "2.5rem", t: "1.5rem", b: "25vh"}}
        w="calc(100% - 40rem)"
        h="100%"
        maxW="90rem"
        // bg="purple"
      >
        {props.children}
      </Div>
    </Div>
  );
};