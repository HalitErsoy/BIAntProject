import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = () => {
    handleSearch(searchTerm);
  };

  return (
    <div className="">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={onSearch}
        style={{ width: 300, marginRight: 10 }}
      />
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
