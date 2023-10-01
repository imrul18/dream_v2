import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import Select from "react-select";
import OptionService from "../../service/OptionService";
import AudioUploadForm from "../AudioUpload/AudioUploadForm";
import PrimaryBtn from "../Button/PrimaryBtn";
import MultiInput from "../InputField/MultiInput";
import MultiSelect from "../InputField/MultiSelect";

function AddAssetsPopup({ onTrackChange }) {
  const { musicData } = useSelector((state) => state.reduxStore);

  const [data, setData] = useState({});

  useEffect(() => {
    if (musicData) {
      setData({
        c_line: musicData?.c_line,
        featuring: musicData?.featuring,
        format: musicData?.format,
        genre: musicData?.genre,
        label: musicData?.label,
        main_release_date: musicData?.main_release_date,
        original_release_date: musicData?.original_release_date,
        p_line: musicData?.p_line,
        primary_artist: musicData?.primary_artist,
        producer_catalogue_number: musicData?.producer_catalogue_number,
        production_year: musicData?.production_year,
        upc: musicData?.upc,
        various_art_compilation: musicData?.various_art_compilation,
        id: Date.now() + Math.random(),
        primary_track_type: true,
        instrumental: "no",
        secondary_track_type: "Original",
        parental_advisory: "no",
      });
    }
  }, [musicData]);
  
  const onValueChange = (value) => {
    setData({ ...data, ...value });
  };

  const onArtistChange = (e) => {
    onValueChange({
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
  const onFeatureChange = (e) => {
    onValueChange({
      featuring: e?.map((item) => ({ artist_name: item })),
    });
  };
  const onArrangerChange = (e) => {
    onValueChange({
      arranger: e?.map((item) => ({ arranger_name: item })),
    });
  };
  const onProducerChange = (e) => {
    onValueChange({
      producer: e?.map((item) => ({ producer_name: item })),
    });
  };

  const [show, setShow] = useState(false);

  const [artistOption, setArtistOption] = useState([]);
  const [genreOption, setGenreOption] = useState([]);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    onTrackChange(data);
    setData(null);
    handleClose();
  };

  return (
    <>
      <button className="btn add_label_btn" onClick={handleShow}>
        Add Track
      </button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Track</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal_upload_area">
            <AudioUploadForm
              audio={data?.file}
              onValueChange={(e) => onValueChange({ file: e })}
            />
          </div>
          <form className="r_input_group">
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Primary Track Type <span className="input_star">*</span>
              </label>
              <div className="checkbox_item">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={data?.primary_track_type}
                    onChange={(e) =>
                      onValueChange({ primary_track_type: e.target.checked })
                    }
                  />
                  <label htmlFor="">Music</label>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Secondary Track Type <span className="input_star">*</span>
              </label>
              <div className="checkbox_item">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={
                      data?.secondary_track_type == "Original" ? true : false
                    }
                    onChange={() =>
                      onValueChange({ secondary_track_type: "Original" })
                    }
                  />
                  <label htmlFor="">Original</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={
                      data?.secondary_track_type == "Karaoke" ? true : false
                    }
                    onChange={() =>
                      onValueChange({ secondary_track_type: "Karaoke" })
                    }
                  />
                  <label htmlFor="">Karaoke</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={
                      data?.secondary_track_type == "Medley" ? true : false
                    }
                    onChange={() =>
                      onValueChange({ secondary_track_type: "Medley" })
                    }
                  />
                  <label htmlFor="">Medley</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={
                      data?.secondary_track_type == "Cover" ? true : false
                    }
                    onChange={() =>
                      onValueChange({ secondary_track_type: "Cover" })
                    }
                  />
                  <label htmlFor="">Cover</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={
                      data?.secondary_track_type == "Cover by cover band"
                        ? true
                        : false
                    }
                    onChange={() =>
                      onValueChange({
                        secondary_track_type: "Cover by cover band",
                      })
                    }
                  />
                  <label htmlFor="">Cover by cover band</label>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Instrumental
              </label>
              <div className="checkbox_item">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={data?.instrumental == 'yes' ? true : false}
                    onChange={() => onValueChange({ instrumental: true })}
                  />
                  <label htmlFor="">Yes</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={data?.instrumental == 'no' ? true : false}
                    onChange={() => onValueChange({ instrumental: 'no' })}
                  />
                  <label htmlFor="">No</label>
                </div>
              </div>
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">
                Title <span className="input_star">*</span>
              </label>
              <input
                type="text"
                value={data?.title}
                onChange={(e) => onValueChange({ title: e.target.value })}
                placeholder="Title"
                required
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Version/Subtitle</label>
              <input
                type="text"
                value={data?.subtitle}
                onChange={(e) => onValueChange({ subtitle: e.target.value })}
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
            <div className="input_f mt-3">
              <label className="mb-2">Remixer</label>
              <input
                type="text"
                value={data?.remixer}
                onChange={(e) => onValueChange({ remixer: e.target.value })}
                placeholder="Remixer"
              />
            </div>
            <div className="add_input mt-3">
              <div className="input_f mt-3">
                <label className="mb-2">Lyrics Writter</label>
                <span className="input_star">*</span>
                <input
                  type="text"
                  value={data?.lyrics_writter?.writter_name}
                  onChange={(e) =>
                    onValueChange({
                      lyrics_writter: { writter_name: e.target.value },
                    })
                  }
                  placeholder="Lyrics Writter"
                />
              </div>
              <p className="input_desc">
                Digital Music Stores require full first and last (family) name
              </p>
            </div>
            <div className="add_input mt-3">
              <div className="input_f mt-3">
                <label className="mb-2">Composer</label>
                <span className="input_star">*</span>
                <input
                  type="text"
                  value={data?.composer?.composer_name}
                  onChange={(e) =>
                    onValueChange({
                      composer: { composer_name: e.target.value },
                    })
                  }
                  placeholder="Composer"
                />
              </div>
              <p className="input_desc">
                Digital Music Stores require full first and last (family) name
              </p>
            </div>

            <MultiInput
              data={data?.arranger?.create?.map((itm) => itm?.arranger_name)}
              labels={["Arranger", "Secondary Arranger"]}
              ids={["input1", "input2"]}
              placeholders={"Arranger"}
              onChange={onArrangerChange}
            />
            <MultiInput
              data={data?.producer?.create?.map((itm) => itm?.producer_name)}
              labels={["Producer", "Secondary Producer"]}
              ids={["input1", "input2"]}
              placeholders={"Producer"}
              onChange={onProducerChange}
            />
            <div className="input_f mt-3">
              <label className="mb-2">℗ line</label>
              <input
                type="text"
                value={data?.p_line}
                onChange={(e) => onValueChange({ p_line: e.target.value })}
                placeholder="℗ line"
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
                onChange={(e) => onValueChange({ production_year: e?.value })}
                placeholder="Select Production Year"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Publisher</label>
              <input
                type="text"
                value={data?.publisher}
                onChange={(e) => onValueChange({ publisher: e.target.value })}
                placeholder="Publisher"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">ISRC</label>
              <input
                type="text"
                value={data?.isrc}
                onChange={(e) => onValueChange({ isrc: e.target.value })}
                placeholder="XX-0X0-00-00000"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Genre <span className="input_star">*</span>
              </label>
              <Select
                options={genreOption}
                value={genreOption?.find((itm) => itm?.value === data?.genre)}
                onChange={(e) => onValueChange({ genre: e?.value })}
                placeholder="Select Genre"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Producer Catalogue Number</label>
              <input
                type="text"
                value={data?.producer_catalogue_number}
                onChange={(e) =>
                  onValueChange({ producer_catalogue_number: e.target.value })
                }
                placeholder="Producer Catalogue Number"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Parental advisory <span className="input_star">*</span>
              </label>
              <div className="checkbox_item">
                <div className="item">
                  <input
                    type="checkbox"
                    checked={data?.parental_advisory == "yes" ? true : false}
                    onChange={() => onValueChange({ parental_advisory: "yes" })}
                  />
                  <label htmlFor="">Yes</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={data?.parental_advisory == "no" ? true : false}
                    onChange={() => onValueChange({ parental_advisory: "no" })}
                  />
                  <label htmlFor="">No</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={
                      data?.parental_advisory == "cleaned" ? true : false
                    }
                    onChange={() =>
                      onValueChange({ parental_advisory: "cleaned" })
                    }
                  />
                  <label htmlFor="">Cleaned</label>
                </div>
              </div>
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Track Title Language</label>
              <span className="input_star">*</span>
              <input
                type="text"
                value={data?.track_title_language}
                onChange={(e) =>
                  onValueChange({ track_title_language: e.target.value })
                }
                placeholder="Track Title Language"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Lyrics Language</label>
              <span className="input_star">*</span>
              <input
                type="text"
                value={data?.lyrics_language}
                onChange={(e) =>
                  onValueChange({ lyrics_language: e.target.value })
                }
                placeholder="Lyrics Language"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Lyrics</label>
              <textarea
                type="text"
                cols="30"
                rows="5"
                value={data?.lyrics}
                onChange={(e) => onValueChange({ lyrics: e.target.value })}
                placeholder="Lyrics"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <PrimaryBtn label="Submit" onClick={handleSubmit} />
            <button className="btn_s" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAssetsPopup;
