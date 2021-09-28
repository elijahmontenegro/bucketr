import React from 'react';
import { Div } from 'atomize';

export const Content = (props) => {

  return (
    <Div
      flexGrow="1"
    >
      {props.children}
    </Div>
  );
};