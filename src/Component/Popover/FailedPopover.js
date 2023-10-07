import { Button, Popover, Space } from 'antd';
import React from 'react';
import { TbInfoTriangleFilled } from 'react-icons/tb';

const FailedPopover  = ({message}) => (
  <Space wrap>
    <Popover content={<div><p>{message}</p></div>} title="Reason" trigger="click" >
      <Button className='f_popover_btn'><TbInfoTriangleFilled className='icons'/></Button>
    </Popover>
  </Space>
);

export default FailedPopover 