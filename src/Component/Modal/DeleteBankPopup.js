import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BiTrash } from "react-icons/bi";
import EarningService from "../../service/EarningService";
import PrimaryBtn from "../Button/PrimaryBtn";

function DeleteBankPopup({ cardData, onAdd }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async(e) => {
    const res = EarningService.deleteBank(cardData?.id);    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    handleClose();
    onAdd();
    if (res) {
    }
  };

  return (
    <>
      <BiTrash className="icons" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <span className="text-danger">
              Are you confirm to delete this Account?
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <PrimaryBtn label="Confirm" onClick={handleSubmit} />
            <button className="btn_s" onClick={handleClose}>
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteBankPopup;
