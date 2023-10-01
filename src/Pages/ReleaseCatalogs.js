import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReleseAudioTable from "../Component/Table/ReleaseAudioTable";
import FileService from "../service/FileService";
import MusicCatalogService from "../service/MusicCatalogService";
import OptionService from "../service/OptionService";

function ReleaseCatalogs() {
  const [data, setData] = useState([]);

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
    const res = await MusicCatalogService.get(params);
    const finalData = res?.data?.map((item) => {
      return {
        id: item?.id,
        key: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
        title: (
          <div className="c_tune_table_title">
            <img src={item?.cover_image
                  ? FileService?.image(item.cover_image) : `https://i2.wp.com/ui-avatars.com/api/${item?.title}/400`} alt="" className="table_img" />
            <span>{item?.title}</span>
          </div>
        ),
        label: labelOption?.find(itm=>itm?.id==item?.label)?.label,
        artist: item?.artist_name,
        releaseDate: item?.main_release_date,
        artist: artistOption?.find(itm=>itm?.id==item?.primary_artist[0])?.label,
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
      <div className="section_title">
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
