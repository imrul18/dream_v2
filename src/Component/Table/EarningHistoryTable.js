import { Table } from "antd";
const columns = [
  {
    title: "Issue Date",
    dataIndex: "date",
  },
  {
    title: "Years",
    dataIndex: "years",
  },
  {
    title: "Month",
    dataIndex: "month",
  },
  {
    title: "Status",
    dataIndex: "amount",
    render: (amount) => <span>₹ {amount}</span>,
  },
];

const EarningHistoryTable = ({ data }) => (
  <Table columns={columns} dataSource={data} scroll={{ x: 768 }} />
);

export default EarningHistoryTable;
