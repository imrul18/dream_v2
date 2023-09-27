import React, { useEffect, useState } from "react";
import OptionService from "../../service/OptionService";
import AddAssetsPopup from "../Modal/AddAssetsPopup";
import EditAssetsTable from "../Table/EditAssetsTable";

function EditAssets({ data, onChange }) {
  const [artistOption, setArtistOption] = useState([]);
  const getOptions = async () => {
    const artist = await OptionService.artist();
    setArtistOption(
      artist?.data?.map((itm) => ({
        ...itm,
        value: itm?.id,
        label: itm?.name,
      }))
    );
  };

  useEffect(() => {
    getOptions();
  }, []);

  const [truck, setTruck] = useState([]);

  useEffect(() => {
    setTruck(data?.tracks ?? []);
    setTableData(
      data?.tracks?.map((itm, index) => ({
          key: itm?.id,
          // audio: t_audio,
          track: itm?.title,
          artist: itm?.primary_artist?.length
            ? artistOption?.find(
                (item) => item?.value == itm?.primary_artist[0]
              )?.label
            : "",
          ISRC: itm?.isrc,
        }))
    );
  }, [data]);

  const [tableData, setTableData] = useState([]);
  console.log("🚀 ~ file: EditAssets.js:43 ~ EditAssets ~ tableData:", tableData)

  const onTrackChange = (value) => {
    setTruck([...truck, value]);
    setTableData([
      ...tableData,
      {
        key: value?.id,
        // audio: t_audio,
        track: value?.title,
        artist: value?.primary_artist?.length
          ? artistOption?.find((itm) => itm?.value == value?.primary_artist[0])
              ?.label
          : "",
        ISRC: value?.isrc,
      },
    ]);
  };

  const onTrackEdit = (value) => {
    setTruck(
      truck?.map((itm) => {
        if (itm?.id == value?.id) {
          return value;
        }
        return itm;
      })
    );

    setTableData(
      tableData?.map((itm) => {
        if (itm?.key == value?.id) {
          return {
            key: value?.id,
            // audio: t_audio,
            track: value?.title,
            artist: value?.primary_artist?.length
              ? artistOption?.find(
                  (itm) => itm?.value == value?.primary_artist[0]
                )?.label
              : "",
            ISRC: value?.isrc,
          };
        }
        return itm;
      })
    );
  };

  const onTrackDelete = (id) => {
    setTruck(truck?.filter((itm) => itm?.id != id));
    setTableData(tableData?.filter((itm) => itm?.key != id));
  };

  useEffect(() => {
    onChange({ tracks: truck });
  }, [truck]);

  return (
    <div className="edit_assets">
      <AddAssetsPopup onTrackChange={onTrackChange} />
      <EditAssetsTable
        originalData={truck}
        data={tableData}
        onTrackEdit={onTrackEdit}
        onTrackDelete={onTrackDelete}
      />
    </div>
  );
}

export default EditAssets;
