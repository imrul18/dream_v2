import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import LabelService from "../../service/LabelService";
import PrimaryBtn from "../Button/PrimaryBtn";
import InputField from "../InputField/InputField";
import TextField from "../TextBox/TextField";

function LabelManagePopup({ onSubmit }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [ytLink, setYtLink] = useState("");

  const handleYtChange = (event) => {
    setYtLink(event.target.value);
  };

  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (e) => {
    let error = {};
    let flag = true;
    if (!title) {
      error = { ...error, title: "Title is required" };
      flag = false;
    }
    if (!ytLink) {
      error = { ...error, ytLink: "Youtube link is required" };
      flag = false;
    }
    if (flag) {
      setError(null);
      const data = {
        title: title,
        youtube_url: ytLink,
        message: comment,
      };
      const res = await LabelService.add(data);
      if (res) {
        setTitle("");
        setYtLink("");
        setComment("");
        handleClose();
        onSubmit();
      }
    } else {
      setError(error);
    }
  };

  return (
    <>
      <button className="btn add_label_btn" onClick={handleShow}>
        Add label
      </button>
      <Modal show={show} onHide={handleClose} className="add_label">
        <Modal.Header closeButton>
          <Modal.Title>Enter label details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input_group">
            <InputField
              label="Title"
              star="*"
              value={title}
              onChange={handleTitleChange}
            />
            {error?.title && <small className="text-danger">{error?.title}</small>}
            <InputField
              label="Youtube URL"
              star="*"
              value={ytLink}
              onChange={handleYtChange}
            />
            {error?.ytLink && <small className="text-danger">{error?.ytLink}</small>}
            <TextField
              label="Messages"
              type="text"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <PrimaryBtn label="Submit" onClick={handleSubmit} />
            <button className="btn_s" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LabelManagePopup;
