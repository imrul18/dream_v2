import React, { useEffect, useState } from "react";
import FileService from "../../service/FileService";
import OptionService from "../../service/OptionService";
import AssetsTable from "../Table/AssetsTable";

function Submission({ data, onChange }) {
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

  return (
    <div className="submission_page-info s_info">
      <div className="row">
        <h2 className="mb-4">Release Information</h2>
        <div className="col-xl-4 col-lg-6 col-md-12 mt-3">
          <img src={FileService.image(data?.cover_image)} alt="" className="submission_img" />
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
                {artistOption?.find((itm) => itm?.value == item?.Primary_Artist_id?.id)?.label ??
                  "Not Found"}
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
              {genreOption?.find((itm) => itm?.value == data?.genre)?.label ??
                "Not Found"}
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
              {labelOption?.find((itm) => itm?.value == data?.label)?.label ??
                "Not Found"}
            </span>
          </div>
          <div className="input_value">
            <p className="input_name">Format</p>{" "}
            <span>
              {formatOption?.find((itm) => itm?.value == data?.format)?.label ??
                "Not Found"}
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
  );
}

export default Submission;
