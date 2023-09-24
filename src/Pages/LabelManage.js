import React, { useEffect, useState } from "react";
import LabelManagePopup from "../Component/Modal/LabelManagePopup";
import LabelManageTable from "../Component/Table/LabelManageTable";
import LabelService from "../service/LabelService";

function LabelManage() {
  const [data, setData] = useState([]);

  const getData = async (params) => {
    const res = await LabelService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        id: item?.id,
        name: item?.title,
        youtube_url: item?.youtube_url,
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
    <div className="label_manage">
      <div className="section_title">
        <div className="text_area">
          <h1>Label Manage</h1>
        </div>
        <LabelManagePopup onSubmit={getData}/>
      </div>
      <div className="table_content mt-4">
        <LabelManageTable data={data} onSearch={onSearch} />
      </div>
    </div>
  );
}

export default LabelManage;
