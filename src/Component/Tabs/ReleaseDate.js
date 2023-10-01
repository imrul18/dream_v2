import { DatePicker, Space } from "antd";
import React from "react";

const EditAssets = ({ data, onChange, currentStep, setCurrentStep  }) => {
  const onDateChange = (date, dateString) => {
    onChange({ main_release_date: dateString });
  };

  const disabledDate = (current) => {
    return current && current < new Date();
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
                  onChange={onDateChange}
                  disabledDate={disabledDate}
                />
              </Space>
            </div>
          </div>
        </form>
      </div>
      <div className="btn_area">
        <button className="btn" onClick={() => setCurrentStep(currentStep - 1)}>
          Back
        </button>
        <button className="btn" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </button>
      </div>
    </>
  );
};

export default EditAssets;
