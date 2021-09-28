import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-resource-router';
import { Card } from '../../components/common';
import { 
  Text,
  Div,
  Icon,
  Row
} from "atomize";

const Unknown = (props) => {

  return (
    <Div 
      d="flex" 
      h="100%" 
      w="auto" 
      justify="center" 
      align="start" 
      m={{ x: "1rem" }}
      p={{ y: "3rem" }}
    >
      <Card h="auto" borderColor="warning800">
        <Row m={{ b: "1rem" }} align="flex-end">
          <Icon name="AlertSolid" size="40px" color="warning800" m={{ r: ".75rem"}} />
          <Text 
            textSize="subheader" 
            textWeight="500"
          >
            This Page Doesn’t Exist
          </Text>
        </Row>
         
        <Text textAlign="center">
          Please check with an administrator to see that you have the right permissions to access the resource you requested.
        </Text>

        {/* <Text textWeight="700" m={{ t: "1rem" }}>
          Code: 1XFw2k3
        </Text> */}
      </Card>
    </Div>
  );
};

export default withRouter(Unknown);