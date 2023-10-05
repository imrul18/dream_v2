import { Upload } from "antd";
import { useState } from "react";
import FileService from "../../service/FileService";
const UploadButton = ({ onChange }) => {
  const [fileList, setFileList] = useState(null);
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await FileService.upload(formData);
    if (res) {
      onChange(res?.data?.id);
      setFileList(file);
    }
  };

  return (
    <Upload fileList={fileList}>
      {/* <UploadOutlined className="icons" /> */}
      <div class="ant-upload ant-upload-select">
        <span tabindex="0" class="ant-upload" role="button">
          <input type="file" accept="" hidden onChange={handleChange} />
          <button class="btn_s">
            <span
              role="img"
              aria-label="upload"
              class="anticon anticon-upload icons"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="upload"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </span>
            Upload
          </button>
        </span>
      </div>
    </Upload>
  );
};

export default UploadButton;
