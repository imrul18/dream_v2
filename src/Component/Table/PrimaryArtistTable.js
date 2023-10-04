import { Table } from "antd";
import PrimaryArtistEditPopup from "../Modal/PrimaryArtistEditPopup";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    className: "name",
  },
  {
    title: "Spotify ID",
    dataIndex: "SId",
  },
  {
    title: "Apple ID",
    dataIndex: "AId",
  },
  {
    title: "Facebook URL",
    dataIndex: "FId",
  },
  {
    title: "Instagram ID",
    dataIndex: "IId",
  },
  {
    title: "YouTube Channel URL",
    dataIndex: "YCU",
  },
  {
    title: "Action",
    dataIndex: "id",
    render: (id, data) => {
      // const onClick = async () => {
      //   await PrimaryArtistService.deleteItem(id);
      //   PrimaryArtistService.get();
      // };
      return (
        <div className="r_edit_delete">
          <PrimaryArtistEditPopup id={id} isShow={data?.isEdit}/>
          {/* <DeletePopup onClick={onClick} /> */}
        </div>
      );
    },
  },
];
const onChange = (pagination, filters, sorter, extra) => {};
const PrimaryArtistTable = ({ data, onEdit }) => (
  <span>
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      scroll={{ x: 991 }}
    />
  </span>
);

export default PrimaryArtistTable;
