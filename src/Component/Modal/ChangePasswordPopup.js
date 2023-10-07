import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import AuthService from "../../service/AuthService";
import ProfileService from "../../service/ProfileService";

function Example() {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");

  const getEmail = async () => {
    const res = await ProfileService?.get();
    setEmail(res?.data?.email);
  };

  useEffect(() => {
    getEmail();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const handleSubmit = async() => {
    const res = await AuthService?.forget(email);
    await AuthService?.logout();
    window.location.href = "/";
    handleClose();
  };

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
              By Clicking on confirm button, you will get an email to reset your
              password in <b>{email}</b> and logged out now.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <button className="btn" onClick={handleSubmit}>
              Submit
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
