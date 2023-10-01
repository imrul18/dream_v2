import React, { useEffect, useState } from "react";
import ProfilePhotoUploader from "../Component/ImageUpload/ProfilePhotoUploader";
import InputField from "../Component/InputField/InputField";
import ProfileService from "../service/ProfileService";

function Profile() {
  const [data, setData] = useState({});

  const getData = async () => {
    const user = await ProfileService.get();
    setData(user?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const onChange = (obj) => {
    setData({ ...data, ...obj });
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    const user = await ProfileService.update(data);
    setIsEditable(false);
  };

  return (
    <>
      <div className="user_profile_top mb-5">
        <div className="user_p_info">
          <ProfilePhotoUploader
            photo={data?.avatar}
            onChange={(link) => onChange({ avatar: link })}
          />
          <div className="text_area">
            <h2>{data?.email}</h2>
            <p className="mt-2">
              Govt. ID: <span>{data?.govt_id ?? "Not Available"}</span>
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
              onChange={(e) => onChange({ first_name: e?.target?.value })}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="Last Name"
              value={data?.last_name}
              onChange={(e) => onChange({ last_name: e?.target?.value })}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="Email"
              value={data?.email}
              type="text"
              error={null}
              disabled
            />
            <InputField
              label="Localtion"
              value={data?.localtion}
              onChange={(e) => onChange({ localtion: e?.target?.value })}
              type="text"
              error={null}
              disabled={!isEditable}
            />
            <InputField
              label="Title"
              value={data?.title}
              onChange={(e) => onChange({ title: e?.target?.value })}
              type="text"
              error={null}
              disabled={!isEditable}
            />
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
