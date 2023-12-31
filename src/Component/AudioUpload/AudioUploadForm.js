import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { MdAudiotrack } from "react-icons/md"; // Using the audio icon
import FileService from "../../service/FileService";

const AudioUploadForm = ({ audio, onValueChange, onErrorMessage }) => {
  const [uploadedAudio, setUploadedAudio] = useState(null);
  const [buttonText, setButtonText] = useState("Upload Audio");
  const [audioFileName, setAudioFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Added upload progress state

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file && file.type === "audio/wav") {
      setIsLoading(true);
      onErrorMessage("");
      const audioURL = URL.createObjectURL(file);

      const res = await FileService.upload({
        file,
        folder: "85dd3bb5-4d45-485d-8037-ba07babebe13",
      });
      onValueChange(res?.data?.id);

      // Simulating upload delay (you can replace this with your actual upload process)
      const simulateUpload = () => {
        return new Promise((resolve) => {
          let progress = 0;
          const interval = setInterval(() => {
            if (progress < 100) {
              progress += 5; // Simulated progress increment
              setUploadProgress(progress);
            } else {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      };

      simulateUpload().then(() => {
        setUploadedAudio(audioURL);
        setButtonText("Replace Audio");
        setAudioFileName(file.name);
        setIsLoading(false); // Stop loading
        setUploadProgress(0); // Reset upload progress
      });
    } else {
      onErrorMessage("Only wav files are allowed");
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  return (
    <div className="audio_upload_form">
      <Dropzone onDrop={handleDrop} accept="audio/.mp3">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} id="fileInput" />
            {uploadedAudio ? (
              <div className="uploaded-audio">
                <MdAudiotrack className="icons" />
                <p>{audioFileName}</p>
              </div>
            ) : (
              <div className="upload-placeholder">
                <MdAudiotrack className="icons" />
              </div>
            )}
          </div>
        )}
      </Dropzone>
      <div className="upload-button-container">
        <button
          onClick={handleUploadClick}
          className="btn mt-3"
          disabled={isLoading}
        >
          {isLoading ? `Uploading ${uploadProgress}%` : buttonText}
        </button>
      </div>
    </div>
  );
};

export default AudioUploadForm;
