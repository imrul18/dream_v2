import baseUrl from "./../config";
import http from "./http";

const upload = async (data) => {
  const res = await http.post("/files", data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return res?.data;
};

const image = (id) => {
  return `${baseUrl}/assets/${id}?access_token=${JSON.parse(localStorage.getItem("accessToken"))}`
};

const FileService = {
  upload,
  image,
};

export default FileService;
