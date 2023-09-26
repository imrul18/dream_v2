import React, { useEffect, useState } from "react";
import AddAssetsPopup from "../Modal/AddAssetsPopup";
import EditAssetsPopup from "../Modal/EditAssetsPopup";
import EditAssetsTable from "../Table/EditAssetsTable";

function EditAssets({ data, onChange }) {
  const [truck, setTruck] = useState(data?.tracks ?? []);

  const onTrackChange = (value) => {
    setTruck([...truck, value]);
  };

  useEffect(() => {
    onChange({ tracks: truck });
  }, [truck]);

  return (
    <div className="edit_assets">
      <AddAssetsPopup onChange={onTrackChange} />
      <EditAssetsPopup data={truck} onChange={onTrackChange} />
      <EditAssetsTable data={truck} />
    </div>
  );
}

export default EditAssets;
