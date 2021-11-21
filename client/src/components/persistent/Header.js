import React, { useEffect } from "react"
import { Div, Avatar, Image, Text, Container, Button, Anchor, scrollTo, Icon, Row, Col} from "atomize"
import logo from "url:../../../assets/images/logo_white3.svg"
import { Link } from 'react-resource-router';
import { GET_CURRENT_WORKSPACE, GET_WORKSPACES, IS_LOGGED_IN, ME_QUERY } from '../../graphql/queries';
import { graphql } from "@apollo/client/react/hoc";
import { compose } from "recompose";
import { HeaderLink } from ".";
import { DropdownItem, DropdownMenu } from "../common";
import Store from '#store';
import { useQuery } from "@apollo/client";

const Header = ({
  getCurrentUser,
  getWorkspaces, getWorkspacesResult,
  ...restProps 
}) => {
  const { data: { isLoggedIn } } = useQuery(IS_LOGGED_IN);

  const handleWorkspaceSelection = (textContent) => {
    localStorage.setItem('currentWorkspace', textContent);
    Store.currentWorkspace(textContent);
  };

  return (
    <Div 
      id="headerWrapper"
      tag="nav"
      top="0" left="0" right="0"
      // w="calc(100% + 0.5rem)"
      w="auto"
      transition
      zIndex="999"
      overflow="visible"
      // p={{ b: "3.5rem" }}
      m={{ 
        l: 0,
        r: { xl: "0rem", lg: "0", md: "0", sm: "0", xs: "0" }
      }}
      // bg="black800"
      // shadow="1"
      // bg="green"
      // p={{ t: "4px" }}
    >
      <Div 
        h="3.25rem"
        w="100%"
        // maxW="71rem"
        m={{ x: "auto"}}
        p={{ x: "1rem", r: "0.5rem" }}
        zIndex="1"
        rounded={{ r: "circle" }}
        // border={{ t: "1px solid",  r: "1px solid", b: "1px solid" }}
        bg={isLoggedIn ? "black850" : "transparent"}
        borderColor={isLoggedIn ? "black900" : "transparent"}
        shadow={isLoggedIn && "4"}
        // bg="transparent"
        // borderColor="transparent"
        // shadow="0"
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
            w="100%"
            align="center"
            justify="flex-start"
            p={{ t: "0.75rem", b: "0.75rem" }}
            bg=""
          >
            {/* {isLoggedIn && (
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
            {isLoggedIn && (
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
                <Div
                  m={{ l: "0rem", r: "1rem" }}
                >
                  <Link to="/">
                    <Image
                      src={logo}
                      alt="atomize design system logo"
                      h="36px"
                      w="auto"
                      align="center"
                    />
                  </Link>
                </Div>
                <Div m={{ l: "-0.75rem", r: "0.5rem" }} >
                  {/* <Text textWeight="600" textSize="title" textTransformation="uppercase">Beacon</Text> */}
                </Div>
                <Div bg="#444" w="1px" h="1.5rem" d="flex" m={{ x: "0.5rem" }} rounded="circle" />
                <Div m={{ r: "0.25rem" }}>
                  <DropdownMenu 
                    bg="transparent" 
                    position="start" 
                    h="2.25rem"
                    text="Workspaces"
                    isLoading={getWorkspacesResult?.loading}
                    menuOffsetY="0.75rem"
                    onClick={handleWorkspaceSelection}
                    // prefix={
                    //   <Icon name="Bulk" size="18px" color="grey200" m={{ r: "0.5rem" }} />
                    // }
                  >
                    {getWorkspaces?.workspaces?.map((workspace, index) => (
                      <DropdownItem key={index} href={'/workspace/' + workspace.shortName}>{workspace.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Div>
                {/* <HeaderLink 
                  to="/taskboard" 
                  m={{ r: "0.25rem"}}
                  // suffix={<Icon name="DownArrow" size="18px" color="#ccc" />}
                  // prefix={<Icon name="HomeSolid" size="18px" color="#ccc" m={{ r: "0.5rem" }} />}
                >
                  Taskboards
                </HeaderLink> */}
                <HeaderLink
                  to="/your-work"
                  m={{ r: "0.25rem"}}
                  // prefix={<Icon name="FolderSolid" size="16px" color="#ccc" m={{ r: "0.5rem" }} />}
                >
                  Your work
                </HeaderLink>
                <HeaderLink
                  to="/browse/people"
                  m={{ r: "0.25rem"}}
                  // prefix={<Icon name="FolderSolid" size="18px" color="#ccc" m={{ r: "0.5rem" }} />}
                >
                  People
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
            m={{ x: "auto", l: "calc(-60% + -.4rem)" }}
            bg=""
          >
            {!isLoggedIn && (
              <Link to="/">
                <Image
                  src={logo}
                  alt="Beacon Logo"
                  h="36px"
                  w="auto"
                  align="center"
                />
              </Link>
          )}
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
            {isLoggedIn && (
              <HeaderLink 
                to="/organization/settings" m={{ l: "0.5rem" }}
              >
                <Icon name="SettingsSolid" size="18px" color="grey100" />
              </HeaderLink>
            )}
            {/* {isLoggedIn && (
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
            {isLoggedIn && (
              <HeaderLink 
                to="/account/profile" m={{ l: "0.5rem" }}
              >
                <Icon name="UserSolid" size="18px" color="grey100" />
              </HeaderLink>
            )}
            {/* {!isLoggedIn && (
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
            {isLoggedIn && (
              <HeaderLink to="/account/bookmarks" m={{ l: "0.5rem" }}>
                <Icon name="BookmarkSolid" size="18px" color="grey100" />
              </HeaderLink>
            )}
            {isLoggedIn && (
              <Button
                h="2.25rem" 
                w="2.25rem"
                bg="dark"
                rounded="circle"
                m={{ l: "0.5rem" }}
                p="none"
              >
                <Text
                  textWeight="800"
                  textAlign="center"
                  textSize="caption"
                  textColor="grey100"
                >
                  4
                </Text>
              </Button>
            )}
          </Div>
        </Div>
      </Div>
    </Div>
  )
};


export default compose(
  graphql(ME_QUERY, { name: "getCurrentUser" }),
  graphql(GET_WORKSPACES, { name: "getWorkspaces" })
)(Header);