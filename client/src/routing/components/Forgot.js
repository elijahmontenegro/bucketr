import React, { useEffect, useState, useContext } from 'react';
// import { profileResource } from '../resources';
import { useResource, Link, withRouter } from 'react-resource-router';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button, Container, Row, Col, Div, Text, Input, Icon } from 'atomize';
import { AtlassianIcon } from '@atlaskit/logo';
import { Field, Card } from '../../components/common';
import { useForm } from 'react-hook-form';

const Forgot = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState: { errors }, handleSubmit, getValues, watch } = useForm();

  const onSubmit = (data) => {
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
        <Card 
          h="auto"
          // borderColor="warning600"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Div flexGrow="1">
              <Text
                textAlign="center"
                textSize="title"
                m={{ t: "0.5rem", b: "0.5rem" }}
                textWeight="500"
                // fontFamily="secondary"
              >
                Forgot Password
              </Text>
              <Text
                textColor="light"
                textSize="caption"
                m={{ b: "4rem" }}
                textAlign="center"
              >
                Enter your email address to reset your password.
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
                    Please enter an email address.
                  </Text>
                }
              </Field>
            </Div>
            <Button
              w="100%"
              rounded="circle"
              h="3rem"
              m={{ t: "3rem" }}
              bg="info200"
              hoverBg="info300"
              textColor="dark"
              // onClick={() => window.location = "http://localhost:4000/auth/atlassian/connect"}
            >
              Send recovery link
            </Button>
          </form>
        </Card>
        <Card h="auto" $flattened={true}>
          <Div flexGrow="1" border={{ b: "2px solid" }} rounded="circle" borderColor="black700" m={{ x: "0rem", b: "3rem" }} d={{ xs: "none", md: "block"}}/>
          <Text textAlign="center" textSize="caption">
            <Link to="/account/login">
              Return to Log In
            </Link>
          </Text>
        </Card>
      </Div>
    </>
  )
};

export default withRouter(Forgot);