import http from "./http";

const get = async (params) => {
  const res = await http.get("/items/Primary_Artist", { params });
  return res?.data;
};

const getById = async (id) => {
  const res = await http.get("/items/Primary_Artist/" + id);
  return res?.data;
};

const add = async (data) => {
  const res = await http.post("/items/Primary_Artist", data);
  return res?.data;
};

const update = async (id, data) => {
  const res = await http.patch("/items/Primary_Artist/" + id, data);
  return res?.data;
};

const deleteItem = async (id) => {
  const res = await http.delete("/items/Primary_Artist/" + id);
  return res?.data;
};

const PrimaryArtistService = {
  get,
  getById,
  add,
  update,
  deleteItem
};

export default PrimaryArtistService;
