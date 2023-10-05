import { Table } from "antd";
import React, { useState } from "react";
import TableFilter from "../Filter/TableFilter";
import SearchBar from "../SearchBar/SearchBar";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Channel Link",
    dataIndex: "channel_link",
  },
  {
    title: "Topic Link",
    dataIndex: "t_link",
  },
  {
    title: "UPC1",
    dataIndex: "UPC1",
  },
  {
    title: "UPC2",
    dataIndex: "UPC2",
  },
  {
    title: "UPC3",
    dataIndex: "UPC3",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
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
          {/* {status === "Failed" && <FailedPopover />} */}
        </div>
      );
    },
  },
];

const ArtistChannelRequestTable = ({data, onSearch}) => {
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

      <div className="table_title mt-3">
        <p>Show {data?.length} entries</p>
        <SearchBar onSearch={onSearch}/>
      </div>
      <Table
        columns={columns}
        dataSource={getFilteredData(data)}
        scroll={{ x: 768 }}
      />
    </>
  );
};

export default ArtistChannelRequestTable;
