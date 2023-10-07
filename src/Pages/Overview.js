import moment from "moment";
import React, { useEffect, useState } from "react";
import Selector from "../Component/Selector/Selector";
import EarningHistoryTable from "../Component/Table/EarningHistoryTable";
import EarningService from "../service/EarningService";
import ProfileService from "../service/ProfileService";

function Earning() {
  const [yearsOptions, setYearsOptions] = useState([]);


  const [startDate, setStartDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);

  const getYear = async () => {
    const data = await ProfileService.get();
    setStartDate(new Date(data?.data?.date_created));
  };

  const getYearOptions = async () => {
    const Year = new Date(startDate).getFullYear();
    const array = [];
    for (let index = Year; index <= new Date().getFullYear(); index++) {
      array?.push({ label: index, value: index });
      setYearsOptions(array);
    }
  };

  useEffect(() => {
    getYear();
  }, []);

  useEffect(() => {
    getYearOptions();
  }, [selectedOption]);


  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const getData = async (params) => {
    const res = await EarningService.overview(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        years: moment(item?.issue_date).format("YYYY"),
        month: moment(item?.issue_date).format("MMMM"),
        date: moment(item?.issue_date).format("DD/MM/YYYY"),
        amount: item?.amount,
      };
    });
    setData(finalData);
    setTableData(finalData);
  };

  useEffect(() => {
    if (selectedOption) {
      setTableData(data?.filter((item) => item?.years == selectedOption?.value));
    }else{
      setTableData(data);
    }
  }, [selectedOption]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="section_title border_bottom">
        <div className="text_area">
          <h1>Earning Overview</h1>
          <p>A deep dive into your financial situation</p>
        </div>
      </div>
      <div className="table_content">
        <h2>All Time Earning Transactions</h2>
        <div className="table_title">
          <p>Show {tableData?.length} entries</p>
          <Selector
            options={yearsOptions}
            onChange={handleChange}
            placeholder="This Year"
            value={selectedOption}
          />
        </div>
        <EarningHistoryTable data={tableData} />
      </div>
    </div>
  );
}

export default Earning;
