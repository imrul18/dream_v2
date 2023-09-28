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
        title: (
          <div className="c_tune_table_title">
            <img src={item?.image} alt="" className="table_img" />
            <span>
              Title Here
            </span>
          </div>
        ),
        // artist: "Artist Name",
        // label: "no info",
        // upc: <span>UPC: 10 </span>,
        // stores: (
        //   <div className="sim_icons">
        //     <img src={airtelLogo} alt="" />
        //     <img src={vodafoneLogo} alt="" />
        //   </div>
        // ),
        // status: "Pending",

        // key: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
        // title: (
        //   <div className="c_tune_table_title">
        //     <img src={item?.cover_image} alt="" className="table_img" />
        //     <span>{item?.title}</span>
        //   </div>
        // ),
        // label: item?.label_name,
        // artist: item?.artist_name,
        // releaseDate: item?.main_release_date,
        // artist: "Afnan",
        // upc: <span>{item?.upc}</span>,
        // status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),        
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
