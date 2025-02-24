import React, { useEffect, useState } from 'react';
import {
  Divider,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Checkbox,
  InputNumber,
  Slider,
} from 'antd';
import { ProfileOutlined, CloudServerOutlined, TableOutlined, DatabaseOutlined } from '@ant-design/icons';

import '../scheduledDataTable/assets/style.css';

let cachedData = null;

const SettingsStep = ({ form, onValuesChange }) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(1);

  useEffect(() => {}, []);

  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  const onChange = (value) => {
    console.log('changed', value);
    setInputValue(value);
  };

  return (
    <>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(_, values) => onValuesChange(values)}
      >
        <Row gutter={16} justify="center" className="my-2">
          {/* Initial Date Time */}
          <Col span={9}>
            <div className="form-field">
              <div className="form-field-wrapper">
                <label className="form-field-label">Initial Date Time</label>
                <Form.Item
                  name="initialStartDateTime"
                  rules={[{ required: true, message: "Initial Date Time is required" }]}
                >
                  <DatePicker
                    id="initialStartDateTime"
                    showTime
                    onChange={(value, dateString) => {
                      console.log('Selected Time: ', value);
                      console.log('Formatted Selected Time: ', dateString);
                    }}
                    size="large"
                    onOk={onOk}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </div>
            </div>
          </Col>

          {/* Truncate / Insert Checkbox */}
          <Col span={8} className="mt-0">
            <div className="form-field">
              <div className="form-field-wrapper">
                <Checkbox id="truncateInsert">Truncate / Insert</Checkbox>
              </div>
            </div>
          </Col>

          {/* Select Duration */}
          <Col span={9}>
            <div className="form-field">
              <div className="form-field-wrapper">
                <label className="form-field-label">Select Duration</label>
                <InputNumber
                  id="minAgoForData"
                  style={{ width: '100%' }}
                  defaultValue={-1}
                  min={-500}
                  max={-1}
                />
              </div>
            </div>
          </Col>

          {/* Delete Duration */}
          <Col span={8}>
            <div className="form-field">
              <div className="form-field-wrapper">
                <label className="form-field-label">Delete Duration</label>
                <InputNumber
                  id="minAgoForDeleted"
                  style={{ width: '100%' }}
                  defaultValue={-1}
                  min={-500}
                  max={-1}
                />
              </div>
            </div>
          </Col>

          {/* Slider */}
          <Col span={17} className="mt-3">
            <div className="form-field">
              <div className="form-field-wrapper">
                <Slider
                  min={1}
                  max={20}
                  defaultValue={15}
                  tooltip={{
                    open: true,
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SettingsStep;
