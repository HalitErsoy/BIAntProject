import React from 'react';
import { Table, Dropdown, Button } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import ActionsMenu from './ActionsMenu';

const DataTable = ({ dataSource, columns, paginationConfig, loading }) => {
  const tableColumns = [
    ...columns,
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (text, record) => (
        <Dropdown
          overlay={
            <ActionsMenu
              record={record}
              onEdit={(rec) => console.log('Edit:', rec)}
              onDelete={(rec) => console.log('Delete:', rec)}
              onViewDetails={(rec) => console.log('View Details:', rec)}
            />
          }
          trigger={['click']}
        >
          <Button icon={<ThunderboltOutlined />} size="middle" type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={dataSource}
      pagination={paginationConfig}
      loading={loading}
      scroll={{ y: 600 }}
    />
  );
};

export default DataTable;
