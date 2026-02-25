import { getMemberProfileAPI, putMemberProfileAPI } from '@/apis/profile';
import TRLayout from '@/components/TRLayout';
import { Dispatch } from '@/store';
import { ArrowRight } from '@nutui/icons-react-taro';
import { Button, Cell, DatePicker, Form, Input, Radio, Uploader } from '@nutui/nutui-react-taro';
import { getStorageSync, uploadFile, showToast } from '@tarojs/taro';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<Dispatch>();

  // 获取信息
  const getInfo = useCallback(async () => {
    const { result } = await getMemberProfileAPI();
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
  }, [form]);

  // 文件上传
  async function upload(file: File) {
    const filePath = (file as any).tempFilePath;
    uploadFile({
      url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/member/profile/avatar',
      filePath,
      name: 'file',
      header: {
        Authorization: getStorageSync('Authorization'),
      },
      success: (res) => {
        console.log(res, 'resres');
      },
      fail: (err) => {
        console.log(err, 'errerr');
      },
    });
    return { url: filePath };
  }

  const handleSubmit = async (values: any) => {
    const info = {
      nickname: values.nickname,
      gender: values.gender,
      birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
      profession: values.profession,
    };
    await putMemberProfileAPI(info);
    dispatch.member.setMemberInfo(info);
    showToast({ icon: 'success', title: '保存成功' });
  };

  // 获取用户信息
  useEffect(() => {
    getInfo();
  }, [form, getInfo]);

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
              onFinish={handleSubmit}
            >
              <Form.Item
                label='头像'
                name='avatar'
              >
                <Uploader
                  maxCount={1}
                  upload={upload}
                  multiple={false}
                />
              </Form.Item>

              <Form.Item
                label='账号'
                name='account'
              >
                <Input
                  placeholder='请输入'
                  disabled
                />
              </Form.Item>
              <Form.Item
                label='昵称'
                name='nickname'
                rules={[{ required: true, min: 6, max: 12, message: '昵称长度为6-12位' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
              <Form.Item
                label='性别'
                name='gender'
                rules={[{ required: true, message: '请选择性别' }]}
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
                rules={[{ required: true, message: '请选择生日' }]}
              >
                <DatePicker type='date'>
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
                rules={[{ required: true, message: '请选择城市' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>

              <Form.Item
                label='职业'
                name='profession'
                rules={[{ required: false, max: 10, message: '请输入职业' }]}
              >
                <Input placeholder='请输入' />
              </Form.Item>
            </Form>
          </>
        ),
      }}
    />
  );
};
