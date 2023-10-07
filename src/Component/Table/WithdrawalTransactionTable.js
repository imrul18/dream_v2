import { Table } from "antd";
import React, { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableFilter from "../Filter/TableFilter";
import FailedPopover from "../Popover/FailedPopover";
import SearchBar from "../SearchBar/SearchBar";

const WithdrawalTransactionTable = ({ data, onSearch }) => {
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

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Bank Info",
      dataIndex: "bank_name",
      render: (bank_name, data) => {
        return (
          <div className="bank_info">
            <p className="account_holder_name">{data?.account_holder_name}</p>
            <p className="bank_name">{data?.bank_name}</p>
          </div>
        )
      }
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
            {status === "Failed" && (
              <FailedPopover message={data?.reject_reason} />
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      render: (text, record) => {
        const { status } = record;

        if (status === "Approved") {
          return (
            <div className="r_edit_delete">
              <Link to={record?.file} className="edit" download target="_new">
                <BiDownload className="icons" />
              </Link>
            </div>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return (
    <>
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
        scroll={{ x: 991 }}
      />
    </>
  );
};

export default WithdrawalTransactionTable;
