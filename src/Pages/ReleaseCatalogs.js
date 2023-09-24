import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ReleseAudioTable from "../Component/Table/ReleaseAudioTable";
import MusicCatalogService from "../service/MusicCatalogService";

function ReleaseCatalogs() {
  const [data, setData] = useState([]);

  const getData = async (params) => {
    const res = await MusicCatalogService.get(params);
    const finalData = res?.data?.map((item) => {
      return {
        // {
        //   key: "Approved",
        //   title: (
        //     <div className="c_tune_table_title">
        //       <img src={coverImg} alt="" className="table_img" />
        //       <span>Title Here</span>
        //     </div>
        //   ),
        //   label: "no info",
        //   artist: "name here",
        //   releaseDate: "22-6-2023",
        //   upc: <span>123456</span>,
        //   status: "Approved",
        // },

        key: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
        title: (
          <div className="c_tune_table_title">
            <img src={item?.cover_image} alt="" className="table_img" />
            <span>{item?.title}</span>
          </div>
        ),
        label: item?.label_name,
        artist: item?.artist_name,
        releaseDate: item?.main_release_date,
        artist: "Afnan",
        upc: <span>{item?.upc}</span>,
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
          <h2>All Release Catalogs</h2>
        </div>
        <div className="btn_area">
          <Link to="/release-audio"><button className="btn">Create Release</button></Link>
        </div>
      </div>
      <div className="relese_audio_filter_btn_add  mt-4">
        <ReleseAudioTable data={data} onSearch={onSearch} />
      </div>
    </>
  );
}

export default ReleaseCatalogs;
