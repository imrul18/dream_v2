import moment from "moment";
import React, { useEffect, useState } from "react";
import Selector from "../Component/Selector/Selector";
import EarningHistoryTable from "../Component/Table/EarningHistoryTable";
import EarningService from "../service/EarningService";

function Earning() {
  const options = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption) {
      getData({ year: selectedOption?.value });
    }
  }, [selectedOption]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [data, setData] = useState([]);
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
  };

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
          <p>Show 4 entries</p>
          <Selector
            options={options}
            onChange={handleChange}
            placeholder="This Year"
            value={selectedOption}
          />
        </div>
        <EarningHistoryTable data={data}/>
      </div>
    </div>
  );
}

export default Earning;
