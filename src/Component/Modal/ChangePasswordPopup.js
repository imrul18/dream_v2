import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import PasswordInput from "../InputField/PasswordInput";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState({});

  const onHandleChange = (name, value) => {
    setData({ ...data, [name]: value });
  }

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    alert("Password Updated Successfully");
    handleClose();
  }

  return (
    <>
      <Link onClick={handleShow}>Change Your Password</Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
            <PasswordInput
                label="Current Password"
                value={data?.password}
                star="*"
                onChange={handleNameChange}
              />
            <PasswordInput
                label="New Password"
                value={name}
                star="*"
                onChange={handleNameChange}
              />
            <PasswordInput
                label="Confirm Password"
                value={name}
                star="*"
                onChange={handleNameChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <button className="btn" onClick={handleSubmit}>
              Save
            </button>
            <button className="btn_s" onClick={handleClose}>
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
