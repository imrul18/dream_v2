import React, { useEffect, useRef, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { FaAngleDown, FaAngleUp, FaPause, FaPlay } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CallerTunePopup from "../Component/Modal/CallerTunePopup";
import DeletePopup from "../Component/Modal/DeletePopup";
import AntPopover from "../Component/Popover/AntPopover";
import FileService from "../service/FileService";
import MusicCatalogService from "../service/MusicCatalogService";
import OptionService from "../service/OptionService";

function CatalogDetails() {
  const audioRef = useRef(null);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    const val = [];
    for (let i = 0; i < data?.tracks?.length; i++) {
      const res = await MusicCatalogService.tracks(data?.tracks[i]);
      val?.push(res?.data);
    }
    setTracks(val);
  };

  useEffect(() => {
    getTracks();
  }, [data]);

  const getData = async () => {
    const res = await MusicCatalogService.show(id);
    setData(res?.data);
  };

  const [artistOption, setArtistOption] = useState([]);
  const [genreOption, setGenreOption] = useState([]);
  const [labelOption, setLabelOption] = useState([]);
  const [formatOption, setFormatOption] = useState([
    { label: "Single", value: "single" },
    { label: "Albam", value: "albam" },
  ]);

  const getOptions = async () => {
    const genre = await OptionService.genre();
    setGenreOption(genre?.data);
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
  };

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    getData();
  }, [id]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleInfoVisibility = () => {
    setIsInfoVisible((prevIsInfoVisible) => !prevIsInfoVisible);
  };

  let icon = null;
  let statusClassName = "";
  let text = "";

  // Your status conditionals
  if (data?.status === "pending") {
    icon = <div className="r_edit_delete"></div>;
    statusClassName = "pending";
    text = "Pending";
  } else if (data?.status === "ongoing") {
    icon = <div className="r_edit_delete"></div>;
    statusClassName = "unfinished";
    text = "Ongoing";
  } else if (data?.status === "published") {
    icon = (
      <div className="r_edit_delete">
        <CallerTunePopup id={data?.id} />
      </div>
    );
    statusClassName = "approved";
    text = "Published";
  } else if (data?.status === "rejected") {
    icon = (
      <div className="r_edit_delete">
        <DeletePopup onClick={() => console.log("A")} />
        <AntPopover message={data?.reject_reason} />
      </div>
    );
    statusClassName = "rejected";
    text = "Rejected";
  } else if (data?.status === "correction_request") {
    icon = (
      <div className="r_edit_delete">
        <Link to="/release-audio" className="pen">
          <BiPencil className="icons" />
        </Link>
        {/* <DeletePopup /> */}
        <AntPopover message={data?.reject_reason} />
      </div>
    );
    statusClassName = "c_request";
    text = "Correction Request";
  }

  return (
    <div className="catalog_details">
      <div className="catalog_area">
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-sm-12">
            <div className="cover_img">
              <img src={data?.cover_image
                  ? FileService?.image(data?.cover_image) : `https://i2.wp.com/ui-avatars.com/api/${data?.title}/400`} alt=""  />
            </div>
          </div>
          <div className="col-xl-9 col-lg-6 col-sm-12">
            <div className="cover_text_content">
              <div className="cover_header">
                <p className={`status ${statusClassName}`}>{text}</p>
                <div className="cover_edit">{icon}</div>
              </div>
              <div className="covr_title">
                <h1>{data?.title}</h1>
                <h2>
                  by{" "}
                  {artistOption?.find(
                    (itm) => itm?.id == data?.primary_artist[0]
                  )?.label ?? "--"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tracks?.map((itm) => (
        <div className="catalog_release_info">
          <div className="song_info">
            <div className="title">
              <div className="custom-audio-player">
                <audio ref={audioRef} src={itm?.file && FileService?.image(itm?.file)} />
                <button className="play_btn" onClick={togglePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
              <div>
                <h2>{itm?.title}</h2>
                <p>By {artistOption?.find(
                    (item) => item?.id == itm?.primary_artist[0]
                  )?.label ?? "--"}</p>
              </div>
            </div>
            <div className="toggle_icons" onClick={toggleInfoVisibility}>
              {isInfoVisible ? (
                <FaAngleUp className="icons active" />
              ) : (
                <FaAngleDown className="icons" />
              )}
            </div>
          </div>
          {isInfoVisible && (
            <div className="catalog_toggle_info">
              <hr />
              <div className="s_info">
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-12 ">
                    <div className="input_value">
                      <p className="input_name">Title</p> <span>{itm?.title ?? "Not Found"}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Version/Subtitle</p>
                      <span>{itm?.subtitle ?? "Not Found"}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Primary Artist </p>
                      <span>{artistOption?.find((item) => item?.id == itm?.primary_artist[0])?.label ??
                  "Not Found"}</span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12">
                    <div className="input_value">
                      <p className="input_name">Lyrics Writter</p>
                      <span>{itm?.lyrics_writer?.length ? itm?.lyrics_writer[0]?.writer_name :"Not Found"}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Composer</p>
                      <span>{itm?.composer?.length ? itm?.composer[0]?.composer_name :"Not Found"}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">ISRC</p>
                      <span>{itm?.isrc ?? "Not Found"}</span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12">
                    <div className="input_value">
                      <p className="input_name">Genre</p> <span>{itm?.genre ?? "Not Found"}</span>
                    </div>                    
                    <div className="input_value">
                      <p className="input_name">Lyrics Language</p>{" "}
                      <span>{itm?.lyrics_language ?? "Not Found"}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Track Title Language</p>{" "}
                      <span>{itm?.track_title_language ?? "Not Found"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="catalog_release_info s_info mt-3">
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-12">
            <div className="input_value">
              <p className="input_name">Label Name</p>
              <span>
                {labelOption?.find((itm) => itm?.id == data?.label)?.label ??
                  "Not Found"}
              </span>
            </div>
            <div className="input_value">
              <p className="input_name">UPC/EAN</p>
              <span>{data?.upc ?? "Not Found"}</span>
            </div>
            <div className="input_value">
              <p className="input_name">℗ line</p>
              <span>{data?.p_line ?? "Not Found"}</span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12">
            <div className="input_value">
              <p className="input_name">© line</p>
              <span>{data?.c_line ?? "Not Found"}</span>
            </div>
            <div className="input_value">
              <p className="input_name">Production Year</p>
              <span>{data?.production_year ?? "Not Found"}</span>
            </div>
            <div className="input_value">
              <p className="input_name">Genre</p>
              <span>{data?.genre ?? "Not Found"}</span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12">
            <div className="input_value">
              <p className="input_name">Format</p>
              <span>
                {formatOption?.find((itm) => itm?.value == data?.format)
                  ?.label ?? "Not Found"}
              </span>
            </div>
            <div className="input_value">
              <p className="input_name">Original Release Date</p>
              <span>{data?.original_release_date ?? "Not Found"}</span>
            </div>
            <div className="input_value">
              <p className="input_name">Main Release Date</p>
              <span>{data?.main_release_date ?? "Not Found"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogDetails;
