import { Table } from "antd";
import React, { useState } from "react";
import FileService from "../../service/FileService";
import TableFilter from "../Filter/TableFilter";
import FailedPopover from "../Popover/FailedPopover";
import SearchBar from "../SearchBar/SearchBar";
import airtelLogo from "../assets/img/Airtel.png";
import coverImg from "../assets/img/cover.jpg";
import vodafoneLogo from "../assets/img/vodafone.png";

const columns = [
  // {
  //   title: "ID",
  //   dataIndex: "id",
  // },
  {
    title: "Title",
    dataIndex: "title",
    className: "header_title",
    render: (title, data) => {
      return (
        <div className="c_tune_table_title">
          <img
            src={FileService?.image(data?.image)}
            alt=""
            className="table_img"
          />
          <span>{title}</span>
        </div>
      );
    }
  },
  {
    title: "Artist",
    dataIndex: "artist",
  },
  {
    title: "Label",
    dataIndex: "label",
  },
  {
    title: "Upc",
    dataIndex: "upc",
  },
  {
    title: "Stores",
    dataIndex: "stores",
    render: (stores) => {
      return (
        <div className="sim_icons">
          {stores?.map((item, index) => (
            <img key={index} src={FileService?.image(item)} alt="" height={30} width={30}/>
          ))}
        </div>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status, data) => {
      let color;
      let className = ""; // Initialize className with an empty string

      if (status === "Pending") {
        color = "black";
        className = "pending"; // Set className to "pending" when status is "Pending"
      } else if (status === "Approved") {
        color = "black";
        className = "approved";
      } else if (status === "Failed") {
        color = "black";
        className = "filter_failed";
      } else {
        color = "black";
      }

      return (
        <div className="status_area">
          <span className={`status ${className}`} style={{ color }}>
            {status}
          </span>
          {status === "Failed" && <FailedPopover message={data?.failed_reason} />}
        </div>
      );
    },
  },
];
const data = [
  {
    key: "1",
    title: (
      <div className="c_tune_table_title">
        <img src={coverImg} alt="" className="table_img" />
        <span>Title Here</span>
      </div>
    ),
    artist: "Artist Name",
    label: "no info",
    upc: <span>UPC: 10 </span>,
    stores: (
      <div className="sim_icons">
        <img src={airtelLogo} alt="" />
        <img src={vodafoneLogo} alt="" />
      </div>
    ),
    status: "Approved",
  },
  {
    key: "2",
    title: (
      <div className="c_tune_table_title">
        <img src={coverImg} alt="" className="table_img" />
        <span>Title Here</span>
      </div>
    ),
    artist: "Artist Name",
    label: "no info",
    upc: <span>UPC: 10 </span>,
    stores: (
      <div className="sim_icons">
        <img src={airtelLogo} alt="" />
        <img src={vodafoneLogo} alt="" />
      </div>
    ),
    status: "Pending",
  },
  {
    key: "3",
    title: (
      <div className="c_tune_table_title">
        <img src={coverImg} alt="" className="table_img" />
        <span>Title Here</span>
      </div>
    ),
    artist: "Artist Name",
    label: "no info",
    upc: <span>UPC: 10 </span>,
    stores: (
      <div className="sim_icons">
        <img src={airtelLogo} alt="" />
        <img src={vodafoneLogo} alt="" />
      </div>
    ),
    status: "Failed",
  },
];

const CallerTuneTable = ({ data, onSearch }) => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleFilter = (status) => {
    setSelectedStatus(status);
  };

  const getFilteredData = (data) => {
    if (selectedStatus === "all") {
      return data;
    } else {
      return data.filter((item) => item.status === selectedStatus);
    }
  };
  return (
    <>
      {/* Filter Area */}
      <TableFilter
        selectedStatus={selectedStatus}
        handleFilter={handleFilter}
      />

      <div className="table_title mt-5">
        <p>Total {data?.length} entries</p>
        <SearchBar onSearch={onSearch} />
      </div>

      <Table
        columns={columns}
        dataSource={getFilteredData(data)}
        scroll={{ x: 768 }}
      />
    </>
  );
};

export default CallerTuneTable;
