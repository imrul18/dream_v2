import http from "./http";

const genre = async () => {
  const res = await http.get("/items/Genre");
  return res?.data;
};
const label = async () => {
  const res = await http.get("/items/Label");
  return res?.data;
};
const artist = async () => {
  const res = await http.get("/items/Primary_Artist");
  return res?.data;
};
const language = async () => {
  const res = await http.get("/items/Languages");
  return res?.data;
};

const OptionService = {
  genre,
  label,
  artist,
  language,
};

export default OptionService;
