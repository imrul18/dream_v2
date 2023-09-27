import { Table } from "antd";
import React from "react";
import DeletePopup from "../Modal/DeletePopup";
import EditAssetsPopup from "../Modal/EditAssetsPopup";

// const CustomAudioPlayer = ({ audio }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className="custom-audio-player">
//       <audio ref={audioRef} src={audio} />
//       <button className="play_btn" onClick={togglePlayPause}>
//         {isPlaying ? <FaPause /> : <FaPlay />}
//       </button>
//     </div>
//   );
// };

const EditAssetsTable = ({
  originalData,
  data,
  onTrackEdit,
  onTrackDelete,
}) => {
  const columns = [
    // {
    //   title: "#",
    //   dataIndex: "audio",
    //   render: (audio) => <CustomAudioPlayer audio={audio} />,
    // },
    {
      title: "Track",
      dataIndex: "track",
    },
    {
      title: "Artist",
      dataIndex: "artist",
    },
    {
      title: "ISRC",
      dataIndex: "ISRC",
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
