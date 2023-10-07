import React from "react";
import d_card_1 from "../assets/img/D_card_1.png";
import d_card_2 from "../assets/img/D_card_2.png";
import d_card_3 from "../assets/img/D_card_3.png";
import Card from "./Card";

const DashboardCardList = ({data}) => {
  const cardData = [
    {
      d_bg: d_card_1,
      title: "Total Created Audio",
      bgTitle: data?.total,
    },
    {
      d_bg: d_card_2,
      title: "Total Pending Audio",
      bgTitle: data?.pending,
    },
    {
      d_bg: d_card_3,
      title: "Total Release Audio",
      bgTitle: data?.published,
    },
  ];

  return (
    <div className="row">
      {cardData.map((card, index) => (
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" key={index}>
          <Card
            d_bg={card.d_bg}
            title={card.title}
            bgTitle={card.bgTitle}
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardCardList;
