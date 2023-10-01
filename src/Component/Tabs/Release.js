import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setMusicData } from "../../Pages/reduxStore";
import OptionService from "../../service/OptionService";
import ImageUploadForm from "../ImageUpload/ImageUploadForm";
import MultiInput from "../InputField/MultiInput";
import MultiSelect from "../InputField/MultiSelect";

const Release = ({ currentStep, setCurrentStep }) => {
  const dispatch = useDispatch();
  const { musicData } = useSelector((state) => state.reduxStore);
  const [error, setError] = useState();

  const setData = (data) => {
    dispatch(setMusicData({ ...musicData, ...data }));
  };

  const [artistOption, setArtistOption] = useState([]);
  const [genreOption, setGenreOption] = useState([]);
  const [labelOption, setLabelOption] = useState([]);
  const [formatOption, setFormatOption] = useState([
    { label: "Single", value: "single" },
    { label: "Albam", value: "albam" },
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

  const clickNext = async () => {
    let redirect = true;
    let errorData = {};
    if (musicData?.cover_image) {
      errorData = { ...errorData, cover_image: null };
    } else {
      errorData = { ...errorData, cover_image: "Please upload cover image" };
      redirect = false;
    }

    if (musicData?.title) {
      errorData = { ...errorData, title: null };
    } else {
      errorData = { ...errorData, title: "Please enter title" };
      redirect = false;
    }

    if (musicData?.genre) {
      errorData = { ...errorData, genre: null };
    } else {
      errorData = { ...errorData, genre: "Please select genre" };
      redirect = false;
    }

    if (musicData?.label) {
      errorData = { ...errorData, label: null };
    } else {
      errorData = { ...errorData, label: "Please select label" };
      redirect = false;
    }

    if (musicData?.format) {
      errorData = { ...errorData, format: null };
    } else {
      errorData = { ...errorData, format: "Please select format" };
      redirect = false;
    }

    if (musicData?.original_release_date) {
      errorData = { ...errorData, original_release_date: null };
    } else {
      errorData = {
        ...errorData,
        original_release_date: "Please select original release date",
      };
      redirect = false;
    }

    if (musicData?.production_year) {
      errorData = { ...errorData, production_year: null };
    } else {
      errorData = {
        ...errorData,
        production_year: "Please select production year",
      };
      redirect = false;
    }

    if (musicData?.upc) {
      errorData = { ...errorData, upc: null };
    } else {
      errorData = { ...errorData, upc: "Please enter upc" };
      redirect = false;
    }

    if (musicData?.p_line) {
      errorData = { ...errorData, p_line: null };
    } else {
      errorData = { ...errorData, p_line: "Please enter p_line" };
      redirect = false;
    }

    if (musicData?.c_line) {
      errorData = { ...errorData, c_line: null };
    } else {
      errorData = { ...errorData, c_line: "Please enter c_line" };
      redirect = false;
    }

    if (musicData?.primary_artist?.length) {
      errorData = { ...errorData, primary_artist: null };
    } else {
      errorData = { ...errorData, primary_artist: "Please select primary artist" };
      redirect = false;
    }

    if (redirect) {
      setCurrentStep(currentStep + 1);
    } else {
      setError(errorData);
    }
  };

  return (
    <>
      <div className="steps">
        <div className="row release-row">
          <div className="col-xl-3 col-lg-6 mt-4">
            <ImageUploadForm
              image={musicData?.cover_image}
              onUpload={(link) => setData({ cover_image: link })}
            />
            <small className="text-danger">{error?.cover_image}</small>
          </div>
          <div className="col-xl-3 col-lg-6 mt-4">
            <form className="r_input_group">
              <div className="input_f mt-3">
                <label className="mb-2">
                  Release Title <span className="input_star">*</span>
                </label>
                <input
                  type="text"
                  value={musicData?.title}
                  onChange={(e) => setData({ title: e.target.value })}
                  placeholder="Release Title"
                  required
                />
                <small className="text-danger">{error?.title}</small>
              </div>
              <div className="input_f mt-3">
                <label className="mb-2">Version/Subtitle</label>
                <input
                  type="text"
                  value={musicData?.subtitle}
                  onChange={(e) => setData({ subtitle: e.target.value })}
                  placeholder="Version/Subtitle"
                />
              </div>
              <MultiSelect
                data={musicData?.primary_artist}
                options={artistOption}
                labels={["Primary Artist", "Secondary Artist"]}
                placeholders={"Select Primary Artist"}
                onChange={(item) => setData({ primary_artist: item })}
              />
              <small className="text-danger">{error?.primary_artist}</small>

              <MultiInput
                data={musicData?.featuring}
                labels={["Featuring", "Secondary Featuring"]}
                ids={["input1", "input2"]}
                placeholders={"Featuring"}
                onChange={(item) => setData({ featuring: item })}
              />

              <div className="mt-3">
                <label htmlFor="" className="mb-2">
                  Various Artists / Compilation
                </label>
                <div className="checkbox_item">
                  <div className="item">
                    <input
                      type="checkbox"
                      checked={
                        musicData?.various_art_compilation ? true : false
                      }
                      onChange={(e) =>
                        setData({
                          various_art_compilation: e?.target?.checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xl-3 col-lg-6 mt-4">
            <form className="r_input_group">
              <div className="mt-3">
                <label htmlFor="" className="mb-2">
                  Genre <span className="input_star">*</span>
                </label>
                <Select
                  options={genreOption}
                  value={genreOption?.find(
                    (itm) => itm?.value === musicData?.genre
                  )}
                  onChange={(e) => setData({ genre: e?.value })}
                  placeholder="Select Genre"
                />
                <small className="text-danger">{error?.genre}</small>
              </div>

              <div className="mt-3">
                <label htmlFor="" className="mb-2">
                  Label Name <span className="input_star">*</span>
                </label>
                <Select
                  options={labelOption}
                  value={labelOption?.find(
                    (itm) => itm?.value === musicData?.label
                  )}
                  onChange={(e) => setData({ label: e?.value })}
                  placeholder="Select Label Name"
                />
                <small className="text-danger">{error?.label}</small>
              </div>

              <div className="mt-3">
                <label htmlFor="" className="mb-2">
                  Format <span className="input_star">*</span>
                </label>
                <Select
                  options={formatOption}
                  value={formatOption?.find(
                    (itm) => itm?.value === musicData?.format
                  )}
                  onChange={(e) => setData({ format: e?.value })}
                  placeholder="Select Format"
                />
                <small className="text-danger">{error?.format}</small>
              </div>
              <div className="input_f mt-3">
                <label className="mb-2">
                  Original Release Date <span className="input_star">*</span>
                </label>
                <input
                  type="date"
                  value={musicData?.original_release_date}
                  onChange={(e) =>
                    setData({ original_release_date: e.target.value })
                  }
                  placeholder="Original Release Date"
                />
                <small className="text-danger">{error?.original_release_date}</small>
              </div>
            </form>
          </div>
          <div className="col-xl-3 col-lg-6 mt-4">
            <form className="r_input_group">
              <div className="input_f mt-3">
                <label className="mb-2">℗ line</label> <span className="input_star">*</span>
                <input
                  type="text"
                  value={musicData?.p_line}
                  onChange={(e) => setData({ p_line: e.target.value })}
                  placeholder="℗ line"
                />
                <small className="text-danger">{error?.p_line}</small>
              </div>
              <div className="input_f mt-3">
                <label className="mb-2">© line</label> <span className="input_star">*</span>
                <input
                  type="text"
                  value={musicData?.c_line}
                  onChange={(e) => setData({ c_line: e.target.value })}
                  placeholder="© line"
                />
                <small className="text-danger">{error?.c_line}</small>
              </div>
              <div className="mt-3">
                <label htmlFor="" className="mb-2">
                  Production Year <span className="input_star">*</span>
                </label>
                <Select
                  options={productionYearOption}
                  value={productionYearOption?.find(
                    (itm) => itm?.value === musicData?.production_year
                  )}
                  onChange={(e) => setData({ production_year: e?.value })}
                  placeholder="Select Production Year"
                />
                <small className="text-danger">{error?.production_year}</small>
              </div>
              <div className="input_f mt-3">
                <label className="mb-2">UPC/EAN</label> <span className="input_star">*</span>
                <input
                  type="text"
                  value={musicData?.upc}
                  onChange={(e) => setData({ upc: e.target.value })}
                  placeholder="UPC/EAN"
                />
                <small className="text-danger">{error?.upc}</small>
              </div>
              <div className="input_f mt-3">
                <label className="mb-2">Producer Catalogue Number</label>
                <input
                  type="text"
                  value={musicData?.producer_catalogue_number}
                  onChange={(e) =>
                    setData({ producer_catalogue_number: e.target.value })
                  }
                  placeholder="Producer Catalogue Number"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="btn_area">
        <button className="btn" disabled>
          Back
        </button>
        <button className="btn" onClick={clickNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default Release;
