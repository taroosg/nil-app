import React from 'react';
import Modal from '@material-ui/core/Modal';

const SimpleModal = props => {

  return (
    <div>
      {/* <button type="button" onClick={() => props.handleModalOpen()}>
        Open Modal
      </button> */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.isModalOpen}
      // onClose={() => props.handleModalClose()}
      >
        <div></div>
      </Modal>
    </div>
  );
}

export default SimpleModal;