import { getMemberAddressByIdAPI, postMemberAddressAPI, putMemberAddressByIdAPI } from '@/apis/address';
import TRLayout from '@/components/TRLayout';
import { ArrowRight } from '@nutui/icons-react-taro';
import { Button, Cell, Divider, Form, Input, Picker, Switch } from '@nutui/nutui-react-taro';
import { showToast, useRouter } from '@tarojs/taro';
import { useCallback, useEffect, useState } from 'react';

interface TreeNode {
  value: string;
  label: string;
  children?: TreeNode[];
}
const options = [
  {
    value: '440000',
    label: '广东省',
    children: [
      {
        value: '440100',
        label: '广州市',
        children: [
          {
            value: '440103',
            label: '荔湾区',
            children: [
              { value: '440103001', label: '沙面街道' },
              { value: '440103002', label: '岭南街道' },
              { value: '440103003', label: '华林街道' },
            ],
          },
          {
            value: '440104',
            label: '越秀区',
            children: [
              { value: '440104001', label: '洪桥街道' },
              { value: '440104002', label: '北京街道' },
              { value: '440104003', label: '六榕街道' },
            ],
          },
          {
            value: '440105',
            label: '海珠区',
            children: [
              { value: '440105001', label: '赤岗街道' },
              { value: '440105002', label: '新港街道' },
              { value: '440105003', label: '滨江街道' },
            ],
          },
          {
            value: '440106',
            label: '天河区',
            children: [
              { value: '440106001', label: '五山街道' },
              { value: '440106002', label: '员村街道' },
              { value: '440106003', label: '车陂街道' },
            ],
          },
          {
            value: '440111',
            label: '白云区',
            children: [
              { value: '440111001', label: '三元里街道' },
              { value: '440111002', label: '松洲街道' },
              { value: '440111003', label: '景泰街道' },
            ],
          },
        ],
      },
      {
        value: '440300',
        label: '深圳市',
        children: [
          {
            value: '440303',
            label: '罗湖区',
            children: [
              { value: '440303001', label: '黄贝街道' },
              { value: '440303002', label: '东门街道' },
              { value: '440303003', label: '南湖街道' },
            ],
          },
          {
            value: '440304',
            label: '福田区',
            children: [
              { value: '440304001', label: '园岭街道' },
              { value: '440304002', label: '南园街道' },
              { value: '440304003', label: '福田街道' },
            ],
          },
          {
            value: '440305',
            label: '南山区',
            children: [
              { value: '440305001', label: '南头街道' },
              { value: '440305002', label: '南山街道' },
              { value: '440305003', label: '沙河街道' },
            ],
          },
        ],
      },
    ],
  },
  {
    value: '330000',
    label: '浙江省',
    children: [
      {
        value: '330100',
        label: '杭州市',
        children: [
          {
            value: '330102',
            label: '上城区',
            children: [
              { value: '330102001', label: '湖滨街道' },
              { value: '330102002', label: '清波街道' },
              { value: '330102003', label: '小营街道' },
            ],
          },
          {
            value: '330105',
            label: '拱墅区',
            children: [
              { value: '330105001', label: '米市巷街道' },
              { value: '330105002', label: '湖墅街道' },
              { value: '330105003', label: '小河街道' },
            ],
          },
          {
            value: '330106',
            label: '西湖区',
            children: [
              { value: '330106001', label: '北山街道' },
              { value: '330106002', label: '灵隐街道' },
              { value: '330106003', label: '西溪街道' },
            ],
          },
          {
            value: '330108',
            label: '滨江区',
            children: [
              { value: '330108001', label: '西兴街道' },
              { value: '330108002', label: '长河街道' },
              { value: '330108003', label: '浦沿街道' },
            ],
          },
        ],
      },
      {
        value: '330200',
        label: '宁波市',
        children: [
          {
            value: '330203',
            label: '海曙区',
            children: [
              { value: '330203001', label: '月湖街道' },
              { value: '330203002', label: '西门街道' },
              { value: '330203003', label: '江厦街道' },
            ],
          },
          {
            value: '330205',
            label: '江北区',
            children: [
              { value: '330205001', label: '中马街道' },
              { value: '330205002', label: '白沙街道' },
              { value: '330205003', label: '孔浦街道' },
            ],
          },
          {
            value: '330206',
            label: '北仑区',
            children: [
              { value: '330206001', label: '新碶街道' },
              { value: '330206002', label: '小港街道' },
              { value: '330206003', label: '大碶街道' },
            ],
          },
        ],
      },
    ],
  },
];

