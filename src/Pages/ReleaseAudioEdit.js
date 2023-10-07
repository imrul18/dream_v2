import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import EditAssets from "../Component/EditTabs/EditAssets";
import Release from "../Component/EditTabs/Release";
import ReleaseDate from "../Component/EditTabs/ReleaseDate";
import Submission from "../Component/EditTabs/Submission";
import MusicCatalogService from "../service/MusicCatalogService";
import { setOldData, setUpdateData } from "./reduxStore";

function ReleaseAudioEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const getMusicData = async () => {
    const res = await MusicCatalogService.getById(id);
    const data = {
      id: res?.data?.id,
      title: res?.data?.title,
      subtitle: res?.data?.subtitle,
      c_line: res?.data?.c_line,
      cover_image: res?.data?.cover_image?.id,
      featuring: res?.data?.featuring?.map((item) => item?.artist_name),
      format: res?.data?.format,
      genre: res?.data?.genre,
      label: res?.data?.label?.id,
      main_release_date: res?.data?.main_release_date,
      original_release_date: res?.data?.original_release_date,
      p_line: res?.data?.p_line,
      primary_artist: res?.data?.primary_artist?.map(item => item?.Primary_Artist_id?.id),
      producer_catalogue_number: res?.data?.producer_catalogue_number,
      production_year: res?.data?.production_year,
      upc: res?.data?.upc,
      various_art_compilation: res?.data?.various_art_compilation,
      tracks: res?.data?.tracks?.map((item) => {
          return {
            id: item?.id,
            arranger: item?.arranger?.map((item) => item?.arranger_name),
            composer: item?.composer?.map((item) => item?.composer_name),
            featuring: item?.featuring?.map((item) => item?.artist_name),
            file: item?.file?.id,
            genre: item?.genre,
            instrumental: item?.instrumental,
            isrc: item?.isrc,
            lyrics: item?.lyrics,
            lyrics_language: item?.lyrics_language,
            lyrics_writter: item?.lyrics_writter?.map((item) => item?.writer_name),
            p_line: item?.p_line,
            parental_advisory: item?.parental_advisory,
            primary_artist: item?.primary_artist?.map(item => item?.Primary_Artist_id?.id),
            producer: item?.producer?.map((item) => item?.producer_name),
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
    };

    dispatch(setOldData(data));
    dispatch(setUpdateData(data));
  }

  useEffect(() => {
    if (id) getMusicData();
  }, [id]);

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
              onClick={() => handleStepChange(index)}
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

export default ReleaseAudioEdit;
