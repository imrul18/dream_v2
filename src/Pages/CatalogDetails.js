import React, { useEffect, useRef, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { FaAngleDown, FaAngleUp, FaPause, FaPlay } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CallerTunePopup from "../Component/Modal/CallerTunePopup";
import DeletePopup from "../Component/Modal/DeletePopup";
import AntPopover from "../Component/Popover/AntPopover";
import FileService from "../service/FileService";
import MusicCatalogService from "../service/MusicCatalogService";

function CatalogDetails() {
  const audioRef = useRef(null);
  const { id } = useParams();
  const [data, setData] = useState({});

  const getData = async () => {
    const res = await MusicCatalogService.show(id);
    setData(res?.data);
  };

  useEffect(() => {
    if (id) getData();
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
        <Link to={`/release-audio/${data?.id}`} className="pen">
          <BiPencil className="icons" />
        </Link>
        {/* <DeletePopup /> */}
        <AntPopover message={data?.reject_reason} />
      </div>
    );
    statusClassName = "c_request";
    text = "Correction Request";
  }

  const CustomAudioPlayer = ({ audio }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

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

    return (
      <div className="custom-audio-player">
        <audio ref={audioRef} src={FileService.image(audio)} />
        <button className="play_btn" onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    );
  };

  return (
    <div className="catalog_details">
      <div className="catalog_area">
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-sm-12">
            <div className="cover_img">
              <img
                src={
                  data?.cover_image
                    ? FileService?.image(data?.cover_image?.id)
                    : `https://i2.wp.com/ui-avatars.com/api/${data?.title}/400`
                }
                alt=""
              />
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
                  {data?.primary_artist?.length &&
                    data?.primary_artist[0]?.Primary_Artist_id?.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.tracks?.map((itm) => (
        <div className="catalog_release_info">
          <div className="song_info">
            <div className="title">
              <CustomAudioPlayer audio={itm?.file?.id} />
              <div>
                <h2>{itm?.title}</h2>
                <p>
                  By{" "}
                  {itm?.primary_artist?.length &&
                    itm?.primary_artist[0]?.Primary_Artist_id?.name}
                </p>
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
                      <p className="input_name">Title</p>{" "}
                      <span>{itm?.title ?? ""}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Version/Subtitle</p>
                      <span>{itm?.subtitle ?? ""}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Primary Artist </p>
                      <span>
                        {itm?.primary_artist?.length &&
                          itm?.primary_artist[0]?.Primary_Artist_id?.name}
                      </span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12">
                    <div className="input_value">
                      <p className="input_name">Lyrics Writter</p>
                      <span>
                        {itm?.lyrics_writer?.length
                          ? itm?.lyrics_writer[0]?.writer_name
                          : ""}
                      </span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Composer</p>
                      <span>
                        {itm?.composer?.length
                          ? itm?.composer[0]?.composer_name
                          : ""}
                      </span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">ISRC</p>
                      <span>{itm?.isrc ?? ""}</span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12">
                    <div className="input_value">
                      <p className="input_name">Genre</p>{" "}
                      <span>{itm?.genre ?? ""}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Lyrics Language</p>{" "}
                      <span>{itm?.lyrics_language ?? ""}</span>
                    </div>
                    <div className="input_value">
                      <p className="input_name">Track Title Language</p>{" "}
                      <span>{itm?.track_title_language ?? ""}</span>
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
              <span>{data?.label?.title ?? ""}</span>
            </div>
            <div className="input_value">
              <p className="input_name">UPC/EAN</p>
              <span>{data?.upc ?? ""}</span>
            </div>
            <div className="input_value">
              <p className="input_name">℗ line</p>
              <span>{data?.p_line ?? ""}</span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12">
            <div className="input_value">
              <p className="input_name">© line</p>
              <span>{data?.c_line ?? ""}</span>
            </div>
            <div className="input_value">
              <p className="input_name">Production Year</p>
              <span>{data?.production_year ?? ""}</span>
            </div>
            <div className="input_value">
              <p className="input_name">Genre</p>
              <span>{data?.genre ?? ""}</span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12">
            <div className="input_value">
              <p className="input_name">Format</p>
              <span>{data?.format ?? ""}</span>
            </div>
            <div className="input_value">
              <p className="input_name">Original Release Date</p>
              <span>{data?.original_release_date ?? ""}</span>
            </div>
            <div className="input_value">
              <p className="input_name">Main Release Date</p>
              <span>{data?.main_release_date ?? ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogDetails;
