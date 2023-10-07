import { Button, Popover, Space } from 'antd';
import React from 'react';
import { BsInfoLg } from 'react-icons/bs';

const content = (
  <div>
    
  </div>
);

const AntPopover = ({message}) => (
  <Space wrap>
    <Popover content={<p>{message}</p>} title="Message" trigger="click" >
      <Button className='popover_btn'><BsInfoLg className='icons'/></Button>
    </Popover>
  </Space>
);

export default AntPopover