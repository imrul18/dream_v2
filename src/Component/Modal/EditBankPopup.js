import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BiPen } from "react-icons/bi";
import EarningService from "../../service/EarningService";
import PrimaryBtn from "../Button/PrimaryBtn";
import InputField from "../InputField/InputField";

function EditBankPopup({ cardData, onAdd }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState(cardData ?? {});
  const [updateData, setUpdateData] = useState({});
  const [error, setError] = useState({});

  const onChangeHandle = (name, value) => {
    setData({ ...data, [name]: value });
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleSubmit = async (e) => {
    let flag = false;
    let error = {};
    if (!data?.bank_name) {
      error = { ...error, bank_name: "Bank name is required" };
      flag = true;
    }
    if (!data?.account_holder_name) {
      error = {
        ...error,
        account_holder_name: "Account holder name is required",
      };
      flag = true;
    }
    if (!data?.account_number) {
      error = { ...error, account_number: "Account number is required" };
      flag = true;
    }
    if (!data?.ifsc_code) {
      error = { ...error, ifsc_code: "IFSC code is required" };
      flag = true;
    }
    setError(error);

    if (!flag) {
      setError(null)
      const res = await EarningService.updateBank(data?.id, updateData);
      if (res) {
        handleClose();
        onAdd();
      }
    }
  };

  return (
    <>
      <BiPen class="icons" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit bank details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputField
            type="text"
            label="Bank Name"
            value={data?.bank_name}
            star="*"
            onChange={(e) => onChangeHandle("bank_name", e?.target?.value)}
          />
          <small className="text-danger">{error?.bank_name}</small>
          <InputField
            type="text"
            label="Name On Bank Account"
            value={data?.account_holder_name}
            star="*"
            onChange={(e) =>
              onChangeHandle("account_holder_name", e?.target?.value)
            }
          />
          <small className="text-danger">{error?.account_holder_name}</small>
          <InputField
            type="number"
            label="Account Number"
            value={data?.account_number}
            star="*"
            onChange={(e) => onChangeHandle("account_number", e?.target?.value)}
          />
          <small className="text-danger">{error?.account_number}</small>
          <InputField
            type="text"
            label="IFSC Code"
            value={data?.ifsc_code}
            star="*"
            onChange={(e) => onChangeHandle("ifsc_code", e?.target?.value)}
          />
          <small className="text-danger">{error?.ifsc_code}</small>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <PrimaryBtn label="Save" onClick={handleSubmit} />
            <button className="btn_s" onClick={handleClose}>
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBankPopup;
