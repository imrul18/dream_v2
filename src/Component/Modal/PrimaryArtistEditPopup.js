import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import FileService from "../../service/FileService";
import PrimaryArtistService from "../../service/PrimaryArtistService";
import PrimaryBtn from "../Button/PrimaryBtn";
import PhotoUploader from "../ImageUpload/PhotoUploader";
import InputField from "../InputField/InputField";

function LabelManagePopup({ id, isShow }) {
  const [show, setShow] = useState(isShow);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [spotifyId, setSpotifyId] = useState("");
  const [appleId, setAppleId] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [youtubeChannelUrl, setYoutubeChannelUrl] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const getData = async () => {
    const res = await PrimaryArtistService.getById(id);
    setName(res?.data?.name);
    setSpotifyId(res?.data?.spotify_id);
    setAppleId(res?.data?.apple_id);
    setFacebookUrl(res?.data?.facebook_url);
    setInstagramId(res?.data?.instagram_id);
    setYoutubeChannelUrl(res?.data?.youtube_channel_url);
    setUploadedPhoto(res?.data?.image);
  };

  useEffect(() => {
    if(id)
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    const data = {
      // id: id,
      // name: name,
      spotify_id: spotifyId,
      apple_id: appleId,
      facebook_url: facebookUrl,
      instagram_id: instagramId,
      youtube_channel_url: youtubeChannelUrl,
      image: uploadedPhoto,
    };

    const res = await PrimaryArtistService.update(id, data);
    if (res) {
      setName("");
      setSpotifyId("");
      setAppleId("");
      setFacebookUrl("");
      setInstagramId("");
      setYoutubeChannelUrl("");
      setUploadedPhoto(null);
      handleClose();
      window.location.reload();
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSpotifyIdChange = (event) => {
    setSpotifyId(event.target.value);
  };

  const handleAppleIdChange = (event) => {
    setAppleId(event.target.value);
  };

  const handleFacebookUrlChange = (event) => {
    setFacebookUrl(event.target.value);
  };

  const handleInstagramIdChange = (event) => {
    setInstagramId(event.target.value);
  };

  const handleYoutubeChannelUrlChange = (event) => {
    setYoutubeChannelUrl(event.target.value);
  };

  return (
    <>
      <Link className="pen" onClick={handleShow}>
        <BiPencil className="icons" />
      </Link>
      <Modal show={show} onHide={handleClose} className="add_label">
        <Modal.Header closeButton>
          <Modal.Title>Edit Primary Artist Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PhotoUploader
            uploadedPhoto={uploadedPhoto ? FileService?.image(uploadedPhoto) : null}
            setUploadedPhoto={()=>console.log("A")}
            onUpload={setUploadedPhoto}
          />
          <div className="input_group">
            <InputField
              label="Name"
              star="*"
              value={name}
              disabled={true}
              onChange={handleNameChange}
            />
            <InputField
              label="Spotify ID"
              value={spotifyId}
              onChange={handleSpotifyIdChange}
            />
            <InputField
              label="Apple ID"
              value={appleId}
              onChange={handleAppleIdChange}
            />
            <InputField
              label="Facebook URL"
              value={facebookUrl}
              onChange={handleFacebookUrlChange}
            />
            <InputField
              label="Instagram ID"
              value={instagramId}
              onChange={handleInstagramIdChange}
            />
            <InputField
              label="YouTube Channel URL"
              value={youtubeChannelUrl}
              onChange={handleYoutubeChannelUrlChange}
            />
          </div>
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

export default LabelManagePopup;
