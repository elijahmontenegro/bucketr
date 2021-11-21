import React, { useEffect, useState } from 'react';
import {
  Button,
  Div,
  Icon,
  Text,
  Row
} from 'atomize';

const Expand = (props) => {
  const {
    isOpen,
    text,
    children
  } = props;

  const items = typeof children == "array" ? children : children ? [children] : [];
  const [touched, setTouched] = useState(false);
  const [openByDefault, setOpenByDefault] = useState(isOpen);
  const [open, setOpen] = useState(openByDefault);
  const [itemIndex, setItemIndex] = useState(0);
  const numItems = items.length;

  useEffect(() => {
    let timeout;

    if (open && itemIndex < numItems) {
      timeout = setTimeout(() => setItemIndex(itemIndex + 1), 30);
    }

    if (!open && itemIndex > -5) {
      timeout = setTimeout(() => setItemIndex(itemIndex - 1), 35);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [itemIndex, items, open]);


  const handleExpand = (e) => {
    e.preventDefault();
    !touched && setTouched(true);
    openByDefault && setOpenByDefault(false);
    !open && setItemIndex(0);
    setOpen(!open);
  }

  const drawItems = (openByDefault && open ? items : (
    !touched ? [] : (
      open 
      ? items.filter((item, index) => index < itemIndex) 
      : items.slice(0).filter((item, index) => index + -5 < itemIndex)
    )
  ));

  return (
    <Div
      d="flex"
      flexDir="column"
      className="expandWrapper"
      transition
      w="100%"
      bg=""
      m={{ b: "1rem" }}
      align="start"
      justify="start"
      // minH="2rem"
    >
      <Button
        transition="none"
        p={{ x: "0rem", ...props.m }}
        align="center"
        justify="start"
        h="2rem"
        w="100%"
        onClick={handleExpand}
        bg="transparent"
        prefix={
          <Icon name={open ? "DownArrow" : "RightArrow"} size="16px" color="grey200" m={{ r: "calc(1rem / 3)" }} />
        }
        textSize="body" 
        textColor="grey200"
      >
        {text || "Expand"}
        {/* {itemIndex} */}
        {numItems !== 0 && 
          <Div
            bg="" 
            d="flex" 
            flexDir="column" 
            textAlign="center" 
            align="center" 
            justify="start" 
            // h="100%" 
            border="none" 
            borderColor="none" 
            m={{ l: "0.25rem" }} 
            rounded="circle" 
            textSize="body" 
            textWeight="700"
            textColor="grey700"
            children={`(${numItems})`} 
          />
        }
      </Button>
      <Div 
        className="expandItems" 
        bg=""
        w="100%"
      >
        {numItems !== 0 && drawItems.map((item, index) => (
          <Div
            key={index}
            m={{ t: index == 0 ? "0.25rem" : index !== numItems + 1 && "0.25rem" }}
          >
            <ExpandItem 
              className={`expandItem ${(!touched && open) && "init"} ${open ? "expanded" : index + 4 >= itemIndex && "collapse"}`} 
              children={item}
              zIndex={numItems - index}
            />
          </Div>
        ))}
      </Div>
    </Div>
  );
};

const ExpandItem = (props) => {

  return (
    <Div
      {...props}
      transition="none"
      d="flex"
      align="center"
    /> 
  );
};

export default Expand;