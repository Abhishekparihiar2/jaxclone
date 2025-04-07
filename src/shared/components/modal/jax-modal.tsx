import React from "react";
import { Modal } from "react-bootstrap";

export interface JAXModalInterface
{
  children?: JSX.Element;
  heading?: string;
  dialogClassName?: string;
  bodyClassName?: string;
  show: boolean;
  handleClose: () => void;
  backdrop?: "static" | undefined;
}

const JAXModal = ( {
  children,
  heading,
  dialogClassName,
  bodyClassName,
  show,
  handleClose,
  backdrop
}: JAXModalInterface ) =>
{
  return (
    <Modal
      dialogClassName={ `modal-dialog-lg ${dialogClassName ? dialogClassName : ""}` }
      contentClassName=""
      show={ show }
      onHide={ handleClose }
      backdrop={backdrop}
    >
      <Modal.Header>
        <Modal.Title>{ heading }</Modal.Title>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={ handleClose }
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body className={ `${bodyClassName ? bodyClassName :''}` }>{ children }</Modal.Body>
    </Modal>
  );
};

export default JAXModal;
