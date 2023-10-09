import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import EarningService from "../../service/EarningService";

function WithdrawPopup({
  isButtonActive,
  bank,
  balance,
  minimum_withdraw,
  confirm,
}) {
  const [show, setShow] = useState(false);
  const [bankOptions, setBankOptions] = useState([]);
  const [data, setData] = useState({ amount: balance });
  const [error, setError] = useState(null);

  useEffect(() => {
    setBankOptions(
      bank?.map((item) => {
        return {
          value: item?.id,
          label: `${item?.account_holder_name} (${item?.bank_name})`,
        };
      })
    );
  }, [bank]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitData = async (e) => {
    e?.preventDefault();
    if (!data?.bank_account) {
      setError("Please Select Bank Account");
    } else if (data?.amount < minimum_withdraw) {
      setError(`Minimum withdraw balance: ₹${minimum_withdraw}`);
    } else if (data?.amount > parseFloat(balance)) {
      setError(`Insufficient balance`);
    } else {
      const res = await EarningService?.withdraw(data);
      setData({});
      confirm();
      handleClose();
    }
  };

  const onChange = (object) => {
    setData({ ...data, ...object });
  };

  return (
    <>
      <button
        className={`btn ${isButtonActive ? "active" : ""}`}
        onClick={handleShow}
        disabled={!isButtonActive}
      >
        Withdraw Balance
      </button>

      <Modal show={show} onHide={handleClose} className="s-popup" size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h1>Your Withdraw Balance: ₹{balance}</h1>
          <div>
            <Select
              className="select py-2"
              options={bankOptions}
              type="text"
              placeholder="Select Bank"
              value={bankOptions?.find(
                (itm) => itm?.value === data?.bank_account
              )}
              onChange={(e) => onChange({ bank_account: e.value })}
            />
          </div>
          <small className="text-danger">{error}</small>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <button className="btn_s" onClick={submitData}>
              Confirm
            </button>
            <button className="btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WithdrawPopup;
