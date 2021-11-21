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
      transition={"all 0.1s ease-in-out"}
    >
      <Div 
        border={{ b: "3px solid" }} 
        borderColor="transparent" 
        m={{ t: "-12px" }}
      />

      <div 
        style={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "auto",
          color: 'red',
          fill: 'red',
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
            d="flex"
            transition={"all 0.1s ease-in-out"}
            align="center"
            justify="center"
            textAlign="center"
            h={typeOf == "object" ? "2rem" : "2.25rem"}
            w={typeOf == "object" ? "2rem" : "auto"}
            p={typeOf == "object" ? { x: "auto" } : { x: "0.75rem" }}
            rounded={typeOf == "object" ? "circle" : "md"}
            bg={typeOf == "object" && active ? "black400" : "transparent"}
            textSize="body"
            hoverBg={typeOf !== "object" ? "black400" : "black400" || undefined}
            textColor={typeOf !== "object" && !active ? "#ccc" : "#ddd" || "black600"}
            hoverTextColor="#ddd"
            textWeight="600"
            prefix={props.prefix}
            suffix={props.suffix}
          >
            {props.children}
          </Button>
        </Link>
      </div>

      <Div
        w="calc(100% + -1.5rem)" 
        // w="50%" 
        border={{ b: "3px solid" }} 
        // rounded="circle" 
        borderColor={typeOf == "string" && active ? "rgba(75, 167, 254, 0.75)" : "transparent"}
        m={{ b: "-12px" }} 
      />
    </Div>
  );
};

export default withRouter(HeaderLink);