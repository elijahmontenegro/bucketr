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
import { Content, HeaderLink } from '../../../components/persistent';
import { SideBar, ToolBar, DropdownMenu, DropdownItem, DynamicTable } from '../../../components/common';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../../graphql/queries';

import People from './People';
import Space from './Space';
import Workspace from './Workspace';

const YourWork = (props) => {
  const [spaceId, setSpaceId] = useState(1);

  return (
    <>
      <SideBar>
        <Div>
          <Row align="center" m={{ b: "1rem" }}>
            <Text textSize="title" textWeight="500" textColor="grey200">Admin console</Text>
            <Icon name="SettingsSolid" size="32px" color="black600" m={{ l: "auto" }} />
          </Row>
          <Button w="100%" justify="start" hoverTextColor="white"
            bg={spaceId == 0 ? "black900" : "transparent"} 
            textColor={spaceId == 0 ? "white" : "grey200"} 
            hoverBg={spaceId == 0 ? "black900" : "transparent"}
            onClick={() => setSpaceId(0)} 
          >
            Space
          </Button>
          <Button w="100%" justify="start"  hoverTextColor="white" 
            bg={spaceId == 1 ? "black900" : "transparent"} 
            textColor={spaceId == 1 ? "white" : "grey200"} 
            hoverBg={spaceId == 1 ? "black900" : "transparent"}
            onClick={() => setSpaceId(1)} 
          >
            People
          </Button>
          <Button w="100%" justify="start" hoverTextColor="white" 
            bg={spaceId == 2 ? "black900" : "transparent"} 
            textColor={spaceId == 2 ? "white" : "grey200"} 
            hoverBg={spaceId == 2 ? "black900" : "transparent"}
            onClick={() => setSpaceId(2)} 
          >
            Workspaces
          </Button>
        </Div>
      </SideBar>
      <Content hasSideBar>
        {spaceId == 0 && <Space />}
        {spaceId == 1 && <People />}
        {spaceId == 2 && <Workspace />}
      </Content>
    </>
  );
};

export default withRouter(YourWork);