import Modal from 'react-modal';
import React, { PropTypes } from 'react';
import MembersModal from './MembersModal';
import GroupModal from './GroupModal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalComponent = ({
  group,
  modal,
  user,
  search,
  showModal,
  createGroup,
  editGroup,
  searchUsers,
  selectUser,
  deselectUser,
  inviteUsers,
}) => (
  <Modal
    isOpen={modal.show}
    onRequestClose={() => showModal()}
    style={customStyles}
  >
    {modal.modal === 'createGroup' ?
      <GroupModal
        group={group}
        modal={modal}
        user={user}
        search={search}
        createGroup={createGroup}
        editGroup={editGroup}
        searchUsers={searchUsers}
        selectUser={selectUser}
        deselectUser={deselectUser}
        showModal={showModal}
      /> : null}
    {modal.modal === 'members' ?
      <MembersModal
        user={user}
        search={search}
        selectUser={selectUser}
        searchUsers={searchUsers}
        deselectUser={deselectUser}
        group={group}
        showModal={showModal}
        inviteUsers={inviteUsers}
      /> : null}
  </Modal>
  );

ModalComponent.propTypes = {
  modal: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  selectUser: PropTypes.func.isRequired,
  deselectUser: PropTypes.func.isRequired,
  inviteUsers: PropTypes.func.isRequired,
};

export default ModalComponent;
