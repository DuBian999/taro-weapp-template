import { getMemberProfileAPI } from '@/apis/profile';
import TRLayout from '@/components/TRLayout';
import { ArrowRight } from '@nutui/icons-react-taro';
import { Button, Cell, DatePicker, Form, Input, Radio, Uploader } from '@nutui/nutui-react-taro';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export default () => {
  const [form] = Form.useForm();

  useEffect(() => {
    getMemberProfileAPI().then(({ result }) => {
      form.setFieldsValue({
        avatar: [
          {
            name: result.avatar,
            url: result.avatar,
          },
        ],
        account: result.account,
        nickname: result.nickname,
        gender: result.gender,
        birthday: dayjs(result.birthday).toDate(),
        fullLocation: result.fullLocation,
        profession: result.profession,
      });
    });
  }, [form]);

  async function upload(file: File) {
    // await sleep(2000);
    console.log(file, '1212');

    return { url: 'demoUrl' };
  }

  return (
    <TRLayout
      navBar={{
        title: '个人中心',
      }}
      body={{
        customRender: (
          <>
            <Form
              divider
              labelPosition='left'
              form={form}
              footer={
                <Button
                  nativeType='submit'
                  type='primary'
                  block
                >
                  保存
                </Button>
              }
            >
              {/* <Form.Item
                label='头像'
                name='avatar'
              >
                <Uploader
                  maxCount={1}
                  url='https://pcapi-xiaotuxian-front-devtest.itheima.net/member/profile/avatar'
                  beforeUpload={async (files: File[]) => {
                    console.log(files, 'filesfiles');
                  }}
                />
              </Form.Item> */}

              <Form.Item
                label='账号'
                name='account'
              >
                <Input placeholder='placeholder' />
              </Form.Item>
              <Form.Item
                label='昵称'
                name='nickname'
              >
                <Input placeholder='placeholder' />
              </Form.Item>
              <Form.Item
                label='性别'
                name='gender'
              >
                <Radio.Group direction='horizontal'>
                  <Radio value='男'>男</Radio>
                  <Radio value='女'>女</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label='生日'
                name='birthday'
                trigger='onConfirm'
                getValueFromEvent={(...args) => {
                  return new Date(args[1].join('-'));
                }}
                onClick={(_, ref: any) => {
                  ref.open();
                }}
              >
                <DatePicker>
                  {(value: any) => {
                    return (
                      <Cell
                        style={
                          {
                            padding: 0,
                            '--nutui-cell-divider-border-bottom': '0',
                          } as React.CSSProperties
                        }
                        title={value ? new Date(value).toLocaleDateString() : '请选择日期'}
                        extra={<ArrowRight />}
                        align='center'
                      />
                    );
                  }}
                </DatePicker>
              </Form.Item>

              <Form.Item
                label='城市'
                name='fullLocation'
              >
                <Input placeholder='placeholder' />
              </Form.Item>

              <Form.Item
                label='职业'
                name='profession'
              >
                <Input placeholder='placeholder' />
              </Form.Item>
            </Form>
          </>
        ),
      }}
    />
  );
};
