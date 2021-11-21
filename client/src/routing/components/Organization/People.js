import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-resource-router';
import { 
  Text,
  Div,
  Icon,
  Row,
  SideDrawer,
  Modal,
  Button,
  Input,
  Tag
} from "atomize";
import { SideBar, ToolBar, DropdownMenu, DropdownItem, DynamicTable, Field } from '../../../components/common';
import { GET_USERS } from '../../../graphql/queries';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../graphql/mutations';
import { compose } from 'recompose';
import { graphql } from '@apollo/client/react/hoc';
import { useForm } from 'react-hook-form';

const People = ({
  getUsers
}) => {
  const users = getUsers?.users;

  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setModalOpen] = useState();
  const [activeModal, setActiveModal] = useState();
  const [modalTarget, setModalTarget] = useState();

  const showModal = (name, target) => {
    setModalOpen(!isModalOpen);
    setActiveModal(name);
    !!target && setModalTarget(target)
  };

  const closeModal = () => {
    setModalOpen(!isModalOpen);
    setTimeout(() => setActiveModal(null), 200)
    setModalTarget(null);
  };

  return (
    <>
      <Text textSize="title" m={{ b: "0.25rem" }}>People</Text>
      <Text m={{ b: "1rem" }}>Select a user to make changes.</Text>
      <ToolBar
        primaryActions={
          <>
            <Button h="2rem" m={{ r: "0.5rem" }} onClick={() => showModal('CREATE')}>Add User</Button>
          </>
        }
        leftActions={
          <>
            <Input 
              m={{ r: "0.25rem" }} 
              w="100%" 
              h="2rem"
              placeholder="Filter by name" 
              onChange={(e) => setSearchValue(e.target.value)} 
              value={searchValue}
              suffix={searchValue &&
                <Button 
                  pos="absolute"
                  right="0"
                  h="2rem" w="2.5rem"
                  rounded={{ l: "none", r: "md" }}
                  bg="transparent"
                  onClick={() => setSearchValue("")}
                >
                  <Icon name="Cross" size="21px" color="black100" />
                </Button>
              }
            />
            
            <DropdownMenu 
              text="Role" 
              m={{ l: "0.25rem" }}
              alwaysShowText
            >
              <DropdownItem>All</DropdownItem>
              <DropdownItem>Admin</DropdownItem>
              <DropdownItem>Member</DropdownItem>
              <DropdownItem>Guest</DropdownItem>
            </DropdownMenu>
          </>
        }
        rightActions={
          <>
            {/* <Button>New User</Button> */}
          </>
        }
      />
      <DynamicTable
        caption="List of Users"
        head={["Display Name", "Email", "Role", "Status"]}
        rows={users && users.map(user => ({
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          role: <Tag>{user.role}</Tag>,
          active: <Tag bg={user.active ? "success700" : "gray700"}>{user.active ? "Active" : "Deactivated"}</Tag>,
        }))
        .filter(user => user.displayName.toLowerCase().includes(searchValue.toLowerCase()))
      }
        actions={[
          { text: "Edit", onClick: (item) => showModal('UPDATE', {...item}) },
          { text: "Remove", onClick: (item) => showModal('DELETE', {...item}) }
        ]}
        isModalOpen={isModalOpen}
      />

      <Modal
        d="flex" flexDir="column" 
        justify="start" align="start"
        rounded="lg" 
        bg="black900" 
        top="2rem"
        w="48rem"
        isOpen={isModalOpen}
        onClose={closeModal}
        autoFocus
      >
        {activeModal && actionModals
          .filter(modal => modal.name == activeModal)
          .map(({ component: ModalComponent }, index) => (
            <ModalComponent
              key={index}
              onClose={closeModal}
              target={modalTarget}
            />
          ))
        }
      </Modal>
    </>
  );
};

const actionModals = [
  {
    name: "CREATE",
    component: (props) => <CreateUserForm headerText="Add User" onClose={props.onClose} />
  },
  {
    name: "UPDATE",
    component: (props) => 
      <CreateUserForm headerText="Edit User" onClose={props.onClose} target={props.target} />
  },
  {
    name: "DELETE",
    component: (props) => <DeleteUserForm headerText="Delete User" onClose={props.onClose} target={props.target} />
  }
];

const DeleteUserForm = compose(
  graphql(DELETE_USER, {
    name: "deleteUser",
    options: {
      refetchQueries: [
        { 
          query: GET_USERS
        }
      ]
    }
  })
)((props) => {
  const { register, formState: { errors }, handleSubmit, setError, clearErrors, setFocus, reset, watch } = useForm();

  const onSubmit = (data) => {
    props.deleteUser({ 
      variables: { id: props.target.id },
    })
      .then(({ data }) => {
        props.onClose();
      })
      .catch(({ graphQLErrors }) => {
        setError("submit", graphQLErrors[0]);
      });

  };

  useEffect(() => {
    reset();
  }, [open]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Div flexGrow="1">
        <Text
          textAlign="center"
          textSize="heading"
          m={{ t: "0.5rem", b: "1rem" }}
          textWeight="500"
        >
          {props.headerText}
        </Text>
        <Text
          textAlign="center"
          textSize="paragraph"
          m={{ t: "0.5rem", b: "2.5rem" }}
        >
          Are you sure you want to delete '{`${props.target?.displayName}`}'?
        </Text>
      </Div>
      {errors.submit && 
        <Text textColor="danger800" textSize="caption" textAlign="start" m={{ l: "1rem" }}>
          {errors.submit.message}
        </Text>
      }
      <Div d="flex" flexDir="row" align="center" justify="end" m={{ t: "4rem" }}>
        <Button
          type="reset"
          onClick={props.onClose}
          m={{ l: "0.5rem" }}
          bg="transparent"
          textColor="light"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={props.deleteUserResult?.loading}
          m={{ l: "0.5rem" }}
          bg="info200"
          hoverBg="info300"
          textColor="dark"
        >
          Confirm
        </Button>
      </Div>
    </form>
  );
});

const CreateUserForm = compose(
  graphql(CREATE_USER, { 
    name: "createUser", 
    options: {
      refetchQueries: [
        { 
          query: GET_USERS
        }
      ]
    }
  }),
  graphql(UPDATE_USER, { 
    name: "updateUser", 
    options: {
      refetchQueries: [
        { 
          query: GET_USERS
        }
      ]
    }
  })
)((props) => {
  const { register, formState: { errors }, handleSubmit, setError, clearErrors, setFocus, reset, watch } = useForm();

  const onSubmit = (data) => {
    props.target && (data = Object.assign(data, { id: props.target.id }));
    (props.target ? props.updateUser : props.createUser)({ variables: { data }})
      .then(({ data }) => {
        props.onClose();
      })
      .catch(({ graphQLErrors }) => {
        setError("submit", graphQLErrors[0]);
      });
  };

  useEffect(() => {
    reset();
  }, [open]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Div flexGrow="1">
        <Text
          textAlign="center"
          textSize="heading"
          m={{ t: "0.5rem", b: "2.5rem" }}
          textWeight="500"
        >
          {props.headerText}
        </Text>
        <Text textSize="caption" m={{ l: "0.5rem", b: "0.25rem" }}>Display name</Text>
        <Field
          autoFocus 
          type="text"
          {...register("displayName", {
            required: true
          })}
          defaultValue={props.target?.displayName}
          placeholder="Display Name"
          borderColor={errors.name && "danger800"}
        >
          {errors.name?.type == "required" && 
            <Text textColor="danger800" textSize="caption">
              Display Name cannot be empty.
            </Text>
          }
        </Field>
      </Div>
      {errors.submit && 
        <Text textColor="danger800" textSize="caption" textAlign="start" m={{ l: "1rem" }}>
          {errors.submit.message}
        </Text>
      }
      <Div d="flex" flexDir="row" align="center" justify="end" m={{ t: "4rem" }}>
        <Button
          type="reset"
          onClick={props.onClose}
          m={{ l: "0.5rem" }}
          bg="transparent"
          textColor="light"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={props.createUserResult?.loading || props.updateUserResult?.loading}
          m={{ l: "0.5rem" }}
          bg="info200"
          hoverBg="info300"
          textColor="dark"
        >
          Submit
        </Button>
      </Div>
    </form>
  );
});

export default compose(
  graphql(GET_USERS, { 
    name: "getUsers" 
  }),
)(People);;
