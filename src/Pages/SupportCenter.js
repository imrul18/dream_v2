import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import PrimaryBtn from "../Component/Button/PrimaryBtn";
import InputField from "../Component/InputField/InputField";
import SupportHistoryTable from "../Component/Table/SupportHistoryTable";
import TextField from "../Component/TextBox/TextField";
import UploadButton from "../Component/UploadBtn/UploadButton";
import SupportService from "../service/SupportService";

function SupportCenter() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event);
  };

  const [data, setData] = useState([]);

  const getData = async (params) => {
    const res = await SupportService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        id: item?.id,
        title: item?.title,
        message: item?.message,
        last_up: moment(item?.date_updated ?? item?.date_created)?.format(
          "DD MMM YY - hh:mm A"
        ),
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
      };
    });
    setData(finalData);
  };

  const onSearch = async (value) => {
    getData({ search: value });
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async () => {
    const res = await SupportService.add({title: name, message});
    if (res) {
      getData();
    }
  };

  return (
    <div className="support_page">
      <div className="row">
        <div className="col-lg-8 col-md-6 col-sm-12">
          <div className="s_problem_box">
            <h2>Let me know your problem</h2>
            <div>
              <InputField
                label="Title"
                star="*"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                label="Messages"
                star="*"
                type="text"
                value={message}
                onChange={handleMessageChange}
              />
              <div className="support_file mt-3">
                <UploadButton onChange={handleFileChange} />
              </div>
              <div className="mt-3">
                <PrimaryBtn label="Submit" onClick={onSubmit} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="connect_wp">
            <IoLogoWhatsapp className="icons" />
            <p>Live WhatsApp Support</p>
            <button className="btn">Chet Now</button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12 p-0">
          <div className="s_history">
            <h2 className="mb-5">History</h2>
            <div className="table_content mt-3">
              <SupportHistoryTable data={data} onSearch={onSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportCenter;
