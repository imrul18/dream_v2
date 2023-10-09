import moment from "moment";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "../Component/Button/PrimaryBtn";
import InputField from "../Component/InputField/InputField";
import Selector from "../Component/Selector/Selector";
import ManualClaimRequestTable from "../Component/Table/ManualClaimRequestTable";
import ManualClaimService from "../service/ManualClaimService";

function ManualClaimRequest() {
  const [error, setError] = useState({});

  const [channelLink, setChannelLink] = useState("");
  const [isrc, setIsrc] = useState("");
  const [timing, setTiming] = useState("");
  const [selectedOptionL, setSelectedOptionL] = useState(null);
  const [upc, setUpc] = useState("");

  const handleChannelLinkChange = (event) => {
    setChannelLink(event.target.value);
  };

  const handleIsrcChange = (event) => {
    setIsrc(event.target.value);
  };

  const handleTimingChange = (event) => {
    setTiming(event.target.value);
  };

  const handleUpcChange = (event) => {
    setUpc(event.target.value);
  };

  const labelOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const handleChangeL = (selectedOption) => {
    setSelectedOptionL(selectedOption);
  };

  const handleSubmit = async (e) => {
    let error = {};
    let flag = false;
    if (!channelLink) {
      error = { ...error, channelLink: "URL is required" };
      flag = true;
    }
    if (!isrc) {
      error = { ...error, isrc: "ISRC is required" };
      flag = true;
    }
    if (!timing) {
      error = { ...error, timing: "Timing is required" };
      flag = true;
    }
    if (!selectedOptionL) {
      error = { ...error, selectedOptionL: "Content ID Activated is required" };
      flag = true;
    }
    if (!upc) {
      error = { ...error, upc: "UPC is required" };
      flag = true;
    }
    if (flag) {
      setError(error);
    } else {
      setError(null)
      const data = {
        url: channelLink,
        isrc: isrc,
        timing: timing,
        content_id_activated: selectedOptionL?.value,
        upc: upc,
      };
      const res = await ManualClaimService.add(data);
      if (res) {
        setChannelLink("");
        setIsrc("");
        setTiming("");
        setUpc("");
        setSelectedOptionL(null);
        getData();
      }
    }
  };

  const [data, setData] = useState([]);
  const getData = async (params) => {
    const res = await ManualClaimService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        date: moment(item?.date_created).format("DD-MM-YYYY"),
        ISRC: item?.isrc,
        channel_link: item?.url,
        CIA: item?.content_id_activated ? "Yes" : "No",
        UPC: item?.upc,
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
    <div>
      <div className="yt-ex-bg">
        <div className="section_title">
          <div className="text_area mb-2">
            <h2>Manual Claim Request</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <InputField
              label="URL"
              star="*"
              value={channelLink}
              onChange={handleChannelLinkChange}
            />
            {error?.channelLink && (
              <p className="text-danger">{error?.channelLink}</p>
            )}

            <InputField
              label="ISRC"
              star="*"
              value={isrc}
              onChange={handleIsrcChange}
            />
            {error?.isrc && <p className="text-danger">{error?.isrc}</p>}
            <InputField
              label="Timing"
              star="*"
              value={timing}
              onChange={handleTimingChange}
            />
            {error?.timing && <p className="text-danger">{error?.timing}</p>}
            <div className="mt-3">
              <label htmlFor="" className="mb-2">
                Content ID Activated <span style={{ color: "red" }}>*</span>
              </label>
              <Selector
                options={labelOptions}
                onChange={handleChangeL}
                placeholder="Please Select"
                value={selectedOptionL}
              />
              {error?.selectedOptionL && (
                <p className="text-danger">{error?.selectedOptionL}</p>
              )}
            </div>
            <InputField
              label="UPC"
              value={upc}
              star="*"
              onChange={handleUpcChange}
            />
            {error?.upc && <p className="text-danger">{error?.upc}</p>}
            <div className="mt-3">
              <PrimaryBtn label="Submit" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="table_content">
        <h2 className="mb-5">All History</h2>
        <ManualClaimRequestTable data={data} onSearch={onSearch} />
      </div>
    </div>
  );
}
export default ManualClaimRequest;
