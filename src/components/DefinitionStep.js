import React, { useState } from 'react';
import { Divider, Form, Input, Row, Col, Select, Skeleton } from 'antd';
import { getAllTableName } from "../../api";
import { SOURCE_DATA, SOURCE_DATA_MAP } from "../../utils/constant";

const DefinitionStep = ({ form, onValuesChange, onFieldDataChange, onTableChange }) => {
  const [loading, setLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [destination, setDestination] = useState([]);
  const [tableList, setTableList] = useState([]);

  const handleSourceChange = value => {
    form.setFieldsValue({ selectedDestination: undefined });
    form.setFieldsValue({ tableName: undefined });
    setDestination([]);

    const filteredDestinations = Object.values(SOURCE_DATA_MAP)
      .filter(item => item.source === value)
      .map(item => ({
        label: item.destination,
        value: item.destination
      }));

    setDestination(filteredDestinations);
  };

  const handleDestinationChange = value => {
    form.setFieldsValue({ tableName: undefined });

    const selectedSourceKey = Object.keys(SOURCE_DATA_MAP).find(key => SOURCE_DATA_MAP[key].destination === value);

    if (selectedSourceKey) {
      setLoading(true);
      const fetchTables = async () => {
        try {
          const allTables = await getAllTableName(selectedSourceKey);
          setTableList(allTables);
        } catch (error) {
          console.error('Tablolar alınırken hata:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchTables();
    }

    setSelectedSource(selectedSourceKey);
  };

  const handleTableChange = value => {
    onTableChange(value);
  };

  if (loading) {
    return <Skeleton active paragraph={{ rows: 6 }} title={{ width: '60%' }} />;
  }

  return (
    <>
      <Divider />
      <Form form={form} layout="vertical" onValuesChange={(_, values) => onValuesChange(values)}>
        <Row gutter={16} justify="center" className="my-0">
          <Col span={18}>
            <div className="form-field">
              <label className="form-field-label">Job Name</label>
              <Form.Item
                name="jobName"
                rules={[{ required: true, message: "Job Name is required" }]}
              >
                <Input placeholder="Job Name" showCount maxLength={75} size="large" style={{ fontSize: "16px" }} />
              </Form.Item>
            </div>
          </Col>

          <Col span={18} className="mt-0">
            <div className="form-field">
              <label className="form-field-label">Source</label>
              <Form.Item
                name="datasourceSelection"
                rules={[{ required: true, message: "Source is required" }]}
              >
                <Select
                  id="datasourceSelection"
                  showSearch
                  allowClear
                  placeholder="Select Source"
                  style={{ fontSize: "16px" }}
                  options={SOURCE_DATA}
                  onChange={handleSourceChange}
                  size="large"
                />
              </Form.Item>
            </div>
          </Col>

          <Col span={18} className="mt-0">
            <div className="form-field">
              <label className="form-field-label">Destination</label>
              <Form.Item
                name="selectedDestination"
                rules={[{ required: true, message: "Destination is required" }]}
              >
                <Select
                  id="selectedDestination"
                  showSearch
                  allowClear
                  placeholder="Select Destination"
                  style={{ fontSize: "14px" }}
                  options={destination}
                  onChange={handleDestinationChange}
                  size="large"
                />
              </Form.Item>
            </div>
          </Col>

          <Col span={18}>
            <div className="form-field">
              <label className="form-field-label">Table</label>
              <Form.Item
                name="tableName"
                rules={[{ required: true, message: "Table Name is required" }]}
              >
                <Select
                  showSearch
                  allowClear
                  style={{ fontSize: "16px" }}
                  placeholder="Select Table"
                  options={tableList}
                  size="large"
                  onChange={handleTableChange}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default DefinitionStep;
