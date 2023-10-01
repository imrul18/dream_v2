import { Divider, Radio, Table } from "antd";
import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import TableFilter from "../Filter/TableFilter";
import AntPopover from "../Popover/AntPopover";
import SearchBar from "../SearchBar/SearchBar";
import coverImg from "../assets/img/cover.jpg";
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    className: "header_title",
  },
  // {
  //   title: "Label",
  //   dataIndex: "label",
  // },
  // {
  //   title: "Artist",
  //   dataIndex: "artist",
  // },
  {
    title: "Release Date",
    dataIndex: "releaseDate",
  },
  {
    title: "UPC",
    dataIndex: "upc",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let text = "";
      let color;
      let className = "";

      if (status === "Pending") {
        color = "black";
        className = "pending";
        text = "Pending";
      } else if (status === "Ongoing") {
        color = "black";
        className = "unfinished";
        text = "Ongoing";
      } else if (status === "Published") {
        color = "black";
        className = "approved";
        text = "Published";
      } else if (status === "Rejected") {
        color = "black";
        className = "Rejected";
        text = "Rejected";
      } else if (status === "Correction_request") {
        color = "black";
        className = "c_request";
        text = "Correction Request";
      } else {
        color = "black";
      }

      return (
        <span className={`status ${className}`} style={{ color }}>
          {text}
        </span>
      );
    },
  },
  {
    title: "Action",
    render: (text, record) => {
      const { status } = record;
      let iconElement = null;

      if (status === "Pending") {
        iconElement = (
          <div className="r_edit_delete">
            <Link to={`/catalog_details/${record?.id}`} className="edit">
              <FaRegEye className="icons" />
            </Link>
          </div>
        );
      } else if (status === "Ongoing") {
        iconElement = (
          <div className="r_edit_delete">
            <Link to={`/catalog_details/${record?.id}`} className="edit">
              <FaRegEye className="icons" />
            </Link>
          </div>
        );
      } else if (status === "Published") {
        iconElement = (
          <div className="r_edit_delete">
            <Link to={`/catalog_details/${record?.id}`} className="edit">
              <FaRegEye className="icons" />
            </Link>
          </div>
        );
      } else if (status === "Rejected") {
        iconElement = (
          <div className="r_edit_delete">
            <Link to={`/catalog_details/${record?.id}`} className="edit">
              <FaRegEye className="icons" />
            </Link>
            {/* <DeletePopup /> */}
            <AntPopover message={record?.rejection} />
          </div>
        );
      } else if (status === "Correction_request") {
        iconElement = (
          <div className="r_edit_delete">
            <Link to={`/catalog_details/${record?.id}`} className="edit">
              <FaRegEye className="icons" />
            </Link>
            <Link to={`/release-audio/${record?.id}`} className="pen">
              <BiPencil className="icons" />
            </Link>
            {/* <DeletePopup /> */}
            <AntPopover message={record?.rejection} />
          </div>
        );
      }

      return iconElement;
    },
  },
];

const data = [
  {
    key: "Approved",
    title: (
      <div className="c_tune_table_title">
        <img src={coverImg} alt="" className="table_img" />
        <span>Title Here</span>
      </div>
    ),
    label: "no info",
    artist: "name here",
    releaseDate: "22-6-2023",
    upc: <span>123456</span>,
    status: "Approved",
  },
  {
    key: "Pending",
    title: (
      <div className="c_tune_table_title">
        <img src={coverImg} alt="" className="table_img" />
        <span>Title Here</span>
      </div>
    ),
    label: "no info",
    artist: "name here",
    releaseDate: "22-6-2023",
    upc: <span>123456</span>,
    status: "Pending",
  },
  {
    key: "Rejected",
    title: (
      <div className="c_tune_table_title">
        <img src={coverImg} alt="" className="table_img" />
        <span>Title Here</span>
      </div>
    ),
    label: "no info",
    artist: "name here",
    releaseDate: "22-6-2023",
    upc: <span>123456</span>,
    status: "Rejected",
  },
  {
    key: "CorrectionRequest",
    title: (
      <div className="c_tune_table_title">
        <img src={coverImg} alt="" className="table_img" />
        <span>Title Here</span>
      </div>
    ),
    label: "no info",
    artist: "name here",
    releaseDate: "22-6-2023",
    upc: <span>123456</span>,
    status: "Correction Request",
  },
  {
    key: "Unfinished",
    title: (
      <div className="c_tune_table_title">
        <img src={coverImg} alt="" className="table_img" />
        <span>Title Here</span>
      </div>
    ),
    label: "no info",
    artist: "name here",
    releaseDate: "22-6-2023",
    upc: <span>123456</span>,
    status: "Unfinished",
  },
];

const ReleaseAudioTable = ({ data, onSearch }) => {
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
        <p>Show 4 entries</p>
        <SearchBar onSearch={onSearch} />
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
        columns={columns}
        dataSource={getFilteredData(data)}
        scroll={{ x: 768 }}
      />
    </div>
  );
};

export default ReleaseAudioTable;
