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
    render: (SId) => (
      <a href={SId} target="_new">
        {SId?.length > 20 ? SId.substring(0, 20) + "..." : SId}
      </a>
    ),
  },
  {
    title: "Apple ID",
    dataIndex: "AId",
    render: (AId) => (
      <a href={AId} target="_new">
        {AId?.length > 20 ? AId.substring(0, 20) + "..." : AId}
      </a>
    ),
  },
  {
    title: "Facebook URL",
    dataIndex: "FId",
    render: (FId) => (
      <a href={FId} target="_new">
        {FId?.length > 20 ? FId.substring(0, 20) + "..." : FId}
      </a>
    ),
  },
  {
    title: "Instagram ID",
    dataIndex: "IId",
    render: (IId) => (
      <a href={IId} target="_new">
        {IId?.length > 20 ? IId.substring(0, 20) + "..." : IId}
      </a>
    ),
  },
  {
    title: "YouTube Channel URL",
    dataIndex: "YCU",
    render: (YCU) => (
      <a href={YCU} target="_new">
        {YCU?.length > 20 ? YCU.substring(0, 20) + "..." : YCU}
      </a>
    ),
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
          <PrimaryArtistEditPopup id={id} isShow={data?.isEdit} />
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
