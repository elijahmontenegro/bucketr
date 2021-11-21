import React from 'react';
import { Div, Container  } from 'atomize';

export const Layout = (props) => {

  return (
    <Div
      d="flex"
      tag="main"
      m={{ l: "auto", r: "auto" }}
      w="100%"
      h="100%"
      flexDir="column"
      // justify="center"
      // align="center"
      // m={{ x: "4rem" }}

    >
      {props.children}
    </Div>
  );
};