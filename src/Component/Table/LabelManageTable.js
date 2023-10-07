import { Divider, Radio, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableFilter from "../Filter/TableFilter";
import FailedPopover from "../Popover/FailedPopover";
import SearchBar from "../SearchBar/SearchBar";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Youtube URL",
    dataIndex: "youtube_url",
    render: (youtube_url) => <Link to={youtube_url} target="_blank">{youtube_url}</Link>,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status, data) => {
      let color;
      let className = "";

      if (status === "Pending") {
        color = "black";
        className = "pending";
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
          {status === "Failed" && <FailedPopover message={data?.failed_reason}/>}
        </div>
      );
    },
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const PrimaryArtistTable = ({data, onSearch}) => {
  const [selectionType, setSelectionType] = useState("checkbox");
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
    <div>
      {/* Filter Area */}
      <TableFilter
        selectedStatus={selectedStatus}
        handleFilter={handleFilter}
      />

      <div className="table_title mt-3">
        <p>Total {data?.length} entries</p>
        <SearchBar onSearch={onSearch}/>
      </div>

      {/* Table Area */}
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      ></Radio.Group>

      <Divider />

      <Table
        className="release_audio_table"
        onChange={onChange}
        columns={columns}
        dataSource={getFilteredData(data)}
        scroll={{ x: 768 }}
      />
    </div>
  );
};

export default PrimaryArtistTable;
