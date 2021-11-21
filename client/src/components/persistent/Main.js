import React from 'react';
import { Div } from 'atomize';

export const Main = (props) => {

  return (
    <Div
      d="flex"
      flexGrow="100%"
      flexDir="row"
      justify="center"
      // bg="rgba(255,255,0, 0.2)"
      // bg="red"
    >
      {props.children}
    </Div>
  );
};