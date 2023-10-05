import { Space } from "antd";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setMusicData } from "../../Pages/reduxStore";

const EditAssets = ({ currentStep, setCurrentStep }) => {
  const dispatch = useDispatch();
  const { musicData } = useSelector((state) => state.reduxStore);

  const setData = (data) => {
    dispatch(setMusicData({ ...musicData, ...data }));
  };

  const clickPrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const clickNext = () => {
    if (musicData?.main_release_date) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please select a date");
    }
  };

  return (
    <>
      <div className="steps">
        <form className="r_input_group">
          <div className="mt-3">
            <label htmlFor="" className="mb-2">
              Choose a main release date <span className="input_star">*</span>
            </label>

            <div className="checkbox_item">
              <Space direction="vertical">
                <DatePicker
                  selected={new Date(musicData?.main_release_date ?? Date.now())}
                  onChange={(date) => setData({ main_release_date: date })}
                  minDate={new Date()}
                />
              </Space>
            </div>
          </div>
        </form>
      </div>
      <div className="btn_area">
        <button className="btn" onClick={clickPrev}>
          Back
        </button>
        <button className="btn" onClick={clickNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default EditAssets;
