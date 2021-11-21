import React, { useEffect, useState, useContext, useRef } from 'react';
import { withRouter } from 'react-resource-router';
import { 
  Text,
  Div,
  Icon,
  Row,
  SideDrawer
} from "atomize";

import { useOnScreen } from '../../helpers';

const defaultProps = {
  position: "left",
};

const SideBar = (props) => {
  props = Object.assign({}, defaultProps, props);

  const isNavOnScreen = useOnScreen();

  const wrapperProps = {
    pos: "fixed",
    left: (
      props.position !== "right" && "0"
    ),
    right: (
      props.position == "right" && "1.5rem"
    ),
    w: props.position !== "right" ? "17rem" : "15.5rem",
    top: isNavOnScreen ? "3.25rem" : "0",
    h: isNavOnScreen ? "calc(100% - 3.25rem)" : "100%",
    d: "flex",
    p: {
      x: "2rem",
      b: "1.5rem", 
      t: isNavOnScreen ? "1.5rem" : "1rem",
    },
    flexDir: "column",
    justify: "space-between",
    ...props
  };

  return (
    <>
      <Div
        className="sideBar"
        overflow="visible scroll"
        transition="padding 0.2s ease-in-out, margin 0.2s ease-in-out,  top 0.2s ease-in-out"
        // rounded={{ xs: "0", sm: "0", md: "0", lg: "0", xl: "2rem" }}
        {...wrapperProps}
        bg={props.position !== "right" ? "rgb(30, 30, 30)" : "transparent"}
        overflow={props.position !== "right" && "auto"}
        border="none"
        shadow={props.position !== "right" && "4"}
      >
        {props.children}
      </Div>
    </>
  );
};

export default SideBar;