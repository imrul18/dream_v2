import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FileService from "../../service/FileService";
import MusicCatalogService from "../../service/MusicCatalogService";
import OptionService from "../../service/OptionService";
import AssetsTable from "../Table/AssetsTable";

function Submission({ currentStep, setCurrentStep }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { oldData, updateData } = useSelector((state) => state.reduxStore);

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
    let data = {};
    if (updateData?.title != oldData?.title) {
      data = { ...data, title: updateData?.title };
    }
    if (updateData?.subtitle != oldData?.subtitle) {
      data = { ...data, subtitle: updateData?.subtitle };
    }
    if (updateData?.c_line != oldData?.c_line) {
      data = { ...data, c_line: updateData?.c_line };
    }
    if (updateData?.cover_image != oldData?.cover_image) {
      data = { ...data, cover_image: updateData?.cover_image };
    }
    if (updateData?.featuring != oldData?.featuring) {
      data = { ...data, featuring: updateData?.featuring };
    }
    if (updateData?.format != oldData?.format) {
      data = { ...data, format: updateData?.format };
    }
    if (updateData?.genre != oldData?.genre) {
      data = { ...data, genre: updateData?.genre };
    }
    if (updateData?.label != oldData?.label) {
      data = { ...data, label: updateData?.label };
    }
    if (updateData?.main_release_date != oldData?.main_release_date) {
      data = { ...data, main_release_date: updateData?.main_release_date };
    }
    if (updateData?.original_release_date != oldData?.original_release_date) {
      data = {
        ...data,
        original_release_date: updateData?.original_release_date,
      };
    }
    if (updateData?.p_line != oldData?.p_line) {
      data = { ...data, p_line: updateData?.p_line };
    }
    if (
      updateData?.producer_catalogue_number !=
      oldData?.producer_catalogue_number
    ) {
      data = {
        ...data,
        producer_catalogue_number: updateData?.producer_catalogue_number,
      };
    }
    if (updateData?.production_year != oldData?.production_year) {
      data = { ...data, production_year: updateData?.production_year };
    }
    if (updateData?.upc != oldData?.upc) {
      data = { ...data, upc: updateData?.upc };
    }
    if (
      updateData?.various_art_compilation != oldData?.various_art_compilation
    ) {
      data = {
        ...data,
        various_art_compilation: updateData?.various_art_compilation,
      };
    }
    if (updateData?.tracks != oldData?.tracks) {
      data = {
        ...data,
        tracks: {
          create: updateData?.tracks
            ?.filter(
              (itm) =>
                !oldData?.tracks?.map((item) => item?.id)?.includes(itm?.id)
            )
            .map((item) => {
              return {
                arranger: item?.arranger?.map((item) => ({
                  arranger_name: item,
                })),
                composer: item?.composer?.map((item) => ({
                  composer_name: item,
                })),
                featuring: item?.featuring?.map((item) => ({
                  artist_name: item,
                })),
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
                producer: item?.producer?.map((item) => ({
                  producer_name: item,
                })),
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
          delete: [
            ...oldData?.tracks
              ?.map((item) => item?.id)
              ?.filter(
                (itm) =>
                  !updateData?.tracks?.map((item) => item?.id)?.includes(itm)
              ),
          ],
          update: updateData?.tracks
            ?.filter((itm) =>
              oldData?.tracks?.map((item) => item?.id)?.includes(itm?.id)
            )
            .map((item) => {
              return {
                id: item?.id,
                arranger: item?.arranger?.map((item) => ({
                  arranger_name: item,
                })),
                composer: item?.composer?.map((item) => ({
                  composer_name: item,
                })),
                featuring: item?.featuring?.map((item) => ({
                  artist_name: item,
                })),
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
                producer: item?.producer?.map((item) => ({
                  producer_name: item,
                })),
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
        },
      };
    }
    if (updateData?.primary_artist != oldData?.primary_artist) {
      data = {
        ...data,
        primary_artist: {
          create: updateData?.primary_artist
            ?.filter(
              (itm) =>
                !oldData?.primary_artist
                  ?.map((item) => item?.Primary_Artist_id?.id)
                  ?.includes(itm)
            )
            ?.map((item) => ({
              Release_Music_id: "+",
              Primary_Artist_id: {
                id: item,
              },
            })),
          delete: oldData?.primary_artist?.filter(
            (itm) => !updateData?.primary_artist?.includes(itm)
          ),
          update: [],
        },
      };
    }

    const res = await MusicCatalogService.edit(id, data);
    if (res?.data?.id) {
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
                src={FileService.image(updateData?.cover_image)}
                alt=""
                className="submission_img"
              />
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
              <div className="input_value">
                <p className="input_name">Release Title</p>{" "}
                <span>{updateData?.title ?? ""}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Version/Subtitle</p>{" "}
                <span>{updateData?.subtitle ?? ""}</span>
              </div>

              {updateData?.primary_artist?.map((item, index) => (
                <div className="input_value">
                  <p className="input_name">
                    {index == 0 ? "Primary Artist" : "Secondary Artist"}
                  </p>{" "}
                  <span>
                    {artistOption?.find((itm) => itm?.value == item)?.label ??
                      ""}
                  </span>
                </div>
              ))}
              {updateData?.featuring?.map((itm, index) => (
                <div className="input_value">
                  <p className="input_name">
                    {index == 0 ? "Featuring" : "Secondary Featuring"}
                  </p>{" "}
                  <span>{itm ?? ""}</span>
                </div>
              ))}

              <div className="input_value">
                <p className="input_name">Remixer</p>{" "}
                <span>{updateData?.remixer ?? ""}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Various Artists / Compilation</p>{" "}
                <span>
                  {updateData?.various_art_compilation ? "Yes" : "No"}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">Genre</p>{" "}
                <span>
                  {genreOption?.find((itm) => itm?.value == updateData?.genre)
                    ?.label ?? ""}
                </span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
              <div className="input_value">
                <p className="input_name">Label Name</p>{" "}
                <span>
                  {labelOption?.find((itm) => itm?.value == updateData?.label)
                    ?.label ?? ""}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">Format</p>{" "}
                <span>
                  {formatOption?.find((itm) => itm?.value == updateData?.format)
                    ?.label ?? ""}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">Original Release Date</p>{" "}
                <span>
                  {moment(updateData?.original_release_date).format(
                    "DD-MM-YYYY"
                  ) ?? ""}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">℗ line</p>{" "}
                <span>{updateData?.p_line ?? ""}</span>
              </div>
              <div className="input_value">
                <p className="input_name">℗ line</p>{" "}
                <span>{updateData?.c_line ?? ""}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Production Year</p>{" "}
                <span>{updateData?.production_year ?? ""}</span>
              </div>
              <div className="input_value">
                <p className="input_name">UPC/EAN</p>{" "}
                <span>{updateData?.upc ?? ""}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Producer Catalogue Number</p>
                <span>
                  {updateData?.producer_catalogue_number ?? ""}
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
                  {moment(updateData?.main_release_date).format("DD-MM-YYYY") ??
                    null}
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-lg-12 col-md-12">
              <h2 className="mb-3">Assets</h2>
              <AssetsTable data={updateData?.tracks} />
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
