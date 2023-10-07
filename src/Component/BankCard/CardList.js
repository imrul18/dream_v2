import React, { useEffect, useRef, useState } from "react";
import { BsBank2 } from "react-icons/bs";
import DeleteBankPopup from "../Modal/DeleteBankPopup";
import EditBankPopup from "../Modal/EditBankPopup";

function CardList({ cards, onAdd }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconsRef = useRef(null);

  const handlePrimaryClick = () => {
    setIsMenuOpen(false); // Close the menu when primary is clicked
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iconsRef.current && !iconsRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {cards.map((card, index) => (
        <div className="bank_card card inactive" key={index}>
          <div className="d-flex align-items-center">
            <div className="bank_icon">
              <BsBank2 className="icons" />
            </div>
            <div className="bank_info ms-4">
              <p>{card?.bank_name}</p>
              <p>{card?.account_number}</p>
              <p>{card?.account_holder_name}</p>
            </div>
          </div>
          <div>
            <EditBankPopup cardData={card} onAdd={onAdd} />
            <DeleteBankPopup cardData={card} onAdd={onAdd} />
          </div>
          {/* <div className="dot_toggle" ref={iconsRef}>
          <BiDotsVerticalRounded className="icons" onClick={handleMenuClick} />
          {isMenuOpen && (
            <div className="toggle_menu">
              <ul>
                <li className="primary" onClick={handlePrimaryClick}>
                </li>
                <li className="mt-2" onClick={() => setIsMenuOpen(false)}>
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div> */}
        </div>
        // <Card
        //   id={card.id}
        //   key={index}
        //   bankName={card.bankName}
        //   accountNumber={card.accountNumber}
        //   companyName={card.companyName}
        // />
      ))}
    </div>
  );
}

export default CardList;
