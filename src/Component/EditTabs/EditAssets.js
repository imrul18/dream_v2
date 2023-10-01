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

  const [truck, setTruck] = useState(data?.tracks);

  useEffect(() => {
    setTruck(data?.tracks ?? []);

    setTableData(
      data?.tracks?.map((itm, index) => ({
        key: itm?.id,
        audio: itm?.file,
        title: itm?.title,
        subtitle: itm?.subtitle,
        artist: itm?.primary_artist?.create?.length
          ? artistOption?.find((itm) => itm?.value == itm?.primary_artist?.create[0]?.Primary_Artist_id?.id)
              ?.label
          : "",
          isrc: itm?.isrc,
      }))
    );
  }, [data]);

  const [tableData, setTableData] = useState([]);

  const onTrackChange = (value) => {
    setTruck([...truck, value]);
    setTableData([
      ...tableData,
      {
        key: value?.id,
        audio: value?.file,
        title: value?.title,
        subtitle: value?.subtitle,
        artist: value?.primary_artist?.create?.length
        ? artistOption?.find((itm) => itm?.value == value?.primary_artist?.create[0]?.Primary_Artist_id?.id)
            ?.label
        : "",
        isrc: value?.isrc,
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
            key: itm?.id,
            audio: itm?.file,
            title: itm?.title,
            subtitle: itm?.subtitle,
            artist: itm?.primary_artist?.create?.length
            ? artistOption?.find((item) => item?.value == itm?.primary_artist?.create[0]?.Primary_Artist_id?.id)
                ?.label
            : "",
            isrc: itm?.isrc,
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
