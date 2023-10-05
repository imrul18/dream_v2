import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import OptionService from "../../service/OptionService";
import AudioUploadForm from "../AudioUpload/AudioUploadForm";
import PrimaryBtn from "../Button/PrimaryBtn";
import MultiInput from "../InputField/MultiInput";
import MultiSelect from "../InputField/MultiSelect";

function AddAssetsPopup({ onSubmit, musicData }) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
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

  const onDataChange = (value) => {
    setData({ ...data, ...value });
  };

  const [show, setShow] = useState(false);
  const [artistOption, setArtistOption] = useState([]);
  const [genreOption, setGenreOption] = useState([]);
  const [productionYearOption, setProductionYearOption] = useState([]);
  const [languageOption, setLanguageOption] = useState([]);
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
    const language = await OptionService.language();
    setLanguageOption(
      language?.data?.map((itm) => ({
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

  const handleSubmit = async () => {
    let redirect = true;
    let errorData = {};
    if (data?.file) {
      errorData = { ...errorData, file: null };
    } else {
      errorData = { ...errorData, file: "Please upload music" };
      redirect = false;
    }

    if (data?.title) {
      errorData = { ...errorData, title: null };
    } else {
      errorData = { ...errorData, title: "Please enter title" };
      redirect = false;
    }

    if (
      data?.primary_artist?.length &&
      data?.primary_artist?.every((itm) => itm != "")
    ) {
      errorData = { ...errorData, primary_artist: null };
    } else {
      errorData = {
        ...errorData,
        primary_artist: "Please select primary artist",
      };
      redirect = false;
    }

    if (
      data?.lyrics_writter?.length &&
      data?.lyrics_writter?.every((itm) => itm != "")
    ) {
      function meetsCriteria(str) {
        var words = str?.split(/\s+/);
        return words?.length >= 2 && words?.every((word) => word?.length >= 3);
      }
      var allItemsMeetCriteria = data?.lyrics_writter?.every((item) =>
        meetsCriteria(item)
      );
      if (allItemsMeetCriteria) {
        errorData = { ...errorData, lyrics_writter: null };
      } else {
        errorData = {
          ...errorData,
          lyrics_writter: "Name should be in valid Fistname Lastname format",
        };
        redirect = false;
      }
    } else {
      errorData = {
        ...errorData,
        lyrics_writter: "Please add lyrics writter",
      };
      redirect = false;
    }

    if (data?.composer?.length && data?.composer?.every((itm) => itm != "")) {
      function meetsCriteria(str) {
        var words = str?.split(/\s+/);
        return words?.length >= 2 && words?.every((word) => word?.length >= 3);
      }
      var allItemsMeetCriteria = data?.composer?.every((item) =>
        meetsCriteria(item)
      );
      if (allItemsMeetCriteria) {
        errorData = { ...errorData, composer: null };
      } else {
        errorData = {
          ...errorData,
          composer: "Name should be in valid Fistname Lastname format",
        };
        redirect = false;
      }
    } else {
      errorData = {
        ...errorData,
        composer: "Please add composer",
      };
      redirect = false;
    }

    if (data?.p_line) {
      errorData = { ...errorData, p_line: null };
    } else {
      errorData = {
        ...errorData,
        p_line: "Please enter p_line",
      };
      redirect = false;
    }

    if (data?.production_year) {
      errorData = { ...errorData, production_year: null };
    } else {
      errorData = {
        ...errorData,
        production_year: "Please select production year",
      };
      redirect = false;
    }

    if (data?.genre) {
      errorData = { ...errorData, genre: null };
    } else {
      errorData = { ...errorData, genre: "Please select genre" };
      redirect = false;
    }

    if (data?.track_title_language) {
      errorData = { ...errorData, track_title_language: null };
    } else {
      errorData = {
        ...errorData,
        track_title_language: "Please add Track Title Language",
      };
      redirect = false;
    }

    if (data?.lyrics_language) {
      errorData = { ...errorData, lyrics_language: null };
    } else {
      errorData = {
        ...errorData,
        lyrics_language: "Please add lyric language",
      };
      redirect = false;
    }

    if (redirect) {
      onSubmit(data);
      setData(null);
      handleClose();
    } else {
      setError(errorData);
    }
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
              onValueChange={(e) => onDataChange({ file: e })}
            />
            <small className="text-danger">{error?.file}</small>
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
                      onDataChange({ primary_track_type: e.target.checked })
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
                      onDataChange({ secondary_track_type: "Original" })
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
                      onDataChange({ secondary_track_type: "Karaoke" })
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
                      onDataChange({ secondary_track_type: "Medley" })
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
                      onDataChange({ secondary_track_type: "Cover" })
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
                      onDataChange({
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
                    checked={data?.instrumental == "yes" ? true : false}
                    onChange={() => onDataChange({ instrumental: "yes" })}
                  />
                  <label htmlFor="">Yes</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={data?.instrumental == "no" ? true : false}
                    onChange={() => onDataChange({ instrumental: "no" })}
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
                onChange={(e) => onDataChange({ title: e.target.value })}
                placeholder="Title"
                required
              />
              <small className="text-danger">{error?.title}</small>
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Version/Subtitle</label>
              <input
                type="text"
                value={data?.subtitle}
                onChange={(e) => onDataChange({ subtitle: e.target.value })}
                placeholder="Version/Subtitle"
              />
            </div>
            <MultiSelect
              data={data?.primary_artist}
              options={artistOption}
              labels={["Primary Artist", "Secondary Artist"]}
              placeholders={"Select Primary Artist"}
              onChange={(e) => onDataChange({ primary_artist: e })}
              star="*"
            />
            <small className="text-danger">{error?.primary_artist}</small>
            <MultiInput
              data={data?.featuring}
              labels={["Featuring", "Secondary Featuring"]}
              ids={["input1", "input2"]}
              placeholders={"Featuring"}
              onChange={(e) => onDataChange({ featuring: e })}
            />
            <div className="input_f mt-3">
              <label className="mb-2">Remixer</label>
              <input
                type="text"
                value={data?.remixer}
                onChange={(e) => onDataChange({ remixer: e.target.value })}
                placeholder="Remixer"
              />
            </div>
            <div className="add_input mt-3">
              <MultiInput
                data={data?.lyrics_writter}
                labels={["Lyrics Writter", "Secondary Lyrics Writter"]}
                ids={["input1", "input2"]}
                placeholders={"Lyrics Writter"}
                onChange={(e) => onDataChange({ lyrics_writter: e })}
                star="*"
              />
              <p className="input_desc">
                Digital Music Stores require full first and last (family) name
              </p>
              <small className="text-danger">{error?.lyrics_writter}</small>
            </div>
            <div className="add_input mt-3">
              <MultiInput
                data={data?.composer}
                labels={["Composer", "Secondary Composer"]}
                ids={["input1", "input2"]}
                placeholders={"Composer"}
                onChange={(e) => onDataChange({ composer: e })}
                star="*"
              />
              <p className="input_desc">
                Digital Music Stores require full first and last (family) name
              </p>
              <small className="text-danger">{error?.composer}</small>
            </div>

            <MultiInput
              data={data?.arranger}
              labels={["Arranger", "Secondary Arranger"]}
              ids={["input1", "input2"]}
              placeholders={"Arranger"}
              onChange={(e) => onDataChange({ arranger: e })}
            />
            <MultiInput
              data={data?.producer}
              labels={["Producer", "Secondary Producer"]}
              ids={["input1", "input2"]}
              placeholders={"Producer"}
              onChange={(e) => onDataChange({ producer: e })}
            />
            <div className="input_f mt-3">
              <label className="mb-2">℗ line</label>{" "}
              <span className="input_star">*</span>
              <input
                type="text"
                value={data?.p_line}
                onChange={(e) => onDataChange({ p_line: e.target.value })}
                placeholder="℗ line"
              />
              <small className="text-danger">{error?.p_line}</small>
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
                onChange={(e) => onDataChange({ production_year: e?.value })}
                placeholder="Select Production Year"
              />
              <small className="text-danger">{error?.production_year}</small>
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Publisher</label>
              <input
                type="text"
                value={data?.publisher}
                onChange={(e) => onDataChange({ publisher: e.target.value })}
                placeholder="Publisher"
              />
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">ISRC</label>
              <input
                type="text"
                value={data?.isrc}
                onChange={(e) => onDataChange({ isrc: e.target.value })}
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
                onChange={(e) => onDataChange({ genre: e?.value })}
                placeholder="Select Genre"
              />
              <small className="text-danger">{error?.genre}</small>
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Producer Catalogue Number</label>
              <input
                type="text"
                value={data?.producer_catalogue_number}
                onChange={(e) =>
                  onDataChange({ producer_catalogue_number: e.target.value })
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
                    onChange={() => onDataChange({ parental_advisory: "yes" })}
                  />
                  <label htmlFor="">Yes</label>
                </div>
                <div className="item">
                  <input
                    type="checkbox"
                    checked={data?.parental_advisory == "no" ? true : false}
                    onChange={() => onDataChange({ parental_advisory: "no" })}
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
                      onDataChange({ parental_advisory: "cleaned" })
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
                  onDataChange({ track_title_language: e.target.value })
                }
                placeholder="Track Title Language"
              />
              <small className="text-danger">
                {error?.track_title_language}
              </small>
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Lyrics Language</label>
              <span className="input_star">*</span>
              <input
                type="text"
                value={data?.lyrics_language}
                onChange={(e) =>
                  onDataChange({ lyrics_language: e.target.value })
                }
                placeholder="Lyrics Language"
              />
              <small className="text-danger">{error?.lyrics_language}</small>
            </div>
            <div className="input_f mt-3">
              <label className="mb-2">Lyrics</label>
              <textarea
                type="text"
                cols="30"
                rows="5"
                value={data?.lyrics}
                onChange={(e) => onDataChange({ lyrics: e.target.value })}
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
