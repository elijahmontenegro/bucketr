import React, { useEffect, useState, useContext } from 'react';
import { useResource, withRouter } from 'react-resource-router';
import { gql, useQuery } from '@apollo/client';
import { GET_CURRENT_WORKSPACE, GET_WORKSPACES, ME_QUERY } from '../../graphql/queries';
import { 
  Div,
  Text,
  Button,
  Icon,
  Row,
  Col,
  Container,
  Collapse,
  Input
} from 'atomize';
import { Card, Expand, Assignee, TaskCard, DropdownMenu, DropdownItem, SideBar, DatePicker, UserSelector, ToolBar } from '../../components/common';
import { Content } from '../../components/persistent';
import { compose } from 'recompose';
import { graphql } from '@apollo/client/react/hoc';
import Store from '#store';

const AddCard = (props) => {

  return (
    <Div m={{ y: "auto", x: "0.75rem", b: "auto" }}>
      <Button 
        transition="none"
        w="12rem" 
        h="14rem"
        border="1px dashed"
        bg="black900"
        borderColor="black700"
        rounded="3px"
        m={{ t: "-2rem" }}
        p="1rem"
        bg="black900"
        hoverBg="black850"
        align="center"
        justify="center"
        prefix={
          <Icon name="Add" size="48px" color="black600" />
        }
        textSize="tiny"
        textColor="grey200"
      >
        {/* Create Task */}
      </Button>
    </Div>
  );
}

const Board = ({
  getCurrentUser, getCurrentUserResult,
  getWorkspaces, getCurrentWorkspaces
}) => {

  const workspace = getWorkspaces.workspaces;

  console.log(workspace)

  if (getCurrentUserResult?.loading) return <Text>Loading...</Text>;
  if (getCurrentUserResult?.error) return <Text>Couldn't connect to the database.</Text>;
  if (getCurrentWorkspaces?.loading) return <Text>Loading...</Text>;
  if (getCurrentWorkspaces?.error) return <Text>Couldn't connect to the database.</Text>;

  const user = getCurrentUser.me;
  

  return (
    <>
      <SideBar>
        <Div>
          <Text textSize="title" m={{ b: "1rem" }} textWeight="500">{Store.currentWorkspace()}</Text>
          <UserSelector text="Available" isOpen >
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
          </UserSelector>
          <UserSelector text="Tasked">
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
          </UserSelector>
          <UserSelector text="Not Available">
            <Assignee></Assignee>
            <Assignee></Assignee>
            <Assignee></Assignee>
          </UserSelector>
        </Div>
        <Button
          textSize="caption" 
          textWeight="500" 
          textColor="grey200"
          bg="transparent"
          m={{ t: "6rem" }}
        >
          Invite new members
        </Button>
      </SideBar>
      <Content>
          <Div>
            <Row justify="space-between" w="100%">
              <Col>
                <Text textSize="title" m={{ b: "0.5rem" }} textWeight="500" textTransform="capitalize">Welcome, {user?.displayName?.split(' ')[0]}!</Text>
                {/* <Text textSize="caption" m={{ b: "1rem" }} textWeight="500" textColor="grey400">Showing Tasks for Tuesday, November 3, 2020</Text> */}
              </Col>
            </Row>
          </Div>
          <Div
            d="flex"
            flexGrow="1"
            flexDir="row"
            bg=""
          >
            <Div bg="" w="100%">
              <ToolBar
                leftActions={
                  <>
                    <DropdownMenu text="Stream"  m={{ r: "0.5rem" }} alwaysShowText>
                      <DropdownItem>3.15.x</DropdownItem>
                      <DropdownItem>Game-Dev</DropdownItem>
                      <DropdownItem>Staging-Content</DropdownItem>
                    </DropdownMenu>
                    <DropdownMenu text="Priority" m={{ r: "0.5rem" }} alwaysShowText>
                      <DropdownItem>0</DropdownItem>
                      <DropdownItem>1</DropdownItem>
                      <DropdownItem>2</DropdownItem>
                      <DropdownItem>All</DropdownItem>
                    </DropdownMenu>
                    <Input
                      rounded="md"
                      h="2rem"
                      placeholder="Filter by name"
                      border="none"
                      p={{ x: "1rem" }}
                      m={{ r: "0.5rem" }}
                    />
                  </>
                }
                rightActions={
                  <>
                    <DropdownMenu 
                      bg="transparent" 
                      position="end" 
                      text="Sort by" 
                      m={{ l: "0.5rem" }}
                      alwaysShowText
                    >
                      <DropdownItem>Most active</DropdownItem>
                      <DropdownItem>Newest</DropdownItem>
                      <DropdownItem>Name</DropdownItem>
                    </DropdownMenu>
                  </>
                }
              />
              <Row justify="start" align="start" bg="">
                <TaskCard title="PTU Publish" version="3.15.x" />
                <TaskCard title="Editor Smoke" version="Game-Dev"/>
                <TaskCard title="Healing T0 / Actor Status T1" version="3.15.x"/>
                <TaskCard title="Must Fix Regressions"/>
                <TaskCard title="Investigate G-Loc Bar lighting issue"/>
                <TaskCard title="General Regressions"/>
                <TaskCard title="Daily Sentry Jiras"/>
                <TaskCard title="Engine Tools Regressions"/>
                {/* <AddCard /> */}
              </Row>
            </Div>
          </Div>
      </Content>
      <SideBar position="right">
        <Div>
          <Text
            textWeight="500"
            textSize="caption"
            textColor="grey200"
            textTransform="uppercase"
            m={{ b: "0.25rem"}}
          >
            DATE
          </Text>
          <DatePicker position="end" />
        </Div>
        <Div>
          <Text textSize="caption" textWeight="500" textColor="grey900">Last updated: 1 hours 23 minutes ago.</Text>
          <Text textSize="caption" textWeight="500" textColor="grey900">Created: 5 hours 23 minutes ago.</Text>
        </Div>
      </SideBar>
    </>
  );
};

export default compose(
  graphql(GET_CURRENT_WORKSPACE, { name: "getLocalState" }),
  graphql(ME_QUERY, { name: "getCurrentUser" }),
  graphql(GET_WORKSPACES, { name: "getWorkspaces" }),
  withRouter
)(Board);