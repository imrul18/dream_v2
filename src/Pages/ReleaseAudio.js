import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditAssets from "../Component/Tabs/EditAssets";
import Release from "../Component/Tabs/Release";
import ReleaseDate from "../Component/Tabs/ReleaseDate";
import Submission from "../Component/Tabs/Submission";
import MusicCatalogService from "../service/MusicCatalogService";
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
    {
      title: "Release",
      component: <Release data={musicData} onChange={onChange} />,
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
    const data = {
      title: musicData?.title,
      subtitle: musicData?.subtitle,
      c_line: musicData?.c_line,
      cover_image: musicData?.cover_image,
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
      tracks: {
        create: musicData?.tracks?.map((item) => {
          return {
            arranger: item?.arranger,
            composer:item?.composer,
            featuring: item?.featuring,
            file: item?.file, //this is missing
            genre: item?.genre,
            instrumental: item?.instrumental,
            isrc: item?.isrc,
            lyrics: item?.lyrics,
            lyrics_language: item?.lyrics_language,
            lyrics_writter: item?.lyrics_writter,
            p_line: item?.p_line,
            parental_advisory: item?.parental_advisory,
            primary_artist: item?.primary_artist,
            producer: item?.producer,
            producer_catalogue_number: item?.producer_catalogue_number,
            production_year: item?.production_year,
            publisher: item?.publisher,
            remixer: item?.remixer,
            secondary_track_type: item?.secondary_track_type,
            subtitle: item?.subtitle,
            title: item?.title,
            track_title_language: item?.track_title_language,
          };
        }),
        delete: [],
        update: [],
      },
    };
    const res = await MusicCatalogService.add(data);
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

export default ReleaseAudio;
