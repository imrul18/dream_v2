import React, { useEffect, useState } from "react";
import PrimaryArtistAddPopup from "../Component/Modal/PrimaryArtistAddPopup";
import SearchBar from "../Component/SearchBar/SearchBar";
import PrimaryArtistTable from "../Component/Table/PrimaryArtistTable";
import PrimaryArtistService from "../service/PrimaryArtistService";

function PrimaryArtistManage() {
  const [data, setData] = useState([]);

  const getData = async (params) => {
    const res = await PrimaryArtistService.get(params);
    const finalData = res?.data?.map((item) => {
      return {
        id: item?.id,
        name: (
          <div className="c_tune_table_title">
            <img src={item?.image ?? `https://i2.wp.com/ui-avatars.com/api/${item?.name}/400`} alt="" className="table_user_img" />
            <span>{item?.name}</span>
          </div>
        ),
        SId: item?.spotify_id,
        AId: item?.apple_id,
        FId: item?.facebook_url,
        IId: item?.instagram_id,
        YCU: item?.youtube_channel_url,
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
    <div>
      <div className="section_title border_bottom">
        <div className="text_area">
          <h1>Primary Artist</h1>
        </div>
        <hr className="mt-4" />
        <PrimaryArtistAddPopup onSubmit={getData}/>
      </div>
      <div className="table_content mt-4">
        <div className="table_title">
          <p>Show 4 entries</p>
          <SearchBar onSearch={onSearch}/>
        </div>
        <PrimaryArtistTable data={data} onEdit={getData} />
      </div>
    </div>
  );
}

export default PrimaryArtistManage;
