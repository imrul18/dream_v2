import http from "./http";

const get = async (params) => {
  const res = await http.get("/items/Dashboard_Page", {
    params: { ...params, fields: "*.*" },
  });
  return res?.data;
};

const notification = async () => {
  const res = await http.get("/Notifications");
  return res?.data;
};

const archived = async (id) => {
  const res = await http.patch("/Notifications", {
    data: { status: "archived" },
    keys: [id],
  });
  return res?.data;
};

const add = async (data) => {
  const res = await http.post("/items/Artist_Channel_Request", data);
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

const DashboardService = {
  get,
  notification,
  archived,
  add,
  update,
  deleteItem,
};

export default DashboardService;
