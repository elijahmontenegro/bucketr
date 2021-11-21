import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-resource-router';
import { 
  Text,
  Div,
  Icon,
  Row,
  SideDrawer,
  Button,
  Input,
  Tag
} from "atomize";

const Space = (props) => {
  return (
    <>
      <Text textSize="title" m={{ b: "1rem" }}>Space Settings</Text>
      <Div w="30rem">
        <Text textSize="caption" textColor="grey200" textWeight="500" m={{ y: "0.5rem" }}>Space Name</Text>
        <Input placeholder="spacename.beacon.com" />
        <Text textSize="caption" textColor="grey200" textWeight="500" m={{ y: "0.5rem", t: "1rem" }}>Space Logo</Text>
        <Input placeholder="" />
        <Button m={{ t: "2rem" }}>Submit</Button>
      </Div>
    </>
  );
};

export default Space;