import http from "./http";

const overview = async (params) => {
  const res = await http.get("/items/earning_overview", { params });
  return res?.data;
};

const getWithdraw = async (params) => {
  const res = await http.get("/items/Withdraw_Request", { params });
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

const EarningService = {
  overview,
  getWithdraw,
  getBank,
  addBank
};

export default EarningService;
