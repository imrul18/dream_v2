import { DatePicker, Space } from "antd";
import React from "react";

const EditAssets = ({ data, onChange }) => {

  const onDateChange = (date, dateString) => {
    onChange({main_release_date: dateString})
  };

  const disabledDate = (current) => {
    return current && current < new Date();
  };

  return (
    <form className="r_input_group">
      <div className="mt-3">
        <label htmlFor="" className="mb-2">
          Choose a main release date <span className="input_star">*</span>
        </label>
        <div className="checkbox_item">
          <Space direction="vertical">
            <DatePicker onChange={onDateChange} disabledDate={disabledDate} />
          </Space>
        </div>
      </div>
    </form>
  );
};

export default EditAssets;
