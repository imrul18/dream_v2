import http from "./http";

const overview = async (params) => {
  const res = await http.get("/items/earning_overview", { params });
  return res?.data;
};

const getWithdraw = async (params) => {
  const res = await http.get("/items/Withdraw_Request", { params });
  return res?.data;
};

const getWithdrawAmount = async () => {
  const res = await http.get("/items/App_Settings");
  return res?.data;
};

const getBank = async (params) => {
  const res = await http.get("/items/Bank_Account", { params });
  return res?.data;
};

const addBank = async (data) => {
  const res = await http.post("/items/Bank_Account", data);
  return res?.data;
};

const getBalance = async () => {
  const res = await http.get("/items/Balance");
  return res?.data;
};

const withdraw = async (data) => {
  const res = await http.post("/items/Withdraw_Request", data);
  return res?.data;
};

const EarningService = {
  overview,
  getWithdraw,
  getWithdrawAmount,
  getBank,
  addBank,
  getBalance,
  withdraw
};

export default EarningService;
