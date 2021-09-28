import React, { useEffect, useState, useContext } from 'react';
// import { profileResource } from '../resources';
import { Router, useResource, Link, withRouter } from 'react-resource-router';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button, Container, Row, Col, Div, Text, Input, Icon } from 'atomize';
import { AtlassianIcon } from '@atlaskit/logo';
import { useForm } from 'react-hook-form';
import { Field, Card } from '../../components/common';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../../services/graphql/mutations';

export const Signup = (props) => {
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState: { errors }, handleSubmit, getValues, watch } = useForm();

  const [signupUser, { loading }] = useMutation(SIGNUP_MUTATION, {
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length > 0) {
        setError(graphQLErrors[0].message);
        console.log('poopError: ', graphQLErrors[0].message);
      }
    },
    onCompleted: data => {
      props.history.push('/account/login');
    }
  });

  const onSubmit = (data) => {
    return signupUser({ variables: { data } });
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Div
        m={{ x: "1rem" }}
        p={{ y: "3rem" }}
        d="flex"
        align="center"
        justify="center"
        flexDir="column"
      >
        <Card h="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Div flexGrow="1">
              <Text
                textAlign="center"
                textSize="title"
                m={{ t: "0.5rem", b: "0.5rem" }}
                textWeight="500"
              >
                Create Account
              </Text>
              <Text
                textColor="light"
                textSize="caption"
                m={{ b: "4rem" }}
                textAlign="center"
              >
                Already have an account? <Link to="/account/login">Log In</Link>
              </Text>
              <Field
                type="text"
                {...register("displayName", {
                  required: true, 
                  pattern: /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/
                })}
                placeholder="Full Name"
                borderColor={errors.displayName && "danger800"}
              >
                {errors.displayName?.type == "required" && 
                  <Text textColor="danger800" textSize="caption">
                    Name cannot be empty.
                  </Text>
                }
                {errors.displayName?.type == "pattern" && 
                  <Text textColor="danger800" textSize="caption">
                    Sorry, please use name patterns like John, John Dow, John O'Dow, John-Bob Dow.
                  </Text>
                }
              </Field>
              <Field
                type="email"
                autoComplete="username"
                {...register("email", { 
                  required: true, 
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                placeholder="Work Email"
                borderColor={errors.email && "danger800"}
              >
                {errors.email?.type == "required" && 
                  <Text textColor="danger800" textSize="caption">
                    Email cannot be empty.
                  </Text>
                }
                {errors.email?.type == "pattern" &&
                  <Text textColor="danger800" textSize="caption">
                    Sorry, please use email patterns like john@email.com, john.dow@email.com.
                  </Text>
                }
              </Field>
              <Field
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                {...register("password", { 
                  required: true, 
                  pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
                })}
                placeholder="Password"
                borderColor={errors.password && "danger800"}
                suffix={ watch("password") && 
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
                    Password cannot be empty.
                  </Text>
                }
                {errors.password?.type == "pattern" && 
                  <Text textColor="danger800" textSize="caption">
                    Passwords must contain at least eight characters, including at least 1 letter and 1 number.
                  </Text>
                }
              </Field>
            </Div>
            <Button
              type="submit"
              disabled={loading}
              rounded="circle"
              w="100%"
              h="3rem"
              m={{ t: "3rem" }}
              bg="info200"
              hoverBg="info300"
              textColor="dark"
            >
              Sign up
            </Button>
            {error && 
              <Text textColor="danger800" textSize="caption" textAlign="center" m={{ t: "1rem" }}>
                {error}
              </Text>
            }
          </form>
        </Card>
        <Card h="auto" $flattened={true}>
          <Div flexGrow="1" border={{ b: "2px solid" }} rounded="circle" borderColor="black700" m={{ x: "0rem", b: "3rem" }} d={{ xs: "none", md: "block"}}/>
          <Button
            className="wiggle"
            rounded="circle"
            bg="info200"
            h="3rem"
            hoverBg="info300"
            textColor="dark"
            shadow="2"
            prefix={
              <Div m={{ l: "-3.5rem", r: "2rem" }} align="center" d="flex" d={{ xs: "none", sm: "none", md: "none", lg: "flex" }}>
                <AtlassianIcon />
              </Div>
            }
          >
            Sign up with your Atlassian account
          </Button>
        </Card>
      </Div>
    </>
  )
};

export default withRouter(Signup);