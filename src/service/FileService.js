import http from "./http";

const upload = async (data) => {
  const res = await http.post("/files", data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
  return res?.data;
};

const FileService = {
  upload,
};

export default FileService;
