import TRLayout from '@/components/TRLayout';
import TRTimeRange from '@/components/TRTimeRange';
import { Button, Cell, Form } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const Index: React.FC = () => {
  const [form] = Form.useForm();

  const [timeRange, setTimeRange] = useState<[string, string]>(['2000/01/01 00:00:00', '2008/01/10 00:00:00']);

  const onSubmit = async () => {
    const err = await form.validateFields();
    console.log(err, 'err');
    console.error(form.getFieldsValue(true), '123');
  };

  return (
    <TRLayout
      title='示例-自定义TimeRange'
      bodyContent={
        <>
          <Form
            form={form}
            labelPosition='top'
            footer={
              <Button
                type='primary'
                block
                onClick={() => onSubmit()}
              >
                提交
              </Button>
            }
          >
            <Form.Item
              label='活动时间'
              name='timeRange'
              rules={[
                {
                  required: true,
                  message: '请选择完整的时间范围',
                },
                {
                  validator: (_, value = []) => {
                    const [start, end] = value;
                    if (!start) {
                      return Promise.reject('请选择开始时间');
                    }
                    if (!end) {
                      return Promise.reject('请选择结束时间');
                    }
                    if (dayjs(end).isBefore(dayjs(start))) {
                      return Promise.reject('结束时间不能早于开始时间');
                    }
                    return true;
                  },
                  mnessage: '请输入正常的时间范围',
                },
              ]}
            >
              <TRTimeRange
                type='datetime'
                format='YYYY-MM-DD HH:mm:ss'
              />
            </Form.Item>
          </Form>

          <Cell
            title='结束时间'
            extra={
              <TRTimeRange
                value={timeRange}
                onChange={setTimeRange}
                format='YYYY-MM-DD'
              />
            }
          />
          <View>{JSON.stringify(timeRange)}</View>
        </>
      }
    />
  );
};

export default Index;
