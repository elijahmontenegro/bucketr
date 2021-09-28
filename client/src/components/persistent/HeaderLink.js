import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-resource-router';
import { Button, Div } from 'atomize';

const HeaderLink = (props) => {
  const [active, setActive] = useState(props.location.pathname === props.to);

  const typeOf = typeof props.children;

  useEffect(() => {
    setActive(props.location.pathname === props.to);

    return () => {
      setActive(false);
    };
  });

  // return (
  //   <>
  //     <Link 
  //       style={{
  //         display: "flex",
  //         height: "100%",
  //         marginRight: "2.5rem",
  //         color: 'white', 
  //         fontWeight: '500',
  //         alignItems: "center",
  //         textAlign: "center",
  //         justifyContent: "center",
  //         borderTop: active ? "4px solid transparent" : "none",
  //         borderBottom: active ? "4px solid rgba(0, 0, 0, 0.25)" : "none",
  //       }}
  //       to={props.to}
  //     >
  //       {props.children}
  //     </Link>
  //   </>
  // );

  return (
    <Div
      d="flex"
      w="auto" 
      h="100%"
      justify="space-between"
      align="center" 
      textAlign="center"
      flexDir="column"
      m={props.m}
    >
      <Div 
        border={{ b: "4px solid" }} 
        borderColor="transparent" 
        // m={{ t: "-4px" }}
      />

      <div 
        style={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "auto",
          color: 'white',
          fontWeight: '500',
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Link to={props.to}>
          <Button
            transition={(typeOf == "object" && active) ? "all 180ms cubic-bezier(0.79, 0.33, 0.14, 0.53)" : "none"}
            align="center"
            justify="center"
            textAlign="center"
            h={typeOf == "object" ? "1.75rem" : "1.75rem"}
            w={typeOf == "object" ? "1.75rem" : "auto"}
            p={typeOf == "object" ? { x: "auto" } : { x: "1rem" }}
            hoverBg={(typeOf !== "object" || !active) && "black600"}
            rounded="circle"
            bg={typeOf == "object" && active ? "black500" : "transparent"}
            textSize="body"
          >
            {props.children}
          </Button>
        </Link>
      </div>

      <Div
        transition="all 180ms cubic-bezier(0.79, 0.33, 0.14, 0.53)"
        w="calc(100% - 2rem)" 
        border={{ b: "4px solid" }} 
        rounded="circle" 
        borderColor={typeOf == "string" && active ? "black500" : "transparent"} 
        // m={{ b: "-4px" }} 
      />
    </Div>
  );
};

export default withRouter(HeaderLink);