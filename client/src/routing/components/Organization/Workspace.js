import React, { useEffect, useState, useContext, useRef } from 'react';
import { withRouter } from 'react-resource-router';
import { 
  Text,
  Div,
  Icon,
  Row,
  SideDrawer,
  Button,
  Input,
  Tag,
  Modal
} from "atomize";
import { Content, HeaderLink } from '../../../components/persistent';
import { SideBar, ToolBar, DropdownMenu, DropdownItem, DynamicTable, Field } from '../../../components/common';
import { GET_WORKSPACES } from '../../../graphql/queries';
import { CREATE_WORKSPACE, DELETE_WORKSPACE, UPDATE_WORKSPACE } from '../../../graphql/mutations';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'recompose';
import { useForm } from 'react-hook-form';

const Workspace = ({
  getWorkspaces,
}) => {
  const workspaces = getWorkspaces?.workspaces;

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
      <Text textSize="title" m={{ b: "0.25rem" }}>Workspaces</Text>
      <Text m={{ b: "1rem" }}>Select a workspace to make changes.</Text>
      <ToolBar
        primaryActions={
          <Button h="2rem" m={{ r: "0.5rem" }} onClick={() => showModal('CREATE')}>Add Workspace</Button>
        }
        leftActions={
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
        }
      />
      <DynamicTable
        caption="List of Workspaces"
        head={["Name", "Short name"]}
        rows={workspaces && workspaces
          .map((workspace) => ({
            id: workspace.id,
            name: workspace.name,
            shortName: workspace.shortName
          }))
          .filter(workspace => workspace.name.toLowerCase().includes(searchValue.toLowerCase()))
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
    component: (props) => <CreateWorkspaceForm headerText="Add Workspace" onClose={props.onClose} />
  },
  {
    name: "UPDATE",
    component: (props) => 
      <CreateWorkspaceForm headerText="Edit Workspace" onClose={props.onClose} target={props.target} />
  },
  {
    name: "DELETE",
    component: (props) => <DeleteWorkspaceForm headerText="Delete Workspace" onClose={props.onClose} target={props.target} />
  }
];

const DeleteWorkspaceForm = compose(
  graphql(DELETE_WORKSPACE, {
    name: "deleteWorkspace",
    options: {
      refetchQueries: [
        { 
          query: GET_WORKSPACES
        }
      ]
    }
  })
)((props) => {
  const { register, formState: { errors }, handleSubmit, setError, clearErrors, setFocus, reset, watch } = useForm();

  const onSubmit = (data) => {
    props.deleteWorkspace({ 
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
          Are you sure you want to delete '{`${props.target?.name}`}'?
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
          disabled={props.deleteWorkspaceResult?.loading}
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

const CreateWorkspaceForm = compose(
  graphql(CREATE_WORKSPACE, { 
    name: "createWorkspace", 
    options: {
      refetchQueries: [
        { 
          query: GET_WORKSPACES
        }
      ]
    }
  }),
  graphql(UPDATE_WORKSPACE, { 
    name: "updateWorkspace", 
    options: {
      refetchQueries: [
        { 
          query: GET_WORKSPACES
        }
      ]
    }
  })
)((props) => {
  const { register, formState: { errors }, handleSubmit, setError, clearErrors, setFocus, reset, watch } = useForm();

  const onSubmit = (data) => {
    props.target && (data = Object.assign(data, { id: props.target.id }));
    (props.target ? props.updateWorkspace : props.createWorkspace)({ variables: { data }})
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
        <Text textSize="caption" m={{ l: "0.5rem", b: "0.25rem" }}>Name</Text>
        <Field
          autoFocus 
          type="text"
          {...register("name", {
            required: true, 
            pattern: /^[A-Za-z]+((\s)?((\-)?([A-Za-z])+))*$/
          })}
          defaultValue={props.target?.name}
          placeholder="Name"
          borderColor={errors.name && "danger800"}
        >
          {errors.name?.type == "required" && 
            <Text textColor="danger800" textSize="caption">
              Name cannot be empty.
            </Text>
          }
          {errors.name?.type == "pattern" && 
            <Text textColor="danger800" textSize="caption">
              Only letters and dashes are permitted.
            </Text>
          }
        </Field>
        <Text textSize="caption" m={{ l: "0.5rem", b: "0.25rem" }}>Short name</Text>
        <Field
          autoFocus 
          type="text"
          {...register("shortName", {
            required: true, 
            pattern: /^[A-Za-z]+((\s)?((\-)?([A-Za-z])+))*$/
          })}
          defaultValue={props.target?.shortName}
          placeholder="Short name"
          borderColor={errors.shortName && "danger800"}
        >
          {errors.name?.type == "required" && 
            <Text textColor="danger800" textSize="caption">
              Short Name cannot be empty.
            </Text>
          }
          {errors.name?.type == "pattern" && 
            <Text textColor="danger800" textSize="caption">
              Only letters and dashes are permitted.
            </Text>
          }
        </Field>
        <Text textSize="caption" m={{ l: "0.5rem", b: "0.25rem" }}>Members</Text>

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
          disabled={props.createWorkspaceResult?.loading || props.updateWorkspaceResult?.loading}
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
  graphql(GET_WORKSPACES, { 
    name: "getWorkspaces" 
  }),
)(Workspace);