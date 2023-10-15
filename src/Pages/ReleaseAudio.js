import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import EditAssets from "../Component/Tabs/EditAssets";
import Release from "../Component/Tabs/Release";
import ReleaseDate from "../Component/Tabs/ReleaseDate";
import Submission from "../Component/Tabs/Submission";

function ReleaseAudio() {

  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const steps = [
    {
      title: "Release",
      component: <Release currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    },
    {
      title: "Edit Assets",
      component: <EditAssets currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    },
    {
      title: "Release Date",
      component: <ReleaseDate currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    },
    {
      title: "Submission",
      component: <Submission currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    },
  ];
 

  return (
    <div className="releaseaudio_page">
      <div className="tab-navigation_are">
        <div className="tab-navigation">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`tab ${index === currentStep ? "active" : ""}`}
              // onClick={() => handleStepChange(index)}
            >
              <BiCheck className="icons" />
              {step.title}
            </div>
          ))}
        </div>
      </div>
      {steps[currentStep].component}     
    </div>
  );
}

export default ReleaseAudio;
