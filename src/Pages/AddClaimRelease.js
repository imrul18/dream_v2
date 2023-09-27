import moment from "moment";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import PrimaryBtn from "../Component/Button/PrimaryBtn";
import InputField from "../Component/InputField/InputField";
import AddClaimReleaseTable from "../Component/Table/AddClaimReleaseTable";
import ClaimReleaseService from "../service/ClaimReleaseService";
import OptionService from "../service/OptionService";

function AddClaimRelease() {
  const [name, setName] = useState("");
  const [UPCEAN, setUPCEAN] = useState("");
  const [lableName, setLableName] = useState("");
  const [lableNameT, setLableNameT] = useState("");
  const [labelOption, setLabelOption] = useState([]);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleUPCEANChange = (event) => {
    setUPCEAN(event.target.value);
  };
  const handleLableChange = (event) => {
    setLableName(event);
  };
  const handleLableTChange = (event) => {
    setLableNameT(event.target.value);
  };

  const handleSubmit = async (e) => {
    const data = {
      url: name,
      upc: UPCEAN,
      claim_sender: lableName,
      claim_receiver: lableNameT,
    };
    const res = await ClaimReleaseService.add(data);
    if (res) {
      setName("");
      setUPCEAN("");
      setLableName("");
      setLableNameT("");
      getData();
    }
  };

  const [data, setData] = useState([]);
  const getData = async (params) => {
    const label = await OptionService.label();
    setLabelOption(
      label?.data?.map((itm) => ({ ...itm, value: itm?.id, label: itm?.title }))
    );
    const res = await ClaimReleaseService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {
        key: index,
        date: moment(item?.date_created).format("DD-MM-YYYY"),
        url: item?.youtube_url,
        UPC_EAN: item?.upc,
        LNS: label?.data?.find(itm =>itm?.id == item?.claim_sender)?.title,
        LNR: item?.claim_receiver,
        status: item?.status.charAt(0).toUpperCase() + item?.status.slice(1),
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
      <div className="yt-ex-bg">
        <div className="section_title">
          <div className="text_area">
            <h2>Add Claim Release</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <InputField
              label="URL"
              star="*"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <InputField
              label="UPC/EAN"
              star="*"
              type="text"
              value={UPCEAN}
              onChange={handleUPCEANChange}
            />
            <div className="input_f mt-3">
              <label className="mb-2">
                Label Name (Who send a claim){" "}
                <span className="input_star">*</span>
              </label>
              <Select
                options={labelOption}
                value={labelOption?.find((itm) => itm?.value === lableName)}
                onChange={(e) => handleLableChange(e?.value)}
                placeholder="Select Lable"
              />
            </div>
            <InputField
              label="Lable Name (Who received a claim)"
              star="*"
              type="text"
              value={lableNameT}
              onChange={handleLableTChange}
            />
            <div className="mt-4">
              <PrimaryBtn label="Submit" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="table_content">
        <h2 className="mb-5">All History</h2>
        <AddClaimReleaseTable data={data} onSearch={onSearch} />
      </div>
    </>
  );
}

export default AddClaimRelease;
