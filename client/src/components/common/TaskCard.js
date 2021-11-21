import React from 'react';
import {
  Div,
  Col,
  Row,
  Text,
  Icon,
} from 'atomize';
import { Card } from './';


const TaskCard = (props) => {

  return (
    <>
      <Card 
        className="taskCard" 
        transition="all 0.1s ease-in-out" 
        w="auto" 
        h="auto" 
        p={{ x: "1rem", y: "1rem", r: "1.5rem" }} 
        hoverShadow="3"
      >
        <Col d="flex" justify="space-between" flexDir="column">
          <Div>
            <Text textSize="subheader" textWeight="600" textColor="white" m={{ b: "1rem" }} tag="header">{props.title}</Text>
            {props.version && (
              <> 
                <Text textSize="body" textWeight="500" textColor="grey200">Stream</Text>
                {/* <Div border={{ b: "1px solid" }} rounded="circle" borderColor="black600" m={{ y: "0.25rem" }}  /> */}
                <Text textSize="paragraph" textWeight="500" textColor="white">{props.version}</Text>
              </>

            )}
            <Text textSize="body" textWeight="500" textColor="grey200" m={{ t: "0.5rem" }}>Testers</Text>
            <Text textSize="caption" textWeight="500" textColor="grey900">3 testers</Text>
            <Div border={{ b: "1px solid" }} borderColor="black400" m={{ y: "0.25rem" }}  />
            <Div rounded="sm" bg="" m={{ b: ".5rem" }}>
              <Row align="center">
                <Icon m={{ x: "0.5rem" }} name="UserSolid" size="12px" color="white" />
                <Text textAlign="start" textSize="tiny" textWeight="500" textColor="danger300" textTransform="capitalize">
                  Elijah Montenegro
                </Text>
              </Row>
              <Row align="center">
                <Icon m={{ x: "0.5rem" }} name="UserSolid" size="12px" color="white" />
                <Text textAlign="start" textSize="tiny" textWeight="500" textColor="danger300" textTransform="capitalize">
                  Dash Wilkinson
                </Text>
              </Row>
              <Row align="center">
                <Icon m={{ x: "0.5rem" }} name="UserSolid" size="12px" color="white" />
                <Text textAlign="start" textSize="tiny" textWeight="500" textColor="danger300" textTransform="capitalize">
                  Darrell Karp
                </Text>
              </Row>
            </Div>
          </Div>
          <Div>
            <Text textSize="body" textWeight="500" textColor="grey200" m={{ t: "0.5rem" }}>Status</Text>
            {/* <Div border={{ b: "1px solid" }} rounded="circle" borderColor="black600" m={{ y: "0.25rem" }}  /> */}
            <Text textAlign="start" textSize="paragraph" textWeight="500" textColor="white" textTransform="capitalize" m={{ b: "0.5rem" }}>
              Completed
            </Text>
            <Text textSize="caption" textWeight="500" textColor="grey900">Last updated: 5 minutes ago</Text>
            <Text textSize="caption" textWeight="500" textColor="grey900">Created: 1 hour 12 minutes ago</Text>
          </Div>
        </Col>
      </Card>
      {/* {props.title && <Text m={{ l: "1rem", b: "3rem" }} textSize="subheader" textWeight="500">{props.title}</Text>} */}
    </>
  );
};

export default TaskCard;