import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import EarningService from "../../service/EarningService";
import PrimaryBtn from "../Button/PrimaryBtn";
import InputField from "../InputField/InputField";

function Example({ onAdd }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState({});
  const [error, setError] = useState({});

  const onChangeHandle = (name, value) => {
    setData({ ...data, [name]: value });
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
    if (data?.re_account_number != data?.account_number) {
      error = { ...error, re_account_number: "Account number not matched" };
      flag = true;
    }
    if (!data?.re_account_number) {
      error = {
        ...error,
        re_account_number: "Re-type Account Number is required",
      };
      flag = true;
    }
    if (!data?.ifsc_code) {
      error = { ...error, ifsc_code: "IFSC code is required" };
      flag = true;
    }
    setError(error);

    if (!flag) {
      const res = await EarningService.addBank({
        bank_name: data?.bank_name,
        account_holder_name: data?.account_holder_name,
        account_number: data?.account_number,
        ifsc_code: data?.ifsc_code,
      });
      if (res) {
        setData({});
        handleClose();
        onAdd();
      }
    }
  };

  return (
    <>
      <button className="btn mt-4" onClick={handleShow}>
        Add payment method
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter bank details</Modal.Title>
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
            type="number"
            label="Re-type Account Number"
            value={data?.re_account_number}
            star="*"
            onChange={(e) =>
              onChangeHandle("re_account_number", e?.target?.value)
            }
          />
          <small className="text-danger">{error?.re_account_number}</small>
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

export default Example;
