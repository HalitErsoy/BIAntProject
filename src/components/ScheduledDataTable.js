import React, { useState, useEffect } from 'react';
import { Skeleton, Button } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import DataTable from './DataTable';
import SearchBar from '../components/SearchBar';
//import SkeletonLoader from '../common/SkeletonLoader';
import { getAllScheduledConfig } from '../api';

const ScheduledDataTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => { }, [searchTerm]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      await delay(100);
      const allScheduled = await getAllScheduledConfig();
      setDataSource(allScheduled);
    } catch (error) {
      console.error('Error fetching scheduled records:', error);
    } finally {
      setLoading(false);
    }
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: dataSource.length,
    onChange: (page, size) => {
      setCurrentPage(page);
      setPageSize(size);
    },
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  };

  const columns = [
    { title: 'Table Name', dataIndex: 'tableName' },
    { title: 'Data Source', dataIndex: 'datasourceSelection' },
    { title: 'Expression', dataIndex: 'cronExpression' },
    { title: 'Append Query', dataIndex: 'appendQuery' },
  ];

  const handleSearch = value => {
    if (value === '') {
      setFilteredData(dataSource);
    } else {
      const filtered = dataSource.filter(item =>
        item.tableName.toLowerCase().includes(value.toLowerCase()) ||
        item.datasourceSelection.toLowerCase().includes(value.toLowerCase()) ||
        item.cronExpression.toLowerCase().includes(value.toLowerCase()) ||
        item.appendQuery.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="mx-5">
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <div className="d-flex justify-content-between mb-3">
            <Button
              type="primary"
              icon={<DiffOutlined />}
              size="large"
            >
              New
            </Button>
            {/* SearchComponent'ı burada dahil ettik */}
            <SearchBar handleSearch={handleSearch} />
          </div>

          <DataTable
            dataSource={filteredData}
            columns={columns}
            paginationConfig={paginationConfig}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default ScheduledDataTable;
