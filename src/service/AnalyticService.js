import http from "./http";

const get = async (params) => {
  const res = await http.get("/items/Analytics", { params: {...params, sort: ["-id"] } });
  return res?.data;
};

const getById = async (id) => {
  const res = await http.get("/items/Label/" + id);
  return res?.data;
};

const add = async (data) => {
  const res = await http.post("/items/Analytics", data);
  return res?.data;
};

const update = async (id, data) => {
  const res = await http.patch("/items/Label/" + id, data);
  return res?.data;
};

const deleteItem = async (id) => {
  const res = await http.delete("/items/Label/" + id);
  return res?.data;
};

const AnalyticService = {
  get,
  getById,
  add,
  update,
  deleteItem,
};

export default AnalyticService;
