import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import OptionService from "../../service/OptionService";
import AudioUploadForm from "../AudioUpload/AudioUploadForm";
import PrimaryBtn from "../Button/PrimaryBtn";
import IconInputField from "../InputField/IconInputField";
import InputField from "../InputField/InputField";
import MultiSelect from "../InputField/MultiSelect";
import Selector from "../Selector/Selector";
import TextField from "../TextBox/TextField";

function AddAssetsPopup({onChange}) {
  const {musicData} = useSelector((state) => state.reduxStore);
  const [data, setData] = useState();

  const onValueChange = (value) => {
    setData({ ...data, ...value });
  };
  
  useEffect(() => {
    setData(musicData);
  }, [musicData]);

  const [show, setShow] = useState(false);

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

  
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Selected: ${selectedOption.label}`);
  };

  const Pyears = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [version_S, setVersion_S] = useState("");
  const [primaryArtist, setPrimaryArtist] = useState("");
  const [PCN, setPCN] = useState("");
  const [Publisher, setPublisher] = useState("");
  const [ISRC, setISRC] = useState("");
  const [Ttl, setTtl] = useState("");
  const [LyricsLanguage, setLyricsLanguage] = useState("");
  const [Remixer, setRemixer] = useState("");
  const [LyricsWritter, setLyricsWritter] = useState("");
  const [Composer, setComposer] = useState("");
  const [Pline, setPline] = useState("");
  const [Music, setMusic] = useState(true);
  const [Original, setOriginal] = useState(true);
  const [Yes, setYes] = useState(true);
  const [PYes, setPYes] = useState(true);

  const handleNameChange = (event) => {
    // setName(event.target.value);
  };

  const handleversion_SChange = (event) => {
    // setVersion_S(event.target.value);
  };
  const handlePrimaryArtistChange = (event) => {
    // setPrimaryArtist(event.target.value);
  };

  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    // setComment(event.target.value);
  };
  const handlePublisherChange = (event) => {
    // setPublisher(event.target.value);
  };
  const handleISRCChange = (event) => {
    // setISRC(event.target.value);
  };
  const handlePCNCChange = (event) => {
    // setPCN(event.target.value);
  };
  const handleTtlChange = (event) => {
    // setTtl(event.target.value);
  };
  const handleLyricsLanguageChange = (event) => {
    // setLyricsLanguage(event.target.value);
  };
  const handleRemixerChange = (event) => {
    // setRemixer(event.target.value);
  };
  const handleLyricsWritterChange = (event) => {
    // setLyricsWritter(event.target.value);
  };
  const handleComposerChange = (event) => {
    // setComposer(event.target.value);
  };
  const handlePlineChange = (event) => {
    // setPline(event.target.value);
  };

  const handleMusicChange = (event) => {
    // setMusic(event.target.checked);
  };
  const handleOriginalChange = (event) => {
    // setOriginal(event.target.checked);
  };
  const handleYesChange = (event) => {
    // setYes(event.target.checked);
  };
  const handlePYesChange = (event) => {
    // setPYes(event.target.checked);
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
            <AudioUploadForm />
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
                    checked={Music}
                    onChange={handleMusicChange}
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
                  <input type="checkbox"
                    checked={Original}
                    onChange={handleOriginalChange} />
                  <label htmlFor="">Original</label>
                </div>
                <div className="item">
                  <input type="checkbox" />
                  <label htmlFor="">Karaoke</label>
                </div>
                <div className="item">
                  <input type="checkbox" />
                  <label htmlFor="">Medley</label>
                </div>
                <div className="item">
                  <input type="checkbox" />
                  <label htmlFor="">Cover</label>
                </div>
                <div className="item">
                  <input type="checkbox" />
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
                  <input type="checkbox" 
                    checked={Yes}
                    onChange={handleYesChange}
                  />
                  <label htmlFor="">Yes</label>
                </div>
                <div className="item">
                  <input type="checkbox" />
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
              options={artistOption}
              labels={["Primary Artist", "Secondary Artist"]}
              placeholders={"Select Primary Artist"}
              onChange={(e) => onValueChange({ primary_artist: e })}
            />
            <IconInputField
              labels={["Featuring", "Secondary Featuringt"]}
              ids={["input1", "input2"]}
              onChange={handlePrimaryArtistChange}
              placeholders={[null, null]}
            />
            <InputField
              label="Remixer"
              value={Remixer}
              onChange={handleRemixerChange}
            />
            <div className="add_input mt-3">
              <InputField
                label="Lyrics Writter"
                value={LyricsWritter}
                onChange={handleLyricsWritterChange}
                star="*"
              />
              <p className="input_desc">
                Digital Music Stores require full first and last (family) name
              </p>
            </div>
            <div className="add_input mt-3">
              <InputField
                label="Composer"
                value={Composer}
                onChange={handleComposerChange}
                star="*"
              />
              <p className="input_desc">
                Digital Music Stores require full first and last (family) name
              </p>
            </div>
            <IconInputField
              labels={["Arranger", "Secondary Arranger"]}
              ids={["input1", "input2"]}
              placeholders={[null, null]}
              onChange={handlePrimaryArtistChange}
            />
            <IconInputField
              labels={["Producer", "Secondary Producer"]}
              ids={["input1", "input2"]}
              placeholders={[null, null]}
              onChange={handlePrimaryArtistChange}
            />
            <InputField
              label="℗ Pline"
              value={Pline}
              onChange={handlePlineChange}
              star="*"
            />
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Production Year <span className="input_star">*</span>
              </label>
              <Selector
                options={Pyears}
                onChange={handlePChange}
                placeholder="2023"
                value={selectedOption}
              />
            </div>
            <InputField
              label="Publisher"
              value={Publisher}
              onChange={handlePublisherChange}
            />
            <InputField
              label="ISRC"
              value={ISRC}
              onChange={handleISRCChange}
              placeholder="XX-0X0-00-00000"
            />
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Genre <span className="input_star">*</span>
              </label>
              <Selector />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Subgenre <span className="input_star">*</span>
              </label>
              <Selector />
            </div>
            <InputField
              label="Producer Catalogue Number"
              value={PCN}
              onChange={handlePCNCChange}
            />
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Parental advisory <span className="input_star">*</span>
              </label>
              <div className="checkbox_item">
                <div className="item">
                  <input type="checkbox" 
                    checked={PYes}
                    onChange={handlePYesChange}
                  />
                  <label htmlFor="">Yes</label>
                </div>
                <div className="item">
                  <input type="checkbox" />
                  <label htmlFor="">No</label>
                </div>
                <div className="item">
                  <input type="checkbox" />
                  <label htmlFor="">Cleaned</label>
                </div>
              </div>
            </div>
            <InputField
              label="Track Title Language"
              value={Ttl}
              onChange={handleTtlChange}
              star="*"
            />
            <InputField
              label="Lyrics Language"
              value={LyricsLanguage}
              onChange={handleLyricsLanguageChange}
              star="*"
            />
            <TextField
              label="Lyrics"
              type="text"
              value={comment}
              onChange={handleCommentChange}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <PrimaryBtn label="Submit" onClick={handleClose} />
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
