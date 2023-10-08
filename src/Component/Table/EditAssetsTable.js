import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import FileService from "../../service/FileService";
import OptionService from "../../service/OptionService";
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

const EditAssetsTable = ({ data, onTrackEdit, onTrackDelete }) => {
  const [artistOptions, setArtistOptions] = useState([]);
  const getArtistOptions = async () => {
    const res = await OptionService?.artist();
    const finalData = res?.data?.map((item) => ({
      ...item,
      value: item?.id,
      label: item?.name,
    }));
    setArtistOptions(finalData);
  };
  useEffect(() => {
    getArtistOptions();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "file",
      render: (file) => <CustomAudioPlayer audio={file} />,
    },
    {
      title: "Track",
      dataIndex: "title",
    },
    {
      title: "Primary Artist",
      dataIndex: "primary_artist",
      render: (primary_artist) => primary_artist?.length ? artistOptions?.find((itm) => itm?.value == primary_artist[0])?.label : null,
    },
    {
      title: "ISRC",
      dataIndex: "isrc",
    },
    {
      title: "Action",
      render: (text, data) => (
        <div className="r_edit_delete">
          <EditAssetsPopup
            oldData={data}
            onTrackChange={(e) => onTrackEdit(e)}
          />
          <DeletePopup onClick={() => onTrackDelete(data?.id)} />
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
