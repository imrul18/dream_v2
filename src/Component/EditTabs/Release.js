import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setUpdateData } from "../../Pages/reduxStore";
import OptionService from "../../service/OptionService";
import ImageUploadForm from "../ImageUpload/ImageUploadForm";
import MultiInput from "../InputField/MultiInput";
import MultiSelect from "../InputField/MultiSelect";

const Release = ({ data, onUpdate }) => {
  const dispatch = useDispatch();
  const { updateData } = useSelector((state) => state.reduxStore);
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

  const onFeatureChange = (e) => {
    onChange({
      featuring: e?.map((item) => ({ artist_name: item })),
    });    
  };

  const onArtistChange = (e) => {
    onChange({
      primary_artist: {
        create: e?.map((item) => ({
          Release_Music_id: "+",
          Primary_Artist_id: {
            id: item,
          },
        })),
        delete: [],
        update: [],
      },
    });
  };

  const onChange = (e) => {
    dispatch(setUpdateData({ ...updateData, e }));
    onUpdate(e);
  };

  return (
    <>
      <div className="row release-row">
        <div className="col-xl-3 col-lg-6 mt-4">
          <ImageUploadForm
            image={data?.cover_image}
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
              data={data?.primary_artist?.create?.map(
                (itm) => itm?.Primary_Artist_id?.id
              )}
              options={artistOption}
              labels={["Primary Artist", "Secondary Artist"]}
              placeholders={"Select Primary Artist"}
              onChange={onArtistChange}
            />

            <MultiInput
              data={data?.featuring?.map((itm) => itm?.artist_name)}
              labels={["Featuring", "Secondary Featuring"]}
              ids={["input1", "input2"]}
              placeholders={"Featuring"}
              onChange={onFeatureChange}
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
                value={data?.original_release_date}
                onChange={(e) =>
                  onChange({ original_release_date: e.target.value })
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
