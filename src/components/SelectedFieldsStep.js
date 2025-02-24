import React, { useState, useEffect, useRef } from 'react';
import { Divider, Table } from 'antd';
import { getAllFieldNames } from "../../api";
import SearchBar from '../common/SearchBar';

// Tablo sütunları
const columns = [
  {
    title: 'Field Name',
    dataIndex: 'fieldName',
  },
  {
    title: 'Field Type',
    dataIndex: 'fieldType',
  },
];

const SelectedFieldsStep = ({ form, onSelectionChange }) => {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Seçilen satırlar burada tutulacak
  const [prevTableName, setPrevTableName] = useState(null); // Önceki tablo ismini takip et

  const tableName = form.getFieldValue('tableName');
  const prevTableNameRef = useRef(null);

  useEffect(() => {
    // Eğer tablo adı değişirse
    if (tableName && tableName !== prevTableNameRef.current) {
      setLoading(true);

      getAllFieldNames(tableName)
        .then((data) => {
          const formattedData = data.map((item, index) => ({
            ...item,
            key: item.fieldName || index,
          }));

          setFilteredData(formattedData);

          // Eğer tablo değiştiyse seçilenleri sıfırla
          setSelectedRows([]); // Seçilenleri sıfırlıyoruz sadece tablo değişince
        })
        .catch((error) => {
          console.error("Error fetching field names:", error);
        })
        .finally(() => {
          setLoading(false);
        });

      // `prevTableNameRef.current`'i yeni `tableName` ile güncelle
      prevTableNameRef.current = tableName;
    }
  }, [tableName]);

  // Arama fonksiyonu
  const handleSearch = (value) => {
    if (value === '') {
      setFilteredData(filteredData); // Arama yapılmazsa orijinal veriyi geri yükle
    } else {
      const filtered = filteredData.filter(item =>
        item.fieldName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Tablodaki satır seçimi için yapılandırma
  const rowSelection = {
    selectedRowKeys: selectedRows.map(row => row.key), // Seçilen satırların anahtarları
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRows(selectedRows); // Seçilen satırları state'de tutuyoruz
      if (onSelectionChange) {
        onSelectionChange(selectedKeys, selectedRows); // Seçilenleri üst component'a gönderiyoruz
      }
    },
  };

  return (
    <div>
      <Divider />
      
      {/* Arama Çubuğu */}
      <div className="d-flex justify-content-end my-2">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Tablo */}
      <Table
        rowSelection={rowSelection}
        pagination={false}
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        scroll={{
          x: 200,
          y: 300,
        }}
      />
    </div>
  );
};

export default SelectedFieldsStep;
