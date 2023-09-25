import React, { useEffect, useState } from "react";
import Select from "react-select";
import OptionService from "../../service/OptionService";
import ImageUploadForm from "../ImageUpload/ImageUploadForm";
import IconInputField from "../InputField/IconInputField";
import MultiSelect from "../InputField/MultiSelect";

const Release = ({ data, onChange }) => {
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

  const [featuring, setFeaturing] = useState("");

  const handleFeaturingChange = (event) => {
    // setFeaturing(event.target.value);
  };

  return (
    <>
      <div className="row release-row">
        <div className="col-xl-3 col-lg-6 mt-4">
          <ImageUploadForm
            onUpload={(link) => onChange({ cover_image: link })}
          />
        </div>
        <div className="col-xl-3 col-lg-6 mt-4">
          <form className="r_input_group">
            <div className="input_f mt-3">
              <label className="mb-2">
                Release Title <span className="input_star">*</span>
              </label>
              <input
                type="text"
                value={data?.title}
                onChange={(e) => onChange({ title: e.target.value })}
                placeholder="Release Title"
                required
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Version/Subtitle</label>
              <input
                type="text"
                value={data?.subtitle}
                onChange={(e) => onChange({ subtitle: e.target.value })}
                placeholder="Version/Subtitle"
              />
            </div>
            <MultiSelect
              options={artistOption}
              labels={["Primary Artist", "Secondary Artist"]}
              placeholders={"Select Primary Artist"}
              onChange={(e) => onChange({ primary_artist: e })}
            />
            <IconInputField
              labels={["Featuring", "Secondary Featuring"]}
              ids={["input1", "input2"]}
              placeholders={featuring}
              onChange={handleFeaturingChange}
            />
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Various Artists / Compilation
              </label>
              <div className="checkbox_item">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={data?.various_art_compilation ? true : false}
                    onChange={(e) =>
                      onChange({ various_art_compilation: e?.target?.checked })
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
                value={genreOption?.find((itm) => itm?.value === data?.genre)}
                onChange={(e) => onChange({ genre: e?.value })}
                placeholder="Select Genre"
              />
            </div>

            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Label Name <span className="input_star">*</span>
              </label>
              <Select
                options={labelOption}
                value={labelOption?.find((itm) => itm?.value === data?.label)}
                onChange={(e) => onChange({ label: e?.value })}
                placeholder="Select Label Name"
              />
            </div>

            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Format <span className="input_star">*</span>
              </label>
              <Select
                options={formatOption}
                value={formatOption?.find((itm) => itm?.value === data?.format)}
                onChange={(e) => onChange({ format: e?.value })}
                placeholder="Select Format"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">
                Original Release Date <span className="input_star">*</span>
              </label>
              <input
                type="date"
                value={data?.main_release_date}
                onChange={(e) =>
                  onChange({ main_release_date: e.target.value })
                }
                placeholder="Original Release Date"
              />
            </div>
          </form>
        </div>
        <div className="col-xl-3 col-lg-6 mt-4">
          <form className="r_input_group">
            <div className="input_f mt-3">
              <label className="mb-2">℗ line</label>
              <input
                type="text"
                value={data?.p_line}
                onChange={(e) => onChange({ p_line: e.target.value })}
                placeholder="℗ line"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">© line</label>
              <input
                type="text"
                value={data?.c_line}
                onChange={(e) => onChange({ c_line: e.target.value })}
                placeholder="© line"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Production Year <span className="input_star">*</span>
              </label>
              <Select
                options={productionYearOption}
                value={productionYearOption?.find(
                  (itm) => itm?.value === data?.production_year
                )}
                onChange={(e) => onChange({ production_year: e?.value })}
                placeholder="Select Production Year"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">UPC/EAN</label>
              <input
                type="text"
                value={data?.upc}
                onChange={(e) => onChange({ upc: e.target.value })}
                placeholder="UPC/EAN"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Producer Catalogue Number</label>
              <input
                type="text"
                value={data?.producer_catalogue_number}
                onChange={(e) =>
                  onChange({ producer_catalogue_number: e.target.value })
                }
                placeholder="Producer Catalogue Number"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Release;
