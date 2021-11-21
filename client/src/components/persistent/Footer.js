import React from 'react';
import { Div, Text, Row, Col, Container, Anchor, Icon } from "atomize";

export const Footer = (props) => {

  return (
    <Div
      tag="footer"
      p={{ t: { xs: "6rem", md: "4rem" }, b: { xs: "2rem", md: "2.5rem" } }}
      pos="relative"
      // bg="orange"
    >
      <Container>
        <Div d="flex" align="center" justify="center" flexDir="column">
          <Text
            tag="h2"
            textWeight="400"
            textSize="caption"
            textAlign="center"
            m={{ y: "1rem" }}
          >
            Version: 0.0.1 - Contact QAOps
          </Text>
        </Div>
      </Container>
    </Div>
  );
};