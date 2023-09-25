import http from "./http";

const upload = async (data) => {
  const res = await http.post("/files", data);
  return res?.data;
};

const FileService = {
  upload
};

export default FileService;
