import React, { forwardRef } from 'react';
import { Div, Input } from 'atomize';

export const Field = forwardRef((props, ref) => {
  const hasError = Array.isArray(props.children) ? !props.children.every(item => item == false) : !props.children == false;

  return (
    <Div
      m={{ b: hasError ? "0.5rem" : "1rem" }}
    >
      <Input
        ref={ref}
        p={{ l: "1rem", r: "2.5rem" }}
        rounded="circle"
        focusBorderColor="info800"
        border="0px solid"
        {...props}
      />
      {hasError && 
        <Div p={{ l: "1rem", t: "0.25rem" }}>
          {props.children}
        </Div>
      }
    </Div>
  );
});