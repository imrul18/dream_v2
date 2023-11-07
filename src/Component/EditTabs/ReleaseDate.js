import { Space } from "antd";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateData } from "../../Pages/reduxStore";

const EditAssets = ({ currentStep, setCurrentStep }) => {
  const dispatch = useDispatch();
  const { updateData } = useSelector((state) => state.reduxStore);

  const setData = (data) => {
    dispatch(setUpdateData({ ...updateData, ...data }));
  };

  const clickPrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const clickNext = () => {
    if (updateData?.main_release_date) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      const dateToCompare = new Date(updateData?.main_release_date);

      if (dateToCompare >= currentDate) {
        setCurrentStep(currentStep + 1);
      } else {
        alert("selected date is not valid a date");
      }
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
                  selected={new Date(updateData?.main_release_date ?? null)}
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
