import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import LatestReleaseCard from "../Component/CatalogsCard/LatestReleaseCard";
import DashboardCardList from "../Component/DashboardCard/DashboardCardList";
import DashboardSlider from "../Component/Slider/DashboardSlider";
import artist_img from "../Component/assets/img/artist.png";
import DashboardService from "../service/DashboardService";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const getData = async (params) => {
    const res = await DashboardService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        id: item?.id,
        name: item?.title,
        youtube_url: item?.youtube_url,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
        failed_reason: item?.failed_reason,
      };
    });
    setData(finalData);
  };

  const onSearch = async (value) => {
    getData({ search: value });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <DashboardSlider />
          </div>
        </div>
        <div className="mt-4">
          <DashboardCardList />
        </div>
        <div className="artist_row mt-5">
          <div className="artist_item">
            <ul className="mt-2">
              <li className="add_artist">
                <Link to="/primary_artist_manage">
                  <FaPlus />
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <img src={artist_img} alt="" />
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <img src={artist_img} alt="" />
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <img src={artist_img} alt="" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-5">
          <div className="relese_card_list mt-2">
            <Link to="/release-audio" className="add_realese">
              <FaPlus className="icons" />
              <p>Create New Release</p>
            </Link>
            <LatestReleaseCard />
          </div>
          <div className="f_performance mt-5">
            <h3>
              Your <br />
              Financial <br />
              Performance
            </h3>
            <h1><span>₹</span> 00.00</h1>
            <button className="btn">Show More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
