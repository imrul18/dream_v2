import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateData } from "../../Pages/reduxStore";
import AddAssetsPopup from "../Modal/AddAssetsPopup";
import EditAssetsTable from "../Table/EditAssetsTable";

function EditAssets({ currentStep, setCurrentStep }) {
  const dispatch = useDispatch();
  const { updateData } = useSelector((state) => state.reduxStore);

  const setData = (data) => {
    dispatch(setUpdateData({ ...updateData, ...data }));
  };

  const [error, setError] = useState(null);
  const [truck, setTruck] = useState([]);

  const onTrackSubmit = (value) => {
    setTruck([...truck, value]);
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
  };

  const onTrackDelete = (id) => {
    setTruck(truck?.filter((itm) => itm?.id != id));
  };

  useEffect(() => {
    setTruck(updateData?.tracks ?? []);
  }, [updateData]);

  const clickPrev = () => {
    if (truck?.length > 0) {
      setData({ tracks: truck });
    }
    setCurrentStep(currentStep - 1);
  };

  const clickNext = () => {
    if (truck?.length > 0) {
      setData({ tracks: truck });
      setCurrentStep(currentStep + 1);
    } else {
      setError("Please add at least one track");
    }
  };
  return (
    <>
      <div className="steps">
        <div className="edit_assets">
          <AddAssetsPopup onSubmit={onTrackSubmit} musicData={updateData}/>

          <EditAssetsTable
            data={truck}
            onTrackEdit={onTrackEdit}
            onTrackDelete={onTrackDelete}
          />
        </div>
        <small className="text-danger">{error}</small>
      </div>

      <div className="btn_area">
        <button className="btn" onClick={clickPrev}>
          Back
        </button>
        <button className="btn" onClick={clickNext}>
          Next
        </button>
      </div>
    </>
  );
}

export default EditAssets;
