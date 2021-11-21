import React, { useEffect, useState } from 'react';
import {
  Button,
  Div,
  Icon,
  Text,
  Row,
  Container
} from 'atomize';


const UserSelector = (props) => {
  const {
    isOpen,
    text,
    children
  } = props;

  const items = Array.isArray(children) ? children : children ? [children] : [];
  const [touched, setTouched] = useState(false);
  const [openByDefault, setOpenByDefault] = useState(isOpen);
  const [open, setOpen] = useState(openByDefault);
  const [itemIndex, setItemIndex] = useState(0);
  const numItems = items.length;
  const numRow = 4;
  const rowOddOffset = 8;

  useEffect(() => {
    let timeout;

    if (open && itemIndex < numItems) {
      timeout = setTimeout(() => setItemIndex(itemIndex + 1), Math.min(30, 150 / numItems));
    }

    if (!open && itemIndex > -(numRow*2)) {
      timeout = setTimeout(() => setItemIndex(itemIndex - 1), Math.min(15, 150 / numItems));
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
      : items.slice(0).filter((item, index) => index + -(numRow*2) < itemIndex)
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
      </Button>
      <Container 
        w="100%"
        p="none"
      >
        <Row 
          className="expandItems" 
          w="100%"
          m="none"
          bg=""
          flexDir="row"
          justify="start"
          minW="208px"
        >
          {numItems !== 0 && drawItems.map((item, index) => (
            <Div
              key={index}
              // bg={(!(0 == (index % numRow) - (numRow-1)) && (numItems - index > numItems % numRow)) && "red"}
              m={{
                r: (!(0 == (index % numRow) - (numRow-1)) && (numItems - index > numItems % numRow)) ? "auto" : !(numItems - index > numItems % numRow) && `calc(${rowOddOffset}px)`,
                y: "4px"
              }}
            >
              <ExpandItems 
                className={`expandItem ${(!touched && open) && "init"} ${open ? "expanded" : (numItems/4 - index >= itemIndex || index + numItems/1.5>= itemIndex) && "collapse2"}`} 
                children={item}
                zIndex={index}
              />
            </Div>
          ))}
        </Row>
      </Container>
    </Div>
  );
};

const ExpandItems = (props) => {

  return (
    <Div
      {...props}
      transition="none"
      d="flex"
      align="center"
    /> 
  );
};

export default UserSelector;