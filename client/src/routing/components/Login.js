import React, { useEffect, useState, useContext } from 'react';
// import { profileResource } from '../resources';
import { useResource, Link, withRouter } from 'react-resource-router';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button, Container, Row, Col, Div, Text, Input, Icon } from 'atomize';
import { AtlassianIcon } from '@atlaskit/logo';
import { Field, Card } from '../../components/common';
import { useForm } from 'react-hook-form';
import { LOGIN_MUTATION } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { Content } from '../../components/persistent';
import { IS_LOGGED_IN } from '../../graphql/queries';
import Store from '#store';

const Login = (props) => {
  const [submitError, setSubmitError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState: { errors }, handleSubmit, getValues, watch } = useForm();
  const [loginUser, { loading }] = useMutation(LOGIN_MUTATION, {
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length > 0) {
        setSubmitError(graphQLErrors[0].message);
        console.log('poopError: ', graphQLErrors[0].message);
      }
    },
    onCompleted: (data) => {
      Store.isLoggedIn(true);
      props.history.push('/');
    }
  });

  const onSubmit = (data) => {
    return loginUser({ variables: data });
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <Content>
      <Div
        m={{ x: "1rem" }}
        d="flex"
        align="center"
        justify="start"
        flexDir="column"
        h="100%"
        bg=""
      >
        <Card h="auto" rounded="xl" border="none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Div flexGrow="1">
              <Text
                textAlign="center"
                textSize="heading"
                m={{ t: "0.5rem", b: "0.5rem" }}
                textWeight="500"
                // fontFamily="secondary"
              >
                Log in to Beacon
              </Text>
              <Text
                textColor="light"
                textSize="caption"
                m={{ b: "4rem" }}
                textAlign="center"
              >
                Don't have an account yet? <Link to="/account/signup">Create New</Link>
              </Text>
              <Field
                autoComplete="username"
                type="email"
                {...register("email", { 
                  required: true
                })}
                placeholder="Email"
                borderColor={errors.email && "danger800"}
                suffix={
                  <Icon
                    pos="absolute"
                    name="Email"
                    color="light"
                    size="18px"
                    top="50%"
                    transform="translateY(-50%)"
                    right="1rem"
                  />
                }
              >
                {errors.email?.type == "required" && 
                  <Text textColor="danger800" textSize="caption">
                    Please enter your email.
                  </Text>
                }
              </Field>
              <Field
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                {...register("password", { 
                  required: true
                })}
                placeholder="Password"
                borderColor={errors.password && "danger800"}
                suffix={
                  <Button
                    pos="absolute"
                    onClick={handleShowPassword}
                    bg="transparent"
                    top="0"
                    right="0"
                    rounded={{ r: "circle" }}
                    top="50%"
                    transform="translateY(-50%)"
                  >
                    <Icon
                      name={showPassword ? "EyeSolid" : "Eye"}
                      color="light"
                      size="18px"
                    />
                  </Button>
                }
              >
                {errors.password?.type == "required" && 
                  <Text textColor="danger800" textSize="caption">
                    Please enter your password.
                  </Text>
                }
              </Field>
            </Div>
            <Button
              type="submit"
              w="100%"
              rounded="circle"
              h="3rem"
              m={{ t: "3rem" }}
              bg="info200"
              hoverBg="info300"
              textColor="dark"
              disabled={loading}
            >
              Log in
            </Button>
            {submitError && 
              <Text textColor="danger800" textSize="caption" textAlign="center" m={{ t: "1rem" }}>
                {submitError}
              </Text>
            }
          </form>
        </Card>
        <Card h="auto" $flattened={true}>
          {/* <Div flexGrow="1" border={{ b: "2px solid" }} rounded="circle" borderColor="black700" m={{ x: "0rem", b: "3rem" }} d={{ xs: "none", md: "block"}}/> */}
          <Text textAlign="center" textSize="caption">
            <Link to="/account/forgot-password">
              Forgot Password?
            </Link>
          </Text>
        </Card>
      </Div>
    </Content>
  )
};

export default withRouter(Login);
