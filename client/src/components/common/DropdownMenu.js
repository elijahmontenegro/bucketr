import React, { useState, useRef, useEffect } from 'react';
import {
  Div,
  Button,
  Text,
  Icon
} from 'atomize';
import { Link, withRouter } from 'react-resource-router';

const defaultProps = {
  position: "auto",
  text: "Menu"
};

const Dropdown = (props) => {
  props = Object.assign({}, defaultProps, props);
  
  const ref = useRef();
  const [show, setShow] = useState(props.isOpen);
  const [textContent, setTextContent] = useState();
  const [linkContent, setLinkContent] = useState();
  const [isLinkCurrentPage, setLinkCurrentPage] = useState(props.location?.pathname === linkContent);

  useEffect(() => {
    setLinkCurrentPage(props.location?.pathname === linkContent);

    return () => {
      setLinkCurrentPage(false);
    };
  });

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (show && !ref.current?.contains(e.target)) {
        setShow(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [show])

  const handleClick = (e) => {
    e.preventDefault();

    setShow(!show);
  };

  const handleItemClick = (e) => {
    e.preventDefault();
    setTextContent(e.target.textContent);
    setLinkContent(e.target.getAttribute('href'));
    props.onClick(e.target.textContent);
  }

  const dropDownItems = new Array(props.children);
  const hasLinks= dropDownItems ? dropDownItems.some(item => item && item.some(item => item.props.href)) : false;

  const wrapperProps = {
    d: "flex",
    justify: props.position,
    m: props.m,
    // minW: "7rem",
  };

  const triggerProps = {
    d: "flex",
    transition: props.transition,
    h: !props.h ? "2rem" : props.h,
    textSize: !props.textSize && "body",
    rounded: !props.rounded ? "md" : props.rounded,
    textColor: !props.textColor && "grey200",
    bg: !props.bg ? "black900" : props.bg,
    hoverBg: !props.hoverBg && hasLinks ? "black400" : "black700", 
    p: { r: "0.25rem", l: "0.75rem" },
    // border: !props.border && "1px solid",
    // borderColor: !props.borderColor && "transparent",
    // hoverBorderColor: !props.hoverBorderColor && "black600" 
    prefix: props.prefix,
  };

  const menuProps = {
    pos: "absolute",
    bg: "black700",
    zIndex: 10,
    // rounded: !props.rounded ? `calc(${triggerProps.h} / 2)` : props.rounded,
    rounded: !props.rounded ? `md` : props.rounded,
    m: { t: `calc(${triggerProps.h} + ${props.menuOffsetY || "0.25rem"})` },
    shadow: "3",
    border: "1px solid",
    borderColor: "black600",
    overflow: "hidden",
    minW: "14rem",
    p: { y: "0.5rem" }
  };

  return (
    <>
      {hasLinks && 
        <Div d="flex" flexDir="column" justify="center" align="center">
          <Div w="calc(100% + -1.5rem)" border={{ b: "3px solid" }} borderColor="transparent" m={{ t: "-13px" }} />
        </Div>
      } 

      <Div 
        {...wrapperProps}
        ref={ref}
      >
        <Button
          {...triggerProps}
          onClick={handleClick}
          bg={show ? "black700" : triggerProps.bg}
          // borderColor={show ? "black600" : "transparent"}
          w="100%"
          d="flex"
          flexDir="row"
          justify="space-between"
          textColor={!isLinkCurrentPage ? "#ccc" : "#ddd" || "black600"}
          textWeight="600"
          hoverTextColor="#ddd"
          suffix={
            <Icon name={show ? "UpArrow" : "DownArrow"} size="20px" color="grey200" m={{ l: "0.125rem" }}/>
          }
          children={props.alwaysShowText ? (textContent ? `${props.text}: ${textContent}` : props.text) : hasLinks ? props.text : textContent || props.text}
        />

        {show && (
          <Div 
            {...menuProps}
            onClick={handleClick}
          >
            {dropDownItems.map((item, index) => (
              <Div key={index} onClick={handleItemClick}>
                {item}
              </Div>
            ))}
          </Div>
        )}
      </Div>

      {hasLinks && 
      <Div d="flex" flexDir="column" justify="center" align="center">
        <Div w="calc(100% + -1.5rem)" border={{ b: "3px solid" }} borderColor={isLinkCurrentPage ? "rgba(75, 167, 254, 0.75)" : "transparent"} m={{ b: "-13px" }} />
      </Div>
      } 
    </>
  );
};

export const DropdownItem = (props) => {

  const Container = () => (
    <Div
      transition="none"
      p={{ x: "1rem", y: "0.5rem", r: "2rem" }}
      textSize="body"
      textColor="grey200"
      hoverBg="black500"
      onClick={props.onClick}
      cursor="pointer"
      minH="2.5rem"
      d="flex"
      align="center"
      justify="start"
      {...props}
    >
      {props.children}
    </Div>
  );

  return props.href ? (
    <>
      <Link to={props.href}>
        <Container />
      </Link>
    </>
  ) : <Container />
};

export default withRouter(Dropdown);
