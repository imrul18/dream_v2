import React, { useEffect, useState } from "react";
import ProfileImageUploader from "../Component/ImageUpload/ProfileImageUploader";
import InputField from "../Component/InputField/InputField";
import ProfileService from "../service/ProfileService";

function Profile() {
  const [data, setData] = useState({});
  const [update, setUpdate] = useState({});

  const getData = async () => {
    const res = await ProfileService.get();
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const onHandleChange = (name, value) => {
    setData({ ...data, [name]: value });
    setUpdate({ ...update, [name]: value });
  };
  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async() => {
    await ProfileService.update(update);
    setIsEditable(false);
    alert("Profile Updated Successfully");
  };

  return (
    <>
      <div className="user_profile_top mb-5">
        <div className="user_p_info">
          <ProfileImageUploader uploadedPhoto={data?.avatar} setUploadedPhoto={e=>onHandleChange("avatar", e)} />
          <div className="text_area">
            <h2>{data?.username}</h2>
            <p className="mt-2">
              Govt. ID: <span>{data?.govt_id}</span>
            </p>
          </div>
        </div>
        <div>
          {isEditable ? (
            <button className="btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 ">
          <div className="profile_input_area">
            <InputField
              label="First Name"
              value={data?.first_name}
              onChange={(e) => onHandleChange("first_name", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="Last Name"
              value={data?.last_name}
              onChange={(e) => onHandleChange("last_name", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="City"
              value={data?.city}
              onChange={(e) => onHandleChange("city", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="State"
              value={data?.state}
              onChange={(e) => onHandleChange("state", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="profile_input_area">
            <InputField
              label="Address Line 1"
              value={data?.line_1}
              onChange={(e) => onHandleChange("line_1", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="Address Line 2"
              value={data?.line_2}
              onChange={(e) => onHandleChange("line_2", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="Postal Code"
              value={data?.post}
              onChange={(e) => onHandleChange("post", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="Country / Region"
              value={data?.country}
              onChange={(e) => onHandleChange("country", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="profile_input_area mt-4">
            <InputField
              label="Email Address"
              value={data?.email}
              type="text"
              error={null}
              disabled
            />
            <InputField
              label="Phone Number"
              value={data?.phone}
              onChange={(e) => onHandleChange("phone", e.target.value)}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <div>
              <InputField
                label="Whatsapp Number"
                value={data?.whatsapp_number}
                onChange={(e) =>
                  onHandleChange("whatsapp_number", e.target.value)
                }
                type="text"
                error={null}
                disabled={!isEditable}
              />
              <span className="enable_wp">
                <input
                  type="checkbox"
                  checked={data?.receive_whatsapp_notification}
                  onChange={(e) =>
                    onHandleChange(
                      "receive_whatsapp_notification",
                      e.target.checked
                    )
                  }
                />
                Add Whatsapp Notification
              </span>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-6 mt-5">
          <h2>My Email Address</h2>
          <InputField
            label="Primary E-mail"
            value={email}
            onChange={handleEmail}
            type="text"
            error={null}
            disabled={!isEditable}
          />
        </div> */}
      </div>
    </>
  );
}

export default Profile;
