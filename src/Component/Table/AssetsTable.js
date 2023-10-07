import { Table } from "antd";
import React, { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import FileService from "../../service/FileService";

const columns = [
  {
    title: "#",
    dataIndex: "file",
    render: (file) => <CustomAudioPlayer audio={file} />,
  },
  {
    title: "Track Title",
    dataIndex: "title",
  },
  {
    title: "Sub title",
    dataIndex: "subtitle",
  },
  {
    title: "ISRC",
    dataIndex: "isrc",
  },
  // {
  //   title: "Action",
  //   render: (text, record) => (
  //     <div className="r_edit_delete">
  //       <Link to="#" className="edit">
  //         <BiPencil className="icons" />
  //       </Link>
  //       {/* <Link to="#" className="delete">
  //         <BiTrashAlt className="icons" />
  //       </Link> */}
  //       <DeletePopup/>
  //     </div>
  //   ),
  // },
];


const CustomAudioPlayer = ({ audio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="custom-audio-player">
      <audio ref={audioRef} src={FileService.image(audio)} />
      <button className="play_btn" onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

const AssetsTable = ({data}) => {
  return (
    <div>
      <Table
        className="release_audio_table"
        columns={columns}
        dataSource={data}
        scroll={{ x: 768 }}
      />
    </div>
  );
};

export default AssetsTable;
