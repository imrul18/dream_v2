import http from "./http";

const get = async (params) => {
  const res = await http.get("/items/Release_Music", { params });
  return res?.data;
};

const add = async (data) => {
  const res = await http.post("/items/Release_Music", data);
  return res?.data;
};

const CallerTune = async (params) => {
  const res = await http.get("/items/Caller_Tune", { params });
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

const MusicCatalogService = {
  get,
  add,
  CallerTune,
  update,
  deleteItem,
};

export default MusicCatalogService;
