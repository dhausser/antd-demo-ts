import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { DatePicker, CustomPicker } from './components'
import moment from 'moment-timezone'
import './App.less'

dayjs.extend(utc)

interface Values {
  title: string;
  description: string;
  modifier: string;
  startDate: Dayjs;
  endDate: Dayjs;
  dateRange: Dayjs[];
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const { RangePicker } = DatePicker;

const inputConfig = { rules: [{ required: true, message: 'Please input a title!' }] }

const timeConfig = {
  rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

const rangeConfig = {
  rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
};

const record = {
  date: ""
}

function CollectionCreateForm({
  visible,
  onCreate,
  onCancel,
}: CollectionCreateFormProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          {...inputConfig}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>

        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>

        {/* <Form.Item name="startDate" label="Start Date" {...timeConfig}>
          <DatePicker />
        </Form.Item>
        
        <Form.Item name="endDate" label="End Date" {...timeConfig}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="dateRange" label="Date Range" {...rangeConfig}>
          <RangePicker showTime />
        </Form.Item> */}

        <Form.Item name="localDate" label="Local Range" {...timeConfig}>
          <CustomPicker value="2014-06-01 12:00" record={record} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function CollectionsPage() {
  const [visible, setVisible] = useState(false);

  const onCreate = (values: Values) => {
    const { startDate, endDate, dateRange } = values
    const data = { 
      ...values,
      startDate: startDate.utc().format(),
      endDate: endDate?.utc().format(),
      dateRange: [
        dateRange[0]?.utc().format(), 
        dateRange[1]?.utc().format()
      ]
    }
    console.log('Formatted values: ', data)
    setVisible(false);
  };

  return (
    <div className="container">
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};