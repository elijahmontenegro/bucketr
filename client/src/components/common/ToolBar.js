import React from 'react';
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

const ToolBar = (props) => {

  return (
    <>
     <Div 
        d="flex" 
        flexDir="column" 
        justify="start" 
        w="100%" 
        align="space-between" 
        m={{ b: "1rem", x: "-0.5rem" }}
        // bg="black600"
        // border="1px solid" borderColor="black900"
        rounded="md"
        p="0.5rem"
      >
        {(props.primaryActions || props.tertiaryActions) && 
          <>
            <Div d="flex" flexDir="row" justify="space-between" bg="">
              <Div d="flex" flexDir="row">{props.primaryActions}</Div>
              <Div d="flex" flexDir="row">{props.tertiaryActions}</Div>
            </Div>
            <Div w="100%" h="0" bg="black900" m={{ y: "0.5rem"}} />
          </>
        }

        <Div d="flex" flexDir="row" justify="space-between" align="center" bg="">
          <Div d="flex" flexDir="row">
            {props.leftActions}
          </Div>
          <Div d="flex" flexDir="row">
            {props.rightActions}
          </Div>
        </Div>
        
      </Div>
    </>
  );
};

export default ToolBar;