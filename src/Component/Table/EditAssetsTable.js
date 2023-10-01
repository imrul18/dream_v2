import { Table } from "antd";
import React, { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import FileService from "../../service/FileService";
import DeletePopup from "../Modal/DeletePopup";
import EditAssetsPopup from "../Modal/EditAssetsPopup";

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

const EditAssetsTable = ({
  originalData,
  data,
  onTrackEdit,
  onTrackDelete,
}) => {
  const columns = [
    {
      title: "#",
      dataIndex: "audio",
      render: (audio) => <CustomAudioPlayer audio={audio} />,
    },
    {
      title: "Track",
      dataIndex: "title",
    },
    {
      title: "Sub Ttile",
      dataIndex: "subtitle",
    },
    {
      title: "ISRC",
      dataIndex: "isrc",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="r_edit_delete">
          <EditAssetsPopup
            oldData={originalData?.find((itm) => itm?.id == record?.key)}
            onTrackChange={(e) => onTrackEdit(e)}
          />
          <DeletePopup onClick={() => onTrackDelete(record?.key)} />
        </div>
      ),
    },
  ];
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

export default EditAssetsTable;
