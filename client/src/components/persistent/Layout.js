import React from 'react';
import { Div, Container  } from 'atomize';

export const Layout = (props) => {

  return (
    <Div
      tag="main"
      m={{ l: "auto", r: "auto" }}
      w="100%"
      maxW="90rem"
    >
      {props.children}
    </Div>
  );
};