import React, { useState } from "react";
import Card from "./Card";

function CardList({cards}) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const activateCard = (index) => {
    setActiveCardIndex(index);
  };

  return (
    <div>
      {cards.map((card, index) => (
        <Card
          key={index}
          bankName={card.bankName}
          accountNumber={card.accountNumber}
          companyName={card.companyName}
          activateCard={() => activateCard(index)}
          isActive={index === activeCardIndex}
        />
      ))}
    </div>
  );
}

export default CardList;
