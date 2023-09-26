import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditAssets from "../Component/Tabs/EditAssets";
import Release from "../Component/Tabs/Release";
import ReleaseDate from "../Component/Tabs/ReleaseDate";
import Submission from "../Component/Tabs/Submission";
import { setMusicData } from "./reduxStore";



function ReleaseAudio() {
  const dispatch = useDispatch();
  const { musicData } = useSelector((state) => state.reduxStore);

  const onChange = (value) => {
    dispatch(setMusicData({ ...musicData, ...value }));
  };

  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const steps = [
    { title: "Release", component: <Release data={musicData} onChange={onChange}/> },
    { title: "Edit Assets", component: <EditAssets data={musicData} onChange={onChange}/> },
    { title: "Release Date", component: <ReleaseDate onChange={onChange}/> },
    { title: "Submission", component: <Submission onChange={onChange}/> },
  ];

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
            <button className="btn">Submit</button>
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

export default ReleaseAudio;
