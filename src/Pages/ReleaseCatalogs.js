import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReleseAudioTable from "../Component/Table/ReleaseAudioTable";
import FileService from "../service/FileService";
import MusicCatalogService from "../service/MusicCatalogService";
import OptionService from "../service/OptionService";

function ReleaseCatalogs() {
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: ReleaseCatalogs.js:10 ~ ReleaseCatalogs ~ data:", data)

  const [artistOption, setArtistOption] = useState([]);  
  const [labelOption, setLabelOption] = useState([]);
  
  const getOptions = async () => {
    const label = await OptionService.label();
    setLabelOption(
      label?.data?.map((itm) => ({ ...itm, value: itm?.id, label: itm?.title }))
    );
    const artist = await OptionService.artist();
    setArtistOption(
      artist?.data?.map((itm) => ({
        ...itm,
        value: itm?.id,
        label: itm?.name,
      }))
    );
    getData()
  };

  useEffect(() => {
    getOptions();
  }, []);


  const getData = async (params) => {
    const res = await MusicCatalogService.getList(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        id: item?.id,
        key: item?.index,
        title: (
          <div className="c_tune_table_title">
            <img src={item?.cover_image
                  ? FileService?.image(item.cover_image?.id) : `https://i2.wp.com/ui-avatars.com/api/${item?.title}/400`} alt="" className="table_img" />
            <span>{item?.title}</span>
          </div>
        ),
        label: item?.label?.title,
        artist: item?.primary_artist?.length ? item?.primary_artist[0]?.Primary_Artist_id?.name : null,
        releaseDate: item?.main_release_date,
        upc: <span>{item?.upc}</span>,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
        rejection: item?.reject_reason ?? "",
      };
    });
    setData(finalData);
  };

  const onSearch = async (value) => {
    getData({ search: value });
  };

  return (
    <>
      <div className="section_title mt-4">
        <div className="text_area">
          <h2>All Release Catalogs</h2>
        </div>
        <div className="btn_area">
          <Link to="/release-audio">
            <button className="btn">Create Release</button>
          </Link>
        </div>
      </div>
      <div className="relese_audio_filter_btn_add  mt-4">
        <ReleseAudioTable data={data} onSearch={onSearch} />
      </div>
    </>
  );
}

export default ReleaseCatalogs;
