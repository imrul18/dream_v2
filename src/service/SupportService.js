import http from "./http";

const get = async (params) => {
  const res = await http.get("/items/Support_Ticket", { params });
  return res?.data;
};

const getById = async (id) => {
  const res = await http.get("/items/Label/" + id);
  return res?.data;
};

const add = async (data) => {
  const res = await http.post("/items/Support_Ticket", data);
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

const SupportService = {
  get,
  getById,
  add,
  update,
  deleteItem,
};

export default SupportService;
