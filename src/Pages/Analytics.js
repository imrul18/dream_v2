import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import PrimaryBtn from '../Component/Button/PrimaryBtn';
import Selector from "../Component/Selector/Selector";
import AnalyticsTable from "../Component/Table/AnalyticsTable";
import AnalyticService from "../service/AnalyticService";

function Analytics() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionM, setSelectedOptionM] = useState(null);
  const [selectedOptionL, setSelectedOptionL] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Selected: ${selectedOption.label}`);
  };
  const handleChangeM = (selectedOptionM) => {
    setSelectedOptionM(selectedOptionM);
    console.log(`Selected: ${selectedOptionM.label}`);
  };
  const handleChangeL = (selectedOptionL) => {
    setSelectedOptionL(selectedOptionL);
    console.log(`Selected: ${selectedOptionL.label}`);
  };

  const years = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const months = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const label = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  useEffect(() => {
    let params = {};
    if (selectedOption) {
      params = { year: selectedOption?.value };
    }
    if (selectedOptionM) {
      params = { ...params, month: selectedOptionM?.value };
    }
    if (selectedOptionL) {
      params = { ...params, label: selectedOptionL?.value };
    }
    getData(params);    
  }, [selectedOption]);


  const [data, setData] = useState([]);
  const getData = async (params) => {
    const res = await AnalyticService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        date: moment(item?.created_at).format("DD-MM-YYYY"),
        url: item?.youtube_url,
        UPC_EAN: item?.upc,
        LNS: item?.label_name_sender,
        LNR: item?.label_name_receiver,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
      };
    });
    setData(finalData);
  };

  const onSearch = async (value) => {
    getData({ search: value });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="analytics_page">
        <h2 className="mb-3">User Analytics</h2>
        <div className="analytics_area">
          <Selector
            options={years}
            onChange={handleChange}
            placeholder="All Year"
            value={selectedOption}
          />
          <Selector
            options={months}
            onChange={handleChangeM}
            placeholder="All Months"
            value={selectedOptionM}
          />
          <Selector
            options={label}
            onChange={handleChangeL}
            placeholder="All Labels"
            value={selectedOptionL}
          />
          <PrimaryBtn label="Submit"/>
        </div>
        <div className="table_content">
          <h2 className="mb-5">User Analytics History</h2>
          <AnalyticsTable data={data} onSearch={onSearch}/>
        </div>
      </div>
    </>
  );
}

export default Analytics;
