import React, { useState } from "react";
import IconInputField from "../InputField/IconInputField";
import InputField from "../InputField/InputField";
import Selector from "../Selector/Selector";
import ImageUploadForm from "../ImageUpload/ImageUploadForm";

const Release = () => {
  const [releaseTitle, setReleaseTitle] = useState("");
  const [versionSubtitle, setVersionSubtitle] = useState("");
  const [primaryArtist, setPrimaryArtist] = useState("");
  const [featuring, setFeaturing] = useState("");
  const [variousArtists, setVariousArtists] = useState(true);
  const [genre, setGenre] = useState("");
  const [subgenre, setSubgenre] = useState("");
  const [labelName, setLabelName] = useState("");
  const [format, setFormat] = useState("");
  const [originalReleaseDate, setOriginalReleaseDate] = useState("");
  const [pLine, setPLine] = useState("");
  const [cLine, setCLine] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [upcEan, setUpcEan] = useState("");
  const [producerCatalogueNumber, setProducerCatalogueNumber] = useState("");

  const handleReleaseTitleChange = (event) => {
    setReleaseTitle(event.target.value);
  };

  const handleVersionSubtitleChange = (event) => {
    setVersionSubtitle(event.target.value);
  };

  const handlePrimaryArtistChange = (event) => {
    setPrimaryArtist(event.target.value);
  };

  const handleFeaturingChange = (event) => {
    setFeaturing(event.target.value);
  };

  const handleVariousArtistsChange = (event) => {
    setVariousArtists(event.target.checked);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSubgenreChange = (event) => {
    setSubgenre(event.target.value);
  };

  const handleLabelNameChange = (event) => {
    setLabelName(event.target.value);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleOriginalReleaseDateChange = (event) => {
    setOriginalReleaseDate(event.target.value);
  };

  const handlePLineChange = (event) => {
    setPLine(event.target.value);
  };

  const handleCLineChange = (event) => {
    setCLine(event.target.value);
  };

  const handleProductionYearChange = (event) => {
    setProductionYear(event.target.value);
  };

  const handleUpcEanChange = (event) => {
    setUpcEan(event.target.value);
  };

  const handleProducerCatalogueNumberChange = (event) => {
    setProducerCatalogueNumber(event.target.value);
  };

  return (
    <>
      <div className="row release-row">
        <div className="col-xl-3 col-lg-6 mt-4">
          <ImageUploadForm />
        </div>
        <div className="col-xl-3 col-lg-6 mt-4">
          <form className="r_input_group">
            <InputField
              label="Release Title"
              value={releaseTitle}
              onChange={handleReleaseTitleChange}
            />
            <InputField
              label="Version/Subtitle"
              value={versionSubtitle}
              onChange={handleVersionSubtitleChange}
            />
            <IconInputField
              labels={["Primary Artist", "Secondary Artist"]}
              ids={["input1", "input2"]}
              placeholders={primaryArtist}
              onChange={handlePrimaryArtistChange}
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
                    checked={variousArtists}
                    onChange={handleVariousArtistsChange}
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
              <Selector value={genre} onChange={handleGenreChange}>
                {/* options */}
              </Selector>
            </div>
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Subgenre <span className="input_star">*</span>
              </label>
              <Selector value={subgenre} onChange={handleSubgenreChange}>
                {/* options */}
              </Selector>
            </div>

            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Label Name <span className="input_star">*</span>
              </label>
              <Selector value={labelName} onChange={handleLabelNameChange}>
                {/* options */}
              </Selector>
            </div>

            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Format <span className="input_star">*</span>
              </label>
              <Selector value={format} onChange={handleFormatChange}>
                {/* options */}
              </Selector>
            </div>
            <InputField
              label="Original Release Date"
              value={originalReleaseDate}
              onChange={handleOriginalReleaseDateChange}
            />
          </form>
        </div>
        <div className="col-xl-3 col-lg-6 mt-4">
          <form className="r_input_group">
            <InputField
              label="℗ line"
              value={pLine}
              onChange={handlePLineChange}
            />
            <InputField
              label="© line"
              value={cLine}
              onChange={handleCLineChange}
            />
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Production Year <span className="input_star">*</span>
              </label>
              <Selector value={productionYear} onChange={handleProductionYearChange}>
                {/* options */}
              </Selector>
            </div>

            <InputField
              label="UPC/EAN"
              value={upcEan}
              onChange={handleUpcEanChange}
            />
            <InputField
              label="Producer Catalogue Number"
              value={producerCatalogueNumber}
              onChange={handleProducerCatalogueNumberChange}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Release;
