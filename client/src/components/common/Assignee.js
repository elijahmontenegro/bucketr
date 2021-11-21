import React from 'react';
import { Div, Icon, Text, Button } from 'atomize';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const generateInitials = () => (
  alphabet[Math.floor(Math.random() * alphabet.length)] + 
  alphabet[Math.floor(Math.random() * alphabet.length)]
);

const Assignee = (props) => {
  return (
    <>
      <Button
        className="assigneeButton"
        transition="all 0.1s ease-in-out"
        d="flex" 
        className="assignee"
        w="2.875rem"
        h="4rem"
        flexDir="column" 
        align="center"
        justify="space-between"
        // rounded="circle"
        textAlign="center"
        // prefix={
        //   <Icon name="UserSolid" size="18px" color="grey200" />
        // }
        textSize="tiny" 
        textWeight="500" 
        textColor="grey200"
        bg="black900"
        // border="1px solid"
        // borderColor="black600"
        hoverTextColor="grey100"
        hoverBg="black700"
        // m={{ l: "-2rem" }}
        // bg="transparent"
        borderColor="transparent"
        // p="none"
        // m={{ r: "0.125rem", b: "0.25rem" }}
        shadow="2"
        hoverShadow="3"
      >
        <Icon name="UserCircle" size="8px" color="transparent" />
        {props.children ? props.children : generateInitials()}
      </Button>
    </>
  );
};

export default Assignee;

//TODO: Make user picker from expand show users in a row and columns like video game selector