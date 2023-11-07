import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function DashboardSlider({ data, sliderData }) {
  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {sliderData?.map((item, index) => (
          <SwiperSlide>
            <div className="swipe_content">
              <img src={item} alt="" />
              <div className="text_content">
                <p>Hello,</p>
                <h1>{data?.first_name}</h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
