import React from 'react';
import { Dropdown, Menu, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const ActionsMenu = ({ record, onEdit, onDelete, onViewDetails }) => {
  
  // Menu tıklama işlevi
  const handleMenuClick = (e) => {
    if (e.key === 'edit') {
      onEdit(record);
    } else if (e.key === 'delete') {
      onDelete(record);
    } else if (e.key === 'viewDetails') {
      onViewDetails(record);
    }
  };

  // Menü içerikleri
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
      <Menu.Item key="viewDetails" icon={<EyeOutlined />}>
        View Details
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Actions
      </Button>
    </Dropdown>
  );
};

export default ActionsMenu;
