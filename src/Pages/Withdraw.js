import moment from "moment";
import React, { useEffect, useState } from "react";
import CardList from "../Component/BankCard/CardList";
import AddBankPopup from "../Component/Modal/AddBankPopup";
import WithdrawPopup from "../Component/Modal/WithdrawPopup";
import WithdrawalTransactionTable from "../Component/Table/WithdrawalTransactionTable";
import EarningService from "../service/EarningService";
import FileService from "../service/FileService";

function Withdraw() {
  const [balance, setBalance] = useState(0);
  const [minimum_withdraw, setMinimum_withdraw] = useState(0);
  const [data, setData] = useState([]);
  const [bank, setBank] = useState([]);

  const isButtonActive = balance >= minimum_withdraw;

  const getData = async (params) => {
    const res = await EarningService.getWithdraw(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        date: moment(item?.issue_date).format("DD/MM/YYYY"),
        amount: item?.amount,
        account_holder_name: item?.bank_account?.account_holder_name,
        bank_name: item?.bank_account?.bank_name,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
        reject_reason: item?.reject_reason,
        file: FileService.image(item?.transactions_record?.id),
      };
    });
    setData(finalData);
  };
  const getBank = async (params) => {
    const res = await EarningService.getBank(params);
    setBank(res?.data);
  };

  const getBalance = async () => {
    const res = await EarningService.getBalance();
    if (res?.data?.length) {
      setBalance(parseFloat(res?.data[0]?.total));
    }
    const result = await EarningService.getWithdrawAmount();
    if (result?.data) {
      setMinimum_withdraw(parseFloat(result?.data?.min_withdraw_amount));
    }
  };

  const onSearch = async (value) => {
    getData({ search: value });
  };

  const getAllData = () => {
    getData();
    getBank();
    getBalance();
  };

  useEffect(() => {
    getAllData();
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
              <WithdrawPopup
                isButtonActive={isButtonActive}
                bank={bank}
                balance={balance}
                minimum_withdraw={minimum_withdraw}
                confirm={getAllData}
              />
              <p>Minimum withdraw balance ₹{minimum_withdraw}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card bank_add_card">
            <h2>How you get paid</h2>
            <CardList cards={bank} onAdd={getBank} />
            <AddBankPopup onAdd={getBank} />
          </div>
        </div>
      </div>
      <div className="table_content">
        <h1 className="mb-5">Recent Transactions</h1>
        <WithdrawalTransactionTable data={data} onSearch={onSearch} />
      </div>
    </div>
  );
}

export default Withdraw;
