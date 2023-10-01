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
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setBankOptions(
      bank
        ?.filter((itm) => itm?.status === "approved")
        ?.map((item) => {
          return {
            value: item?.id,
            label: `${item?.companyName} (${item?.bankName})`,
          };
        })
    );
  }, [bank]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitData = async(e) => {
    e?.preventDefault();
    if (!data?.amount || !data?.bank_account) {
      setError("Please fill all the fields");
    } else if (data?.amount < minimum_withdraw) {
      setError(`Minimum withdraw balance: ₹${minimum_withdraw}`);
    } else if (data?.amount > parseFloat(balance)) {
      setError(`Insufficient balance`);
    } else {
      const res = await EarningService?.withdraw(data)
      setData({})
      confirm()
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
          <h1>Your Current Balance: ₹{balance}</h1>
          <h5>Minimum withdraw balance: ₹{minimum_withdraw}</h5>

          <div>
            <input
              type="text"
              placeholder="Enter Amount"
              className="input"
              value={data?.amount}
              onChange={(e) => onChange({ amount: e?.target?.value })}
            />
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