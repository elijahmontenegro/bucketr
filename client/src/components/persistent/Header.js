import React from "react"
import { Div, Avatar, Image, Text, Container, Button, Anchor, scrollTo, Icon } from "atomize"
import logo from "url:../../../assets/images/logo_white3.svg"
import { Link } from 'react-resource-router';
import { IS_LOGGED_IN } from '../../services/graphql/queries';
import { graphql } from "@apollo/client/react/hoc";
import { makeLinkProps } from "../../utils";
import { HeaderLink } from ".";

const Header = ({ data, ...restProps }) => {

  return (
    <Div 
      position="fixed"
      id="headerWrapper"
      top="0" left="0" right="0"
      transition
      zIndex="999"
      bg=""
    >
      <Div 
        h="67px"
        w="100%"
        maxW="90rem"
        m={{ x: "auto"}}
        p={{ x: "3.5rem" }}
        zIndex="1"
        bg="black800"
        // border={{ b: "4px solid" }}
        borderColor="black700"
        rounded={{ b: "circle" }}
        shadow="2"
      >
        <Div
          d="flex"
          h="100%"
          justify="space-between"
          align="center"
          pos="relative"
          bg=""
          className="header-container"
        >
          <Div
            d="flex"
            h="100%"
            w="40%"
            align="center"
            justify="flex-start"
            p={{ t: "0.75rem", b: "0.75rem" }}
            bg=""
          >
            {/* {data?.isLoggedIn && (
              <Button
              transition="none"
                h="2rem"
                w="2rem"
                bg="black600"
                rounded="circle"
                m={{ r: "0.75rem" }}
                hoverBg="darkalpha1"
              >
                <Icon name="Search" size="16px" color="white" />
              </Button>
            )} */}
            {data?.isLoggedIn && (
              <Div
                d="flex"
                h="100%"
                className="menu-wrapper"
                maxW="100%"
                transition
                justify="initial"
                align="center"
                bg=""
              >
                <HeaderLink to="/" m={{ r: "0.5rem"}}>
                  Home
                </HeaderLink>
                <HeaderLink to="/browse/workareas" m={{ r: "0.5rem"}}>
                  Work areas
                </HeaderLink>
                <HeaderLink to="/browse/tasks" m={{ r: "0.5rem"}}>
                  Tasks
                </HeaderLink>
              </Div>
            )}
          </Div>
          <Div
            d="flex"
            h="100%"
            w="20%"
            align="center"
            justify="center"
            p={{ y: "0.75rem" }}
            m={{ x: "auto" }}
            bg=""
          >
            <Link to="/">
              <Image
                src={logo}
                alt="atomize design system logo"
                h="32px"
                w="auto"
                align="center"
              />
            </Link>
          </Div>
          <Div
            d="flex"
            h="100%"
            w="40%"
            align="center"
            justify="flex-end"
            zIndex="2"
            p={{ t: "0.75rem", b: "0.75rem" }}
            bg=""
          >
            {/* {data?.isLoggedIn && (
              <Button
                h="2rem"
                bg="dark"
                m={{ l: "2rem" }}
                d="flex"
                align="center"
                rounded="circle"
                textWeight="500"
                prefix={
                  <Icon
                    name="Add"
                    size="16px"
                    color="white"
                    m={{ r: "0.5rem" }}
                  />
                }
              >
                Create
              </Button>
            )} */}
            {data?.isLoggedIn && (
              <HeaderLink to="/account/profile" m={{ l: "2rem" }}>
                <Icon name="UserSolid" size="16px" color="white" />
              </HeaderLink>
            )}
            {/* {!data?.isLoggedIn && (
              <Link to="/account/login">
                <Button
                  h="2rem" 
                  w="auto"
                  bg="transparent"
                  rounded="circle"
                  m={{ l: "2rem" }}
                  p={{ x: "7px" }}
                >
                  Log in
                </Button>
              </Link> 
            )} */}
            {data?.isLoggedIn && (
              <HeaderLink to="/account/bookmarks" m={{ l: "2rem" }}>
              <Icon name="BookmarkSolid" size="16px" color="white" />
              </HeaderLink>
            )}
            {data?.isLoggedIn && (
              <Button
                h="1.75rem" 
                w="1.75rem"
                bg="dark"
                rounded="circle"
                m={{ l: "2rem" }}
                p="none"
              >
                <Text
                  textWeight="800"
                  textAlign="center"
                >
                  41
                </Text>
              </Button>
            )}
          </Div>
        </Div>
      </Div>
    </Div>
  )
};


export default graphql(IS_LOGGED_IN)(Header);