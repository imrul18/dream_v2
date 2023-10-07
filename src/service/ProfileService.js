import http from "./http";

const get = async () => {
  const res = await http.get("/users/me");
  return res?.data;
};

const update = async (data) => {
  const res = await http.patch("/users/me", data);
  return res?.data;
};

const ProfileService = {
  get,
  update,
};

export default ProfileService;
