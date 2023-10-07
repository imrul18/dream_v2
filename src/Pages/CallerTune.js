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
        id: item?.id,
        title: item?.release_music?.title,
        image: item?.release_music?.cover_image?.id,
        artist: item?.release_music?.primary_artist?.length
          ? item?.release_music?.primary_artist[0]?.Primary_Artist_id?.name
          : null,
        label: item?.release_music?.label?.title,
        upc: item?.release_music?.upc,
        stores: item?.crbt?.map((item) => item?.CRBT_id?.icon?.id),
        failed_reason: item?.failed_reason,
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
