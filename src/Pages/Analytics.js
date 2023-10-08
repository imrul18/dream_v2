import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import PrimaryBtn from "../Component/Button/PrimaryBtn";
import Selector from "../Component/Selector/Selector";
import AnalyticsTable from "../Component/Table/AnalyticsTable";
import AnalyticService from "../service/AnalyticService";
import OptionService from "../service/OptionService";
import ProfileService from "../service/ProfileService";

function Analytics() {
  const [startDate, setStartDate] = useState(new Date());

  const getYear = async () => {
    const data = await ProfileService.get();
    setStartDate(new Date(data?.data?.date_created));
  };

  const [yearsOptions, setYearsOptions] = useState([]);
  const monthsList = [
    { sl: 1, label: "January", value: "January" },
    { sl: 2, label: "February", value: "February" },
    { sl: 3, label: "March", value: "March" },
    { sl: 4, label: "April", value: "April" },
    { sl: 5, label: "May", value: "May" },
    { sl: 6, label: "June", value: "June" },
    { sl: 7, label: "July", value: "July" },
    { sl: 8, label: "August", value: "August" },
    { sl: 9, label: "September", value: "September" },
    { sl: 10, label: "October", value: "October" },
    { sl: 11, label: "November", value: "November" },
    { sl: 12, label: "December", value: "December" },
  ];
  const [monthsOptions, setMonthsOptions] = useState([]);

  const [labelOptions, setLabelOptions] = useState([]);

  const [error, setError] = useState({});
  const [params, setParams] = useState({
    year: new Date().getFullYear(),
    month: monthsList?.find((itm) => itm?.sl == new Date().getMonth() + 1)
      ?.value,
  });

  useEffect(() => {
    setParams({
      ...params,
      label: labelOptions?.length ? labelOptions[0]?.value : null,
    });
  }, [labelOptions]);

  const handleChange = (selectedOption) => {
    setParams({ ...params, ...selectedOption });
  };

  const getYearOptions = async () => {
    const Year = new Date(startDate).getFullYear();
    const array = [];
    for (let index = Year; index <= new Date().getFullYear(); index++) {
      array?.push({ label: index, value: index });
      setYearsOptions(array);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    let array = [...monthsList];
    if (params?.year == new Date(startDate).getFullYear()) {
      array = array.filter(
        (itm) => itm?.sl >= new Date(startDate).getMonth() + 1
      );
    }
    if (params?.year == new Date().getFullYear()) {
      array = array.filter((itm) => itm?.sl <= new Date().getMonth() + 1);
    }
    setMonthsOptions(array);
  }, [params?.year]);

  const getData = async (params) => {
    const label = await OptionService.label();
    setLabelOptions(
      label?.data?.map((itm) => ({ ...itm, value: itm?.id, label: itm?.title }))
    );
    const res = await AnalyticService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        file: item?.file,
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
    if (!params?.label) {
      setError({ ...error, label: "Please select a label" });
    } else {
      setError({ ...error, label: null });
      const res = await AnalyticService.add(params);
      if (res) {
        getData();
      }
    }
  };

  const onSearch = async (value) => {
    getData({ search: value });
  };

  useEffect(() => {
    getYearOptions();
    getData();
    getYear();
  }, []);

  return (
    <>
      <div className="analytics_page">
        <h2 className="mb-3">User Analytics</h2>
        <div className="analytics_area">
          <Selector
            options={yearsOptions}
            value={yearsOptions?.find((itm) => itm?.value == params?.year)}
            onChange={(e) => handleChange({ year: e?.value })}
            placeholder="All Year"
          />
          <Selector
            options={monthsOptions}
            value={monthsOptions?.find((itm) => itm?.value == params?.month)}
            onChange={(e) => handleChange({ month: e?.value })}
            placeholder="All Months"
          />
          <div>
            <Selector
              options={labelOptions}
              value={labelOptions?.find((itm) => itm?.value === params?.label)}
              onChange={(e) => handleChange({ label: e?.value })}
              placeholder="All Labels"
            />
            {error?.label && (
              <small className="text-danger">{error?.label}</small>
            )}
          </div>
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
