import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import DashboardService from "../../service/DashboardService";
// import { FaBullhorn, FaTimes } from "react-icons/fa";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await DashboardService.notification();
    const finalData = res?.data?.filter((item) => item?.status != "archived");
    setData(finalData);
  };

  useEffect(() => {
    getData();
  }, []);

  const archivedNotification = async (id) => {
    const res = await DashboardService.archived(id);
    getData();
  };
  // const [isVisible, setIsVisible] = useState(true);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleClose = () => {
  //   setIsVisible(false);
  // };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="toggle_not_info">
        <IoIosNotifications className="icons" color={data?.length > 0 && "red"} onClick={toggleMenu} />({data?.length})
        {isOpen && (
          <div
            className="menu_item"
            ref={menuRef}
            style={{
              backgroundColor: "#4E87F1",
              height: 600,
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
            }}
          >
            {data?.map((item) => (
              <a onClick={() => archivedNotification(item?.id)}>
                <p
                  className="border rounded m-1 px-2"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <b>{item?.subject}</b> <br />
                  <>{item?.message}</> <br />
                  <small>
                    {moment(item?.timestamp).format("DD MMM YYYY hh:mm A")}
                  </small>
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
