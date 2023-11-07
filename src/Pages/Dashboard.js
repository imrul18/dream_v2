import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LatestReleaseCard from "../Component/CatalogsCard/LatestReleaseCard";
import DashboardCardList from "../Component/DashboardCard/DashboardCardList";
import DashboardSlider from "../Component/Slider/DashboardSlider";
import swiper_img from "../Component/assets/img/Swiper_img/Swiper-bg.png";
import DashboardService from "../service/DashboardService";
import EarningService from "../service/EarningService";
import FileService from "../service/FileService";
import MusicCatalogService from "../service/MusicCatalogService";
import PrimaryArtistService from "../service/PrimaryArtistService";
import ProfileService from "../service/ProfileService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [sliderData, setSliderData] = useState([
    swiper_img,
    swiper_img,
    swiper_img,
    swiper_img,
  ]);
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [releaseData, setReleaseData] = useState([]);
  const [balance, setBalance] = useState(0.0);

  const getData = async () => {
    const user = await ProfileService.get();
    setUserData(user?.data);

    const res = await PrimaryArtistService.get();
    setData(
      res?.data?.map((item) => {
        return {
          id: item?.id,
          image: item?.image
            ? FileService?.image(item.image)
            : `https://i2.wp.com/ui-avatars.com/api/${item?.name}/400`,
        };
      })
    );

    const music = await MusicCatalogService.get();
    const data = {
      total: music?.data?.length,
      pending: music?.data?.filter((item) => item?.status == "pending")?.length,
      published: music?.data?.filter((item) => item?.status == "published")
        ?.length,
    };
    setCardData(data);

    const result = await MusicCatalogService.get();
    const finalData = result?.data
      ?.filter((item, index) => index < 4)
      ?.map((item, index) => ({
        sImg: item?.cover_image
          ? FileService?.image(item.cover_image)
          : `https://i2.wp.com/ui-avatars.com/api/${item?.title}/400`,
        id: item?.id,
        title: item?.title,
        sTitle: item?.subtitle,
        status: item?.status,
      }));
    setReleaseData(finalData);

    const currentBalance = await EarningService.getBalance();
    if (currentBalance?.data?.length) {
      setBalance(parseFloat(currentBalance?.data[0]?.total).toFixed(2));
    }

    const slider = await DashboardService.get();
    const sliderData = slider?.data?.header_images?.map((item) => {
      return FileService?.image(item?.directus_files_id);
    });
    if (sliderData?.length) {
      setSliderData(sliderData);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-xl-12">
            <DashboardSlider data={userData} sliderData={sliderData} />
          </div>
        </div>
        <div className="mt-4">
          <DashboardCardList data={cardData} />
        </div>
        <div className="artist_row mt-5">
          <div className="artist_item">
            <ul className="mt-2">
              <li className="add_artist">
                <Link to="/primary_artist_manage?create=1">
                  <FaPlus />
                </Link>
              </li>
              {data?.map((item, index) => (
                <li key={index} className="border rounded-circle">
                  <Link to={`/primary_artist_manage?edit_id=${item?.id}`}>
                    <img
                      src={item?.image}
                      alt=""
                      className="border rounded-circle"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row mt-5">
          <div className="relese_card_list mt-2">
            <Link to="/release-audio" className="add_realese">
              <FaPlus className="icons" />
              <p>Create New Release</p>
            </Link>
            <LatestReleaseCard data={releaseData} />
          </div>
          <div className="f_performance mt-5">
            <h3>
              Your <br />
              Financial <br />
              Performance
            </h3>
            <h1>
              <span>₹</span> {balance}
            </h1>
            <button className="btn" onClick={() => navigate("/withdraw")}>
              Show More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
