import { Table } from "antd";
import SearchBar from "../SearchBar/SearchBar";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Message",
    dataIndex: "message",
  },
  {
    title: "Last Update",
    dataIndex: "last_up",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  // {
  //   title: "Action",
  //   dataIndex: "reply",
  //   render: () => <SupportReplyPopup />,
  // },
];

const data = [
  {
    key: "1",
    id: "01",
    title: "title.com",
    message: "title.com",
    last_up: "10-12-2023",
    status: "Approved",
  },
  {
    key: "2",
    id: "02",
    title: "title.com",
    last_up: "10-12-2023",
    status: "Pending",
  },
  {
    key: "3",
    id: "03",
    title: "title.com",
    last_up: "10-12-2023",
    status: "Rejected",
  },
];

const SupportHistoryTable = ({ data, onSearch }) => {
  return (
    <>
      <div className="table_title mt-3">
        <p>Show 4 entries</p>
        <SearchBar onSearch={onSearch} />
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: 768 }} />
    </>
  );
};

export default SupportHistoryTable;
