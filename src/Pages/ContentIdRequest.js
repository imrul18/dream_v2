import moment from "moment";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "../Component/Button/PrimaryBtn";
import InputField from "../Component/InputField/InputField";
import ContentIdRequestTable from "../Component/Table/ContentIdRequestTable";
import ContentIDService from "../service/ContentIDService";

function ContentIdRequest() {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (e) => {
    const data = {
      upc: name,
    };
    const res = await ContentIDService.add(data);
    if (res) {
      setName("");
      getData();
    }
  };

  const [data, setData] = useState([]);
  const getData = async (params) => {
    const res = await ContentIDService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        date: moment(item?.date_created).format("DD-MM-YYYY"),
        UPC_EAN: item?.upc,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
        failed_reason: item?.failed_reason,
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

  return (
    <>
      <div className="yt-ex-bg">
        <div className="section_title">
          <div className="text_area">
            <h2>Content Id Request</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <InputField
              label="UPC/EAN"
              value={name}
              star="*"
              onChange={handleNameChange}
            />
            <div className="mt-4">
              <PrimaryBtn label="Submit" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="table_content">
        <h2 className="mb-5">All History</h2>
        <ContentIdRequestTable data={data} onSearch={onSearch} />
      </div>
    </>
  );
}

export default ContentIdRequest;
