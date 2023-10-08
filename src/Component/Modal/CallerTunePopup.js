import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import FileService from "../../service/FileService";
import MusicCatalogService from "../../service/MusicCatalogService";

function CallerTunePopup({ id }) {
  const [show, setShow] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const [crbt, setCrbt] = useState([]);
  console.log("🚀 ~ file: CallerTunePopup.js:14 ~ CallerTunePopup ~ crbt:", crbt)

  const getCRBT = async () => {
    const res = await MusicCatalogService.getCRBT();
    setCrbt(res?.data);
  };

  useEffect(() => {
    getCRBT();
  }, []);

  const handleClose = () => {
    setShow(false);
    setSelectedCards([]);
  };

  const handleShow = () => setShow(true);

  const handleCardClick = (cardName) => {
    const isSelected = selectedCards.includes(cardName);

    if (isSelected) {
      setSelectedCards(selectedCards.filter((card) => card !== cardName));
    } else {
      setSelectedCards([...selectedCards, cardName]);
    }
  };

  const onApply = async () => {
    const data = {
      release_music: id,
      crbt: {
        create: selectedCards.map((item) => ({
          Caller_Tune_id: "+",
          CRBT_id: { id: item },
        })),
        delete: [],
        update: [],
      },
    };
    const res = await MusicCatalogService.addCallerTune(data);
  };

  return (
    <>
      <button className="btn" onClick={handleShow}>
        <FiPhoneCall className="icons" />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Caller Tune details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cTune">
            <div className="items">
              <h2>Select CRBT</h2>
              <div className="item">
                {crbt?.map((item, index) => {
                  if (item?.status == "active") {
                    return (
                      <div
                        className={`card ${
                          selectedCards.includes(item?.id) ? "active" : ""
                        }`}
                        onClick={() => handleCardClick(item?.id)}
                      >
                        <img src={FileService.image(item?.icon)} alt="" />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="items mt-4">
              <h2>Coming Soon CRBT</h2>
              <div className="item">
                {crbt?.map((item, index) => {
                  if (item?.status != "active") {
                    return (
                      <div className="card">
                        <img src={FileService.image(item?.icon)} alt="" />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="items mt-4">
              {/* <TermsAndConditionsCheckbox /> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btn_area">
            <Link to="/caller_tune" className="btn" onClick={onApply}>
              Apply
            </Link>
            <button className="btn_s" onClick={handleClose}>
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CallerTunePopup;
