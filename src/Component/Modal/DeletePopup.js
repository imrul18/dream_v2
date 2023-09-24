import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

function DeletePopup({ onClick }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteData = () => {
    onClick();
    handleClose();
  };

  return (
    <>
      <Link className="delete" onClick={handleShow}>
        <BiTrashAlt className="icons" />
      </Link>
      <Modal show={show} onHide={handleClose} className="s-popup" size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h1>Are you sure?</h1>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <button className="btn_s" onClick={deleteData}>
              Yes
            </button>
            <button className="btn" onClick={handleClose}>
              No
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePopup;
