import React, { useState } from 'react';
import { Button, Modal, Steps, notification } from 'antd';
import {
  ScheduleOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
  SettingOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import DefinitionStep from './DefinitionStep';
import SelectedFieldsStep from './SelectedFieldsStep';
import SettingsStep from './SettingsStep';

const { Step } = Steps;

const StepForm = ({ visible, onCancel }) => {
  const [current, setCurrent] = useState(0);
  const [form] = useForm();
  const [formData, setFormData] = useState({});
  const [selectedFields, setSelectedFields] = useState([]);

  const next = () => {
    // Eğer adım 1 (Selected Fields) ise, selectedFields kontrolü yap
    if (current === 1 && selectedFields.length === 0) {
      notification.error({
        message: 'Validation Error',
        description: 'Please select at least one field.',
        placement: 'top',
      });
      return;
    }

    // Eğer adım 0 (Definition) veya adım 2 (Settings) ise form doğrulamasını yap
    if (current === 0 || current === 2) {
      form
        .validateFields()
        .then((values) => {
          setFormData({ ...formData, ...values });
          setCurrent(current + 1); // Adımı arttır
        })
        .catch((errorInfo) => {
          console.log('Validation Failed:', errorInfo);
          notification.error({
            message: 'Validation Error',
            description: errorInfo.errorFields[0]?.errors[0] || 'An error occurred.',
            placement: 'top',
          });
        });
    } else {
      setCurrent(current + 1); // Diğer adımlar için direkt geçiş
    }
  };

  const prev = () => {
    setCurrent(current - 1); // Önceki adım
  };

  const handleSubmit = () => {
    if (current === 1) {
      // Selected Fields adımında seçili alan yoksa hata mesajı göster
      if (selectedFields.length === 0) {
        notification.error({
          message: 'Validation Error',
          description: 'Please select at least one field.',
          placement: 'top',
        });
        return;
      }
    } else {
      form
        .validateFields()
        .then((values) => {
          onCancel(); // Modalı kapat
          setCurrent(0); // İlk adımda başlat
        })
        .catch((errorInfo) => {
          console.log('Validation Failed:', errorInfo);
          notification.error({
            message: 'Validation Error',
            description: errorInfo.errorFields[0]?.errors[0] || 'An error occurred.',
            placement: 'top',
          });
        });
    }
  };

  const steps = [
    {
      title: 'Definition',
      icon: <FileTextOutlined />,
      content: (
        <DefinitionStep
          form={form}
          onValuesChange={(values) => setFormData({ ...formData, ...values })}
        />
      ),
    },
    {
      title: 'Selected Fields',
      icon: <CheckSquareOutlined />,
      content: (
        <SelectedFieldsStep
          form={form}
          onSelectionChange={(keys, rows) => setSelectedFields(rows)}
        />
      ),
    },
    {
      title: 'Settings',
      icon: <SettingOutlined />,
      content: <SettingsStep form={form} />,
    },
    {
      title: 'Preview',
      icon: <EyeOutlined />,
      content: <SettingsStep form={form} />,
    },
  ];

  return (
    <Modal
      open={visible}
      title={
        <span className="d-flex justify-content-start align-items-center">
          <ScheduleOutlined className="mx-2" />
          New Scheduled
        </span>
      }
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={prev} disabled={current === 0}>
          Previous
        </Button>,
        <Button
          key="next"
          type="primary"
          onClick={next}
          disabled={current === steps.length - 1}
        >
          Next
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
      width={800}
    >
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <div style={{ marginTop: 16 }}>{steps[current].content}</div>
    </Modal>
  );
};

export default StepForm;
