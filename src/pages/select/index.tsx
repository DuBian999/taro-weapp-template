import TRLayout from '@/components/TRLayout';
import TRMultiSelect from '@/components/TRMultiSelect';
import TRSingleSelect from '@/components/TRSingleSelect';
import { Button, Cell, Col, Form, Row } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
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
      title='示例-Select单选与多选'
      bodyContent={
        <>
          <Cell
            title='多选'
            extra={
              <TRMultiSelect
                options={fruitOptions}
                value={selectedValues1}
                onChange={setSelectedValues1}
                placeholder='请选择水果'
              />
            }
          />

          <Cell
            title='单选'
            extra={
              <TRSingleSelect
                options={fruitOptions}
                value={selectedValues2}
                onChange={(value) => setSelectedValues2(value as string)}
                placeholder='请选择水果'
              />
            }
          />

          <Cell
            title='表单内嵌'
            extra={
              <Form
                divider
                labelPosition='top'
                disabled
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
                      message: '请选择水果',
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
                      message: '请选择性别',
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
            }
          />
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
