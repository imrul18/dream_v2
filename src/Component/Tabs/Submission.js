import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMusicData } from "../../Pages/reduxStore";
import FileService from "../../service/FileService";
import MusicCatalogService from "../../service/MusicCatalogService";
import OptionService from "../../service/OptionService";
import AssetsTable from "../Table/AssetsTable";

function Submission({ currentStep, setCurrentStep }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { musicData } = useSelector((state) => state.reduxStore);

  const [artistOption, setArtistOption] = useState([]);
  const [genreOption, setGenreOption] = useState([]);
  const [labelOption, setLabelOption] = useState([]);
  const [formatOption, setFormatOption] = useState([
    { label: "Single", value: 1 },
    { label: "Albam", value: 2 },
  ]);
  const [productionYearOption, setProductionYearOption] = useState([]);
  const getYearOptions = async () => {
    const Year = new Date().getFullYear();
    const array = [];
    for (let index = Year - 3; index < Year + 3; index++) {
      array?.push({ label: index, value: index });
      setProductionYearOption(array);
    }
  };

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
    getYearOptions();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: musicData?.title,
      subtitle: musicData?.subtitle,
      c_line: musicData?.c_line,
      cover_image: musicData?.cover_image,
      featuring: musicData?.featuring?.map((item) => ({ artist_name: item })),
      format: musicData?.format,
      genre: musicData?.genre,
      label: musicData?.label,
      main_release_date: musicData?.main_release_date,
      original_release_date: musicData?.original_release_date,
      p_line: musicData?.p_line,
      primary_artist: {
        create: musicData?.primary_artist?.map((item) => ({
          Release_Music_id: "+",
          Primary_Artist_id: {
            id: item,
          },
        })),
        delete: [],
        update: [],
      },
      producer_catalogue_number: musicData?.producer_catalogue_number,
      production_year: musicData?.production_year,
      upc: musicData?.upc,
      various_art_compilation: musicData?.various_art_compilation,
      tracks: {
        create: musicData?.tracks?.map((item) => {
          return {
            arranger: item?.arranger?.map((item) => ({ arranger_name: item })),
            composer: item?.composer?.map((item) => ({ composer_name: item })),
            featuring: item?.featuring?.map((item) => ({ artist_name: item })),
            file: item?.file,
            genre: item?.genre,
            instrumental: item?.instrumental,
            isrc: item?.isrc,
            lyrics: item?.lyrics,
            lyrics_language: item?.lyrics_language,
            lyrics_writter: item?.lyrics_writter?.map((item) => ({
              writer_name: item,
            })),
            p_line: item?.p_line,
            parental_advisory: item?.parental_advisory,
            primary_artist: {
              create: item?.primary_artist?.map((item) => ({
                Release_Music_id: "+",
                Primary_Artist_id: {
                  id: item,
                },
              })),
              delete: [],
              update: [],
            },
            producer: item?.producer?.map((item) => ({ producer_name: item })),
            producer_catalogue_number: item?.producer_catalogue_number,
            production_year: item?.production_year,
            publisher: item?.publisher,
            remixer: item?.remixer,
            secondary_track_type: item?.secondary_track_type,
            subtitle: item?.subtitle,
            title: item?.title,
            track_title_language: item?.track_title_language,
          };
        }),
        delete: [],
        update: [],
      },
    };
    const res = await MusicCatalogService.add(data);
    if (res?.data?.id) {
      dispatch(setMusicData(null));
      navigate(`/catalog_details/${res?.data?.id}`);
    }
  };

  return (
    <>
      <div className="steps">
        <div className="submission_page-info s_info">
          <div className="row">
            <h2 className="mb-4">Release Information</h2>
            <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
              <img
                src={FileService.image(musicData?.cover_image)}
                alt=""
                className="submission_img"
              />
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
              <div className="input_value">
                <p className="input_name">Release Title</p>{" "}
                <span>{musicData?.title ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Version/Subtitle</p>{" "}
                <span>{musicData?.subtitle ?? "Not Found"}</span>
              </div>

              {musicData?.primary_artist?.map((item, index) => (
                <div className="input_value">
                  <p className="input_name">
                    {index == 0 ? "Primary Artist" : "Secondary Artist"}</p>{" "}
                  <span>
                    {artistOption?.find((itm) => itm?.value == item)?.label ??
                      "Not Found"}
                  </span>
                </div>
              ))}
              {musicData?.featuring?.map((itm, index) => (
                <div className="input_value">
                  <p className="input_name">
                    {index == 0 ? "Featuring" : "Secondary Featuring"}</p>{" "}
                  <span>{itm ?? "Not Found"}</span>
                </div>
              ))}

              <div className="input_value">
                <p className="input_name">Remixer</p>{" "}
                <span>{musicData?.remixer ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Various Artists / Compilation</p>{" "}
                <span>{musicData?.various_art_compilation ? "Yes" : "No"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Genre</p>{" "}
                <span>
                  {genreOption?.find((itm) => itm?.value == musicData?.genre)
                    ?.label ?? "Not Found"}
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
              <div className="input_value">
                <p className="input_name">Label Name</p>{" "}
                <span>
                  {labelOption?.find((itm) => itm?.value == musicData?.label)
                    ?.label ?? "Not Found"}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">Format</p>{" "}
                <span>
                  {formatOption?.find((itm) => itm?.value == musicData?.format)
                    ?.label ?? "Not Found"}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">Original Release Date</p>{" "}
                <span>
                  {moment(musicData?.original_release_date).format(
                    "DD-MM-YYYY"
                  ) ?? "Not Found"}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">℗ line</p>{" "}
                <span>{musicData?.p_line ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">℗ line</p>{" "}
                <span>{musicData?.c_line ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Production Year</p>{" "}
                <span>{musicData?.production_year ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">UPC/EAN</p>{" "}
                <span>{musicData?.upc ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Producer Catalogue Number</p>
                <span>
                  {musicData?.producer_catalogue_number ?? "Not Found"}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-lg-4 col-md-12">
              <h2 className="mb-3">Release Date</h2>
              <div className="input_value">
                <p className="input_name">Main Release Date</p>
                <span>
                  {moment(musicData?.main_release_date).format("DD-MM-YYYY") ??
                    null}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-lg-12 col-md-12">
              <h2 className="mb-3">Assets</h2>
              <AssetsTable data={musicData?.tracks} />
            </div>
          </div>
        </div>
      </div>
      <div className="btn_area">
        <button className="btn" onClick={() => setCurrentStep(currentStep - 1)}>
          Back
        </button>
        <button className="btn" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

export default Submission;
