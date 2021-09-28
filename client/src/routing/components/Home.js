import React, { useEffect, useState, useContext } from 'react';
import { useResource, withRouter } from 'react-resource-router';
import { gql, useQuery } from '@apollo/client';
import { ME_QUERY } from '../../services/graphql/queries';
import { 
  Div,
  Text,
  Button,
  Icon
} from 'atomize';

const Home = (props) => {
  const { loading, error, data } = useQuery(ME_QUERY);
  

  if (loading) return null;
  if (error) return <Text>Error</Text>;

  const user = data.me;

  return (
    <>
    <Div
        m={{ x: "1rem" }}
        p={{ y: "4rem" }}
        d="flex"
        align="center"
        justify="center"
        flexDir="column"
      >
        <Text textSize="heading">Welcome to Beacon, {user.displayName.split(' ')[0]}!</Text>
      </Div>
    </>
  );
};

export default withRouter(Home);