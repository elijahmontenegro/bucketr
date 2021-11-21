import React, { useEffect, useState, useContext } from 'react';
import { Router, useResource, Link, withRouter, Redirect } from 'react-resource-router';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { Button, Container, Row, Col, Div, Text, Input, Icon } from 'atomize';
import { Field, Card } from '../../components/common';
import { ME_QUERY } from '../../graphql/queries';
import { LOGOUT_MUTATION } from '../../graphql/mutations';
import { AtlassianIcon } from '@atlaskit/logo';
import { Content } from '../../components/persistent';
import Store from '#store';

const Profile = (props) => {
  const client = useApolloClient();
  const { loading, error, data } = useQuery(ME_QUERY);

  const [logoutUser] = useMutation(LOGOUT_MUTATION, {
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length > 0) {
        console.log('poopError: ', graphQLErrors[0].message);
      }
    },
    onCompleted: () => {
      Store.isLoggedIn(false);
      // client.resetStore();
      props.history.push('/account/login');
    }
  });


  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  const user = data.me;

  return (
    <Content>
      <Div
        m={{ x: "1rem" }}
        d="flex"
        align="stretch"
        justify="center"
        flexDir="column"
      >
        <Container>
          <Row>
            <Col size={{ xs: "100%", lg: 5 }}>
              <Card w="auto" h="auto">
                <Div d="flex" flexDir="column" align="start">
                  <Text textSize="subheader" textWeight="600" textTransform="capitalize">
                    {user.displayName}
                  </Text>
                  <Div d="flex" flexDir="row" align="center"  m={{ t: "1rem" }} >
                    <Icon name="Email" color="white" size="18px" m={{ r: "0.75rem" }}  />
                    <Text textWeight="600" justify="center">
                      {user.email}
                    </Text>
                  </Div>
                </Div>
                <Div flexGrow="1" border={{ b: "2px solid" }} rounded="circle" borderColor="black600" m={{ x: "0rem", y: "2rem" }} d={{ xs: "none", md: "block"}}/>
                <Row justify="space-between">
                  <Row>
                    <Button 
                      bg="black700" 
                      m={{ r: "0.5rem" }}
                      prefix={
                        <Icon name="Bulk" color="white" size="18px" m={{ r: "0.75rem" }} />
                      }
                    >
                      Browse
                    </Button>
                    <Button 
                      bg="black700"
                      // prefix={
                      //   <Icon name="NotificationSolid" color="white" size="18px" m={{ r: "0.75rem" }} />
                      // }
                    >
                      Admin Console
                    </Button>
                  </Row>
                  <Row>
                    <Button
                      onClick={logoutUser}
                      m={{ l: "0.5rem" }}
                        // bg="black700"
                      prefix={
                        <Icon name="Logout" color="white" size="18px" m={{ r: "0.75rem" }} />
                      }
                    >
                      Logout
                    </Button>
                  </Row>
                </Row>
              </Card>
              <Div h="auto" w="auto" m={{x: "1rem", t: "2rem" }}>
                <Text textSize="subheader" textWeight="600" textTransform="capitalize">
                  Connected Accounts
                </Text>
                <Card h="32px" w="auto" m={{ t: "1rem"}} justify="space-between" align="center" flexDir="row">
                  <Row align="center">
                    <Div m={{ r: "0.75rem", b: "-6px" }}>
                      <AtlassianIcon />
                    </Div>
                    <Text textSize="paragraph" textWeight="600">
                      Atlassian
                    </Text>
                  </Row>
                  <Button>
                    Connect
                  </Button>
                </Card>
              </Div>
            </Col>
            <Col size={{ xs: "100%", lg: 7 }}>
              <Div h="auto" w="auto" p={{x: "1rem", t: { xs: "2rem", sm: "2rem", lg: 0 }}}>
                <Text textSize="subheader" textWeight="600" textTransform="capitalize">
                  Your tasks
                </Text>
                <Card h="32px" w="auto" m={{ t: "1rem"}} justify="space-between" align="center" flexDir="row">
                  <Row align="center">
                    <Text textSize="subheader" textWeight="600">
                      Live Must Fix 
                    </Text>
                  </Row>
                  <Button bg="black600">
                    Link
                  </Button>
                </Card> 
              </Div>
            </Col>
          </Row>
        </Container>
      </Div>
    </Content>
  )
};

export default withRouter(Profile);