import React, { useEffect, useState } from "react";
import CallerTuneTable from "../Component/Table/CallerTuneTable";
import MusicCatalogService from "../service/MusicCatalogService";

function CallerTune() {
  const [data, setData] = useState([]);

  const getData = async (params) => {
    const res = await MusicCatalogService.CallerTune(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        ...item,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),        
      };
    });
    setData(finalData);
  };

  const onSearch = async (value) => {
    getData({search: value});
  };    

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="section_title">
        <div className="text_area">
          <h1>Caller Tune</h1>
        </div>
      </div>
      <div className="table_content">
        <CallerTuneTable data={data} onSearch={onSearch} />
      </div>
    </>
  );
}

export default CallerTune;
