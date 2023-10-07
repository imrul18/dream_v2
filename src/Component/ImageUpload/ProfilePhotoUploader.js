import React from "react";
import Dropzone from "react-dropzone";
import { BsCamera } from "react-icons/bs";
import FileService from "../../service/FileService";

const ProfilePhotoUploader = ({ photo, onChange }) => {
  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      const res = await FileService.upload({
        file,
        folder: "85dd3bb5-4d45-485d-8037-ba07babebe13",
      });
      onChange(res?.data?.id);
    }
  };

  return (
    <div className="photo_uploader">
      <Dropzone onDrop={handleDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {photo ? (
              <img
                src={FileService.image(photo)}
                alt="Uploaded"
                className="uploaded-image"
              />
            ) : (
              <BsCamera className="icons" />
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProfilePhotoUploader;
