import React, { useEffect, useState } from "react";
import FileService from "../../service/FileService";
import OptionService from "../../service/OptionService";
import AssetsTable from "../Table/AssetsTable";

function Submission({ data, onChange, currentStep, setCurrentStep }) {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(
      data?.tracks?.map((itm, index) => ({
        key: index,
        file: itm?.file,
        title: itm?.title,
        subtitle: itm?.subtitle,
        isrc: itm?.isrc,
      }))
    );
  }, [data]);

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


  //  const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     title: musicData?.title,
  //     subtitle: musicData?.subtitle,
  //     c_line: musicData?.c_line,
  //     cover_image: musicData?.cover_image,
  //     featuring: musicData?.featuring,
  //     format: musicData?.format,
  //     genre: musicData?.genre,
  //     label: musicData?.label,
  //     main_release_date: musicData?.main_release_date,
  //     original_release_date: musicData?.original_release_date,
  //     p_line: musicData?.p_line,
  //     primary_artist: musicData?.primary_artist,
  //     producer_catalogue_number: musicData?.producer_catalogue_number,
  //     production_year: musicData?.production_year,
  //     upc: musicData?.upc,
  //     various_art_compilation: musicData?.various_art_compilation,
  //     tracks: {
  //       create: musicData?.tracks?.map((item) => {
  //         return {
  //           arranger: item?.arranger,
  //           composer:item?.composer,
  //           featuring: item?.featuring,
  //           file: item?.file, //this is missing
  //           genre: item?.genre,
  //           instrumental: item?.instrumental,
  //           isrc: item?.isrc,
  //           lyrics: item?.lyrics,
  //           lyrics_language: item?.lyrics_language,
  //           lyrics_writter: item?.lyrics_writter,
  //           p_line: item?.p_line,
  //           parental_advisory: item?.parental_advisory,
  //           primary_artist: item?.primary_artist,
  //           producer: item?.producer,
  //           producer_catalogue_number: item?.producer_catalogue_number,
  //           production_year: item?.production_year,
  //           publisher: item?.publisher,
  //           remixer: item?.remixer,
  //           secondary_track_type: item?.secondary_track_type,
  //           subtitle: item?.subtitle,
  //           title: item?.title,
  //           track_title_language: item?.track_title_language,
  //         };
  //       }),
  //       delete: [],
  //       update: [],
  //     },
  //   };
  //   const res = await MusicCatalogService.add(data);
  // };

  return (
    <>
      <div className="steps">
        <div className="submission_page-info s_info">
          <div className="row">
            <h2 className="mb-4">Release Information</h2>
            <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
              <img
                src={FileService.image(data?.cover_image)}
                alt=""
                className="submission_img"
              />
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
              <div className="input_value">
                <p className="input_name">Release Title</p>{" "}
                <span>{data?.title ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Version/Subtitle</p>{" "}
                <span>{data?.subtitle ?? "Not Found"}</span>
              </div>

              {data?.primary_artist?.create?.map((item) => (
                <div className="input_value">
                  <p className="input_name">Primary Artist</p>{" "}
                  <span>
                    {artistOption?.find(
                      (itm) => itm?.value == item?.Primary_Artist_id?.id
                    )?.label ?? "Not Found"}
                  </span>
                </div>
              ))}
              {data?.featuring?.map((itm) => (
                <div className="input_value">
                  <p className="input_name">Featuring</p>{" "}
                  <span>{itm?.artist_name ?? "Not Found"}</span>
                </div>
              ))}

              {/* <div className="input_value">
            <p className="input_name">Remixer</p> <span>Not Found</span>
          </div> */}
              <div className="input_value">
                <p className="input_name">Various Artists / Compilation</p>{" "}
                <span>{data?.various_art_compilation ? "Yes" : "No"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Genre</p>{" "}
                <span>
                  {genreOption?.find((itm) => itm?.value == data?.genre)
                    ?.label ?? "Not Found"}
                </span>
              </div>
              {/* <div className="input_value">
            <p className="input_name">Subgenre</p> <span>Not Found</span>
          </div> */}
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
              <div className="input_value">
                <p className="input_name">Label Name</p>{" "}
                <span>
                  {labelOption?.find((itm) => itm?.value == data?.label)
                    ?.label ?? "Not Found"}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">Format</p>{" "}
                <span>
                  {formatOption?.find((itm) => itm?.value == data?.format)
                    ?.label ?? "Not Found"}
                </span>
              </div>
              <div className="input_value">
                <p className="input_name">Original Release Date</p>{" "}
                <span>{data?.original_release_date ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">℗ line</p>{" "}
                <span>{data?.p_line ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">℗ line</p>{" "}
                <span>{data?.c_line ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Production Year</p>{" "}
                <span>{data?.production_year ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">UPC/EAN</p>{" "}
                <span>{data?.upc ?? "Not Found"}</span>
              </div>
              <div className="input_value">
                <p className="input_name">Producer Catalogue Number</p>
                <span>{data?.producer_catalogue_number ?? "Not Found"}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-lg-4 col-md-12">
              <h2 className="mb-3">Release Date</h2>
              <div className="input_value">
                <p className="input_name">Main Release Date</p>
                <span>{data?.main_release_date ?? null}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row mt-3">
            <div className="col-lg-12 col-md-12">
              <h2 className="mb-3">Assets</h2>
              <AssetsTable data={tableData} />
            </div>
          </div>
        </div>
      </div>
      <div className="btn_area">
        <button className="btn" onClick={() => setCurrentStep(currentStep - 1)}>
          Back
        </button>
        <button className="btn" onClick={() => setCurrentStep(currentStep + 1)}>
          Submit
        </button>
      </div>
    </>
  );
}

export default Submission;
