import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-resource-router';
import { 
  Text,
  Div,
  Icon,
  Row,
  SideDrawer
} from "atomize";
import { Content } from '../../components/persistent';
import { SideBar } from '../../components/common';

const YourWork = (props) => {

  return (
    <>
      <SideBar>
        <Text textSize="title">This is the SideBar.</Text>
      </SideBar>
      <Content hasSideBar>
        <Text textSize="title">Your Work</Text>
      </Content>
    </>
  );
};

export default withRouter(YourWork);