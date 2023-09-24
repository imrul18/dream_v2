import moment from "moment";
import React, { useEffect, useState } from "react";
import CardList from "../Component/BankCard/CardList";
import AddBankPopup from "../Component/Modal/AddBankPopup";
import WithdrawalTransactionTable from "../Component/Table/WithdrawalTransactionTable";
import EarningService from "../service/EarningService";

function Withdraw() {
  const [balance, setBalance] = useState(150);
  const isButtonActive = balance >= 100;

  const handleWithdraw = () => {
    if (balance >= 100) {
      // Withdraw logic here
      setBalance(0);
      alert("Withdrawn ₹100.00");
    } else {
      alert("Withdrawal not possible");
    }
  };

  const [data, setData] = useState([]);
  const [bank, setBank] = useState([]);

  const getData = async (params) => {
    const res = await EarningService.getWithdraw(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        date: moment(item?.issue_date).format("DD/MM/YYYY"),
        amount: item?.amount,
        bank: item?.bank_account,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
      };
    });
    setData(finalData);
  };
  const getBank = async (params) => {
    const res = await EarningService.getBank(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        bankName: item?.bank_name,
        accountNumber: item?.account_number,
        companyName: item?.account_holder_name,
      };
    });
    setBank(finalData);
  };

  const onSearch = async (value) => {
    getData({search: value});
  };    

  useEffect(() => {
    getData();
    getBank();
  }, []);

  return (
    <div className="withdraw_content">
      <div className="section_title border_bottom">
        <div className="text_area">
          <h1>Withdraw Your Amount</h1>
          <p>Cashing out your balance</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-4">
          <div className="card withdraw_card">
            <h2>Available Amount</h2>
            <h1>₹{balance.toFixed(2)}</h1>
            <div className="btn_area">
              <button
                className={`btn ${isButtonActive ? "active" : ""}`}
                onClick={handleWithdraw}
                disabled={!isButtonActive}
              >
                Withdraw Balance
              </button>
              <p>Minimum withdraw balance ₹100</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card bank_add_card">
            <h2>How you get paid</h2>
            <CardList cards={bank}/>
            <AddBankPopup onAdd={getBank}/>
          </div>
        </div>
      </div>
      <div className="table_content">
        <h1 className="mb-5">Recent Transactions</h1>
        <WithdrawalTransactionTable data={data} onSearch={onSearch}/>
      </div>
    </div>
  );
}

export default Withdraw;
