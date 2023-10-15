import React, { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import FileService from "../../service/FileService";
import ProfileService from "../../service/ProfileService";
import ChangePasswordPopup from "../Modal/ChangePasswordPopup";
import Logo from "../assets/img/Logo.svg";

function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  const getData = async () => {
    const res = await ProfileService.get();
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    setIsOpen(false);
  };

  return (
    <div className="topbar_item">
      <div className="logo">
          <h2 className="text-white fs-5 text-center mb-0">
            <span className="sm-logo">
              <img src={Logo} alt="Logo" />
            </span>
          </h2>
        </div>
      <div className="nav_right">
      {/* <Notification /> */}
      <div className="account_info">
        <p className="name">{data?.username}</p>
        <img src={data?.avatar ? FileService?.image(data?.avatar) : `https://i2.wp.com/ui-avatars.com/api/${data?.first_name}/400`} alt="" />
      </div>
      <div className="toggle_account_info">
        <AiFillSetting className="icons" onClick={toggleMenu} />
        {isOpen && (
          <div className="menu_item">
            <Link to="/profile" onClick={handleSignOut}>
              Profile
              </Link>
            <ChangePasswordPopup />
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default Topbar;
