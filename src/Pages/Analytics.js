import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import PrimaryBtn from "../Component/Button/PrimaryBtn";
import Selector from "../Component/Selector/Selector";
import AnalyticsTable from "../Component/Table/AnalyticsTable";
import AnalyticService from "../service/AnalyticService";
import OptionService from "../service/OptionService";

function Analytics() {
  const [yearsOptions, setYearsOptions] = useState([]);
  const [monthsOptions, setMonthsOptions] = useState([
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ]);
  const [labelOptions, setLabelOptions] = useState([]);

  const [params, setParams] = useState({
    year: new Date().getFullYear(),
    month: monthsOptions[new Date().getMonth()]?.label,
  });

  const handleChange = (selectedOption) => {
    setParams({ ...params, ...selectedOption });
  };

  const getYearOptions = async () => {
    const Year = new Date().getFullYear();
    const array = [];
    for (let index = Year - 3; index < Year + 3; index++) {
      array?.push({ label: index, value: index });
      setYearsOptions(array);
    }
  };

  const [data, setData] = useState([]);
  const getData = async (params) => {
    const label = await OptionService.label();
    setLabelOptions(
      label?.data?.map((itm) => ({ ...itm, value: itm?.id, label: itm?.title }))
    );
    const res = await AnalyticService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        years: item?.year,
        month: item?.month,
        label: label?.data?.find((itm) => itm?.id == item?.label)?.title,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
        failed_reason: item?.failed_reason,
      };
    });
    setData(finalData);
  };

  const submitAnalytics = async () => {
    const res = await AnalyticService.add(params);
    if (res) {
      getData();
    }
  };

  const onSearch = async (value) => {
    getData({ search: value });
  };

  useEffect(() => {
    getYearOptions();
    getData();
  }, []);

  return (
    <>
      <div className="analytics_page">
        <h2 className="mb-3">User Analytics</h2>
        <div className="analytics_area">
          <Selector
            options={yearsOptions}
            value={yearsOptions?.find((itm) => itm?.value === params?.year)}
            onChange={(e) => handleChange({ year: e?.value })}
            placeholder="All Year"
          />
          <Selector
            options={monthsOptions}
            value={monthsOptions?.find((itm) => itm?.value === params?.month)}
            onChange={(e) => handleChange({ month: e?.value })}
            placeholder="All Months"
          />
          <Selector
            options={labelOptions}
            value={labelOptions?.find((itm) => itm?.value === params?.label)}
            onChange={(e) => handleChange({ label: e?.value })}
            placeholder="All Labels"
          />
          <PrimaryBtn label="Submit" onClick={submitAnalytics} />
        </div>
        <div className="table_content">
          <h2 className="mb-5">User Analytics History</h2>
          <AnalyticsTable data={data} onSearch={onSearch} />
        </div>
      </div>
    </>
  );
}

export default Analytics;
