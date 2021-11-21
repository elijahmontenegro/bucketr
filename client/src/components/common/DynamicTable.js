import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Div,
  Icon,
  Text,
  Row,
  Container,
  Col
} from 'atomize';


const DynamicTable = (props) => {
  const [focusedIndex, setFocusedIndex] = useState();
  const focusedRef = useRef();
  const actionRef = useRef();

  const handleBlur = (e) => {
    e.preventDefault();
    if (e.currentTarget.contains(e.relatedTarget)) {
      e.currentTarget.focus();
      focusedRef?.current?.focus();
      return;
    }
    !props.isModalOpen && setFocusedIndex(null);
  };

  useEffect(() => {
    !props.isModalOpen && setFocusedIndex(null);
  }, [props.isModalOpen]);

  return (
    <>
      <Div m={{ x: "-0.5rem" }}>
        <Container maxW="100%" bg="" rounded="md" p="1rem">
          <Div d="flex" flexDir="row" justify="space-between" align="center" m={{ b: "0.5rem" }}>
            <Text textSize="subheader" textColor="grey200">{props.caption || "Untitled Table"}</Text>
            <Text textSize="caption" textColor="grey900">Showing {props.rows?.length || 0} items</Text>
          </Div>
          <Row>
            {props.head.map((item, index) => (
              <Col key={index} textWeight="500" textColor="grey900" textSize="caption">
                {item}
              </Col>
            ))}
            <Col />
          </Row>
          <Div m={{ y: "0.25rem", x: "-0.5rem" }} border={{ b: "1px solid" }} borderColor="black900" rounded="circle" />
          {props.rows && props.rows.map((item, index) => (
            <Row 
              key={index} 
              h="2.5rem" 
              align="center" 
              hoverTextColor="white" 
              rounded="md" 
              tabIndex={index + 1} 
              className="dynamicTable-row" 
              onBlur={handleBlur} 
              onFocus={() => setFocusedIndex(index)}
              bg={focusedIndex == index && "rgba(75, 167, 254, 0.1)"}
              hoverBg={focusedIndex !== index && "black900"}
              textColor={focusedIndex !== index ? "grey200" : "white"}
              ref={focusedIndex == index ? focusedRef : undefined}
              border="1px solid"
              borderColor={focusedIndex == index ? "rgba(75, 167, 254, 0.75)" : "transparent"}
            >
              {Object.values(item).map((cell, index) => (
                cell !== item.id && (
                  <Col key={index} children={cell} overflow="hidden" />
                )
              ))}
              
              <Col>
                <Div d="flex" flexDir="row" justify="end" align="center">
                  {index == focusedIndex && props.actions.map((actionProps, index) => (
                    <Button key={index} ref={actionRef} {...actionProps} children={actionProps.text} m={{ l: "0.5rem" }} h="1.75rem" onClick={() => actionProps.onClick(item)} />
                  ))}
                </Div>
              </Col>
            </Row>
          ))}
        </Container>
      </Div>
    </>
  );
};

export default DynamicTable;