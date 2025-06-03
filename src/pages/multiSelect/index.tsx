import TRLayout from '@/components/TRLayout';
import TRMultiSelect from '@/components/TRMultiSelect';
import TRSingleSelect from '@/components/TRSingleSelect';
import { Button, Col, Form, Row } from '@nutui/nutui-react-taro';
import React, { useState } from 'react';

const Index: React.FC = () => {
  const [form] = Form.useForm();

  const [selectedValues1, setSelectedValues1] = useState(['apple']);
  const [selectedValues2, setSelectedValues2] = useState('apple');

  const fruitOptions = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉', disabled: true },
    { value: 'orange', label: '橙子' },
    { value: 'pear', label: '梨', disabled: true },
    { value: 'grape', label: '葡萄' },
    { value: 'watermelon', label: '西瓜', disabled: true },
    { value: 'strawberry', label: '草莓' },
    { value: 'pineapple', label: '菠萝', disabled: true },
    { value: 'mango', label: '芒果' },
    { value: 'peach', label: '桃子', disabled: true },
  ];

  return (
    <TRLayout
      title='测试-自定义Select'
      bodyContent={
        <>
          <TRMultiSelect
            options={fruitOptions}
            value={selectedValues1}
            onChange={setSelectedValues1}
            placeholder='请选择水果'
          />
          <TRSingleSelect
            options={fruitOptions}
            value={selectedValues2}
            onChange={(value) => setSelectedValues2(value as string)}
            placeholder='请选择水果'
          />
          <Form
            divider
            labelPosition='top'
            form={form}
          >
            <Form.Item
              label='水果'
              name='fruits'
              rules={[
                {
                  validator(_, value) {
                    return Boolean(value?.length);
                  },
                },
              ]}
            >
              <TRMultiSelect
                options={fruitOptions}
                placeholder='请选择水果'
              />
            </Form.Item>

            <Form.Item
              label='性别'
              name='sex'
              rules={[
                {
                  validator(_, value) {
                    return Boolean(value?.length);
                  },
                },
              ]}
            >
              <TRSingleSelect
                options={[
                  { label: '男', value: '1' },
                  { label: '女', value: '2' },
                ]}
                placeholder='请选择性别'
              />
            </Form.Item>
          </Form>
        </>
      }
      footerContent={
        <Row gutter={12}>
          <Col span={8}>
            <Button
              block
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Col>
          <Col span={8}>
            <Button
              block
              type='warning'
              onClick={() => {
                form.setFieldValue('fruits', ['apple', 'orange']);
              }}
            >
              设值
            </Button>
          </Col>
          <Col span={8}>
            <Button
              block
              type='primary'
              onClick={() => {
                form.validateFields();
              }}
            >
              提交
            </Button>
          </Col>
        </Row>
      }
    />
  );
};

export default Index;
