import React, { useState } from "react";
import { BsCamera } from "react-icons/bs";
import FileService from "../../service/FileService";

const ReleaseImageUpload = ({ image, onUpload, onError }) => {
  const [buttonText, setButtonText] = useState("Replace Cover");
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadClick = async (e) => {
    // Trigger the hidden input element
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    let height = 0;
    let width = 0;
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          if(img.height != 3000 || img.width != 3000){
            onError("Image should be 3000px x 3000px");
            setIsLoading(false);
            return;
          }      
        };
      };
      reader.readAsDataURL(file);     

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setButtonText("Replace Cover");
        const res = await FileService.upload({
          file,
          folder: "85dd3bb5-4d45-485d-8037-ba07babebe13",
        });
        onUpload(res?.data?.id);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="image_upload_form cover_upload">
      <input
        type="file"
        accept="image/jpeg, image/png"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="dropzone">
        {image ? (
          <img
            src={FileService?.image(image)}
            alt="Uploaded"
            className="uploaded-image"
          />
        ) : (
          <div className="upload-placeholder" onClick={handleUploadClick}>
            <BsCamera className="icons" />
          </div>
        )}
      </div>
      <div className="upload-button-container">
        <button
          className="btn"
          disabled={isLoading}
          onClick={handleUploadClick}
        >
          {isLoading ? "Uploading..." : buttonText}
        </button>
      </div>
    </div>
  );
};

export default ReleaseImageUpload;
