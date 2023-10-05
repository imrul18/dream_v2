import http from "./http";

const get = async (params) => {
  const res = await http.get("/items/Release_Music", { params });
  return res?.data;
};

const getList = async (params) => {
  const res = await http.get("/items/Release_Music", {
    params: { ...params, fields: ["*.*.*.*"], sort: ["-id"] },
  });
  return res?.data;
};

const getById = async (id) => {
  const res = await http.get("/items/Release_Music/" + id, {
    params: { fields: ["*.*.*.*"] },
  });
  return res?.data;
};

const add = async (data) => {
  const res = await http.post("/items/Release_Music", data);
  return res?.data;
};

const edit = async (id, data) => {
  const res = await http.patch("/items/Release_Music/" + id, data);
  return res?.data;
};

const show = async (id) => {
  const res = await http.get("/items/Release_Music/" + id, {
    params: { fields: ["*.*.*.*"] },
  });
  return res?.data;
};

const CallerTune = async (params) => {
  const res = await http.get("/items/Caller_Tune", {
    params: { ...params, fields: ["*.*.*.*"]},
  });
  return res?.data;
};

const addCallerTune = async (data) => {
  const res = await http.post("/items/Caller_Tune", data);
  return res?.data;
};

const getCRBT = async () => {
  const res = await http.get("/items/CRBT");
  return res?.data;
};

const tracks = async (id) => {
  const res = await http.get("/items/Track/" + id);
  return res?.data;
};

const MusicCatalogService = {
  get,
  getList,
  getById,
  add,
  edit,
  show,
  CallerTune,
  addCallerTune,
  getCRBT,
  tracks,
};

export default MusicCatalogService;