const flattenToSimpleArrayFlatMap = (data: TreeNode[]) => {
  return data.flatMap((item) => {
    const current = { value: item.value, label: item.label };

    if (item.children && item.children.length > 0) {
      return [current, ...flattenToSimpleArrayFlatMap(item.children)];
    }

    return [current];
  });
};

const flatOptions = flattenToSimpleArrayFlatMap(options);

const getLabelByValue = (value: string[]) => {
  const labelList = value.map((item) => flatOptions.find((option: TreeNode) => option.value === item) || {});
  return labelList.map((item: Record<string, string>) => item.label).join('');
};

const CustomDivider = () => {
  return <Divider style={{ margin: 0 }} />;
};

export default () => {
  const [form] = Form.useForm();
  const { params } = useRouter();
  const [currentAddressId, setCurrentAddressId] = useState<null | string>(params?.id || '');

  const handleSubmit = async () => {
    const hasError = (await form.validateFields())?.length > 0;
    const value = form.getFieldsValue(true);

    const data = {
      receiver: value.receiver,
      contact: value.contact,
      provinceCode: value.region[0],
      cityCode: value.region[1],
      countyCode: value.region[2],
      address: value.address,
      isDefault: value.isDefault ? 1 : 0,
    };

    if (hasError) {
      return;
    }
    if (currentAddressId) {
      await putMemberAddressByIdAPI(currentAddressId, data);
    } else {
      const { result } = await postMemberAddressAPI(data);
      setCurrentAddressId(result.id);
    }
    showToast({
      title: currentAddressId ? '地址更新成功' : '地址添加成功',
      icon: 'success',
    });
  };

  const initAddressDetail = useCallback(async () => {
    if (currentAddressId) {
      const { result } = await getMemberAddressByIdAPI(currentAddressId);
      form.setFieldsValue({
        receiver: result.receiver,
        contact: result.contact,
        region: [result.provinceCode, result.cityCode, result.countyCode],
        address: result.address,
        isDefault: Boolean(result.isDefault),
      });
    }
  }, [currentAddressId, form]);

  useEffect(() => {
    initAddressDetail();
  }, [initAddressDetail]);

  return (
    <TRLayout
      navBar={{
        title: '修改地址信息',
      }}
      body={{
        customRender: (
          <>
            <Form
              form={form}
              labelPosition='left'
            >
              {/* 收货人 */}
              <Form.Item
                label='收货人'
                name='receiver'
                rules={[{ required: true, message: '请填写收货人姓名' }]}
              >
                <Input placeholder='请填写收货人姓名' />
              </Form.Item>
              <CustomDivider />
              {/* 手机号码 */}
              <Form.Item
                label='手机号码'
                name='contact'
                rules={[
                  { required: true, message: '请填写手机号码' },
                  { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' },
                ]}
              >
                <Input
                  className='form-input'
                  type='number'
                  maxLength={11}
                  placeholder='请填写收货人手机号码'
                />
              </Form.Item>
              <CustomDivider />

              {/* 所在地区 */}
              <Form.Item
                label='所在地区'
                name='region'
                rules={[
                  {
                    required: true,
                    message: '请选择所在地区',
                  },
                  {
                    validator: (_, value: string[]) => {
                      return value?.length > 0;
                    },
                  },
                ]}
                getValueFromEvent={(...args) => {
                  return args[1];
                }}
                onClick={(_, ref: any) => {
                  ref.open();
                }}
                trigger='onConfirm'
                validateTrigger={['onConfirm']}
              >
                <Picker options={[options]}>
                  {(value: any) => {
                    return (
                      <Cell
                        style={
                          {
                            padding: 0,
                            '--nutui-cell-divider-border-bottom': '1px solid #177ee4ff',
                          } as React.CSSProperties
                        }
                        title={getLabelByValue(value)}
                        extra={<ArrowRight />}
                        align='center'
                      />
                    );
                  }}
                </Picker>
              </Form.Item>
              <CustomDivider />
              {/* 详细地址 */}
              <Form.Item
                label='详细地址'
                name='address'
                rules={[{ required: true, message: '请填写详细地址' }]}
              >
                <Input placeholder='街道、楼牌号等信息' />
              </Form.Item>
              <CustomDivider />
              {/* 设为默认地址 */}
              <Form.Item
                label='设为默认地址'
                name='isDefault'
                valuePropName='checked'
              >
                <Switch />
              </Form.Item>
            </Form>
          </>
        ),
      }}
      footer={{
        customRender: (
          <Button
            type='primary'
            block
            onClick={handleSubmit}
          >
            保存并使用
          </Button>
        ),
      }}
    />
  );
};
