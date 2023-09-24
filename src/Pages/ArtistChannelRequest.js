import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PrimaryBtn from '../Component/Button/PrimaryBtn';
import InputField from '../Component/InputField/InputField';
import ArtistChannelRequestTable from '../Component/Table/ArtistChannelRequestTable';
import ArtistChannelService from '../service/ArtistChannelService';

function ArtistchannelRequest() {
  const [channel, setChannel] = useState('');
  const [topic, setTopic] = useState('');
  const [upc1, setUpc1] = useState('');
  const [upc2, setUpc2] = useState('');
  const [upc3, setUpc3] = useState('');
  
  const handleChannelChange = (event) => {
    setChannel(event.target.value);
  };
  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };
  const handleUpc1Change = (event) => {
    setUpc1(event.target.value);
  };
  const handleUpc2Change = (event) => {
    setUpc2(event.target.value);
  };
  const handleUpc3Change = (event) => {
    setUpc3(event.target.value);
  };


  const handleSubmit = async (e) => {
    const data = {
      channel_link: channel,
      topic_link: topic,
      upc_1: upc1,
      upc_2: upc2,
      upc_3: upc3,
    };
    const res = await ArtistChannelService.add(data);
    if (res) {
      setChannel('');
      setTopic('');
      setUpc1('');
      setUpc2('');
      setUpc3('');
      getData();
    }
  };

  const [data, setData] = useState([]);
  const getData = async (params) => {
    const res = await ArtistChannelService.get(params);
    const finalData = res?.data?.map((item, index) => {
      return {

        key: index,
        date: moment(item?.created_at).format("DD-MM-YYYY"),
        channel_link: item?.channel_link,
        t_link: item?.topic_link,
        UPC1: item?.upc_1,
        UPC2: item?.upc_2,
        UPC3: item?.upc_3,
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
    <div>
      <div className="yt-ex-bg">
      <div className="section_title">
        <div className="text_area">
          <h2>Artist Channel Request</h2>
        </div>
      </div>
      <div className='row'>
        <div className="col-lg-6 col-md-12">
        <InputField label="Channel Link" value={channel} star="*" onChange={handleChannelChange} />
        <InputField label="Topic Link" value={topic} star="*" onChange={handleTopicChange} />
        <InputField label="UPC1" value={upc1} star="*" onChange={handleUpc1Change} />
        <InputField label="UPC2" value={upc2} star="*" onChange={handleUpc2Change} />
        <InputField label="UPC3" value={upc3} star="*" onChange={handleUpc3Change} />
        <div className='mt-4'><PrimaryBtn label="Submit" onClick={handleSubmit}/></div>
        </div>
      </div>
      </div>
      <div className="table_content">
        <h2 className='mb-5'>All History</h2>
        <ArtistChannelRequestTable data={data} onSearch={onSearch}/>
      </div>
    </div>
  )
}

export default ArtistchannelRequest
