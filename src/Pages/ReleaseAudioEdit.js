import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import EditAssets from "../Component/EditTabs/EditAssets";
import Release from "../Component/EditTabs/Release";
import ReleaseDate from "../Component/EditTabs/ReleaseDate";
import Submission from "../Component/EditTabs/Submission";
import MusicCatalogService from "../service/MusicCatalogService";
import { setMusicData } from "./reduxStore";

function ReleaseAudioEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { updateData, musicData } = useSelector((state) => state.reduxStore);

  const getMusicData = async () => {
    const res = await MusicCatalogService.getById(id);
    dispatch(setMusicData(res?.data));
  }

  useEffect(() => {
    if (id) getMusicData();
  }, [id]);

  const onChange = (value) => {
    dispatch(setMusicData({ ...musicData, ...value }));
  };

  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const steps = [
    {
      title: "Release",
      component: <Release data={musicData} onUpdate={onChange} />,
    },
    {
      title: "Edit Assets",
      component: <EditAssets data={musicData} onChange={onChange} />,
    },
    {
      title: "Release Date",
      component: <ReleaseDate data={musicData} onChange={onChange} />,
    },
    {
      title: "Submission",
      component: <Submission data={musicData} onChange={onChange} />,
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();    
    const res = await MusicCatalogService.edit(id, updateData);
  };

  return (
    <div className="releaseaudio_page">
      <div className="tab-navigation_are">
        <div className="tab-navigation">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`tab ${index === currentStep ? "active" : ""}`}
              onClick={() => handleStepChange(index)}
            >
              <BiCheck className="icons" />
              {step.title}
            </div>
          ))}
        </div>
      </div>
      <div className="steps">{steps[currentStep].component}</div>
      <div className="btn_area">
        <button
          className="btn"
          onClick={() => handleStepChange(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Back
        </button>
        {currentStep === steps.length - 1 ? (
          <Link to="/all-release">
            <button className="btn" onClick={onSubmit}>
              Submit
            </button>
          </Link>
        ) : (
          <button
            className="btn"
            onClick={() => handleStepChange(currentStep + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default ReleaseAudioEdit;
