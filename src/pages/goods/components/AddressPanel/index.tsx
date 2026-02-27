import { getMemberAddressAPI } from '@/apis/address';
import { AddressItem } from '@/types/address';
import { Cell, Radio } from '@nutui/nutui-react-taro';
import { ScrollView } from '@tarojs/components';
import React, { useEffect, useState } from 'react';

const AddressPanel: React.FC<{
  defaultValue?: string;
  onChange?: (value: Record<string, string>) => void;
}> = ({ defaultValue, onChange }) => {
  const [addressList, setAddressList] = useState<AddressItem[]>([]);

  const handleRadioChange = (v: string) => {
    const selected = addressList.find((item) => item.id === v);
    if (selected) {
      onChange?.({
        label: selected.address,
        id: selected.id,
      });
    }
  };

  useEffect(() => {
    getMemberAddressAPI().then((res) => {
      setAddressList(res.result || []);
    });
  }, []);
  return (
    <ScrollView style={{ height: '600rpx' }}>
      <Radio.Group
        labelPosition='left'
        defaultValue={defaultValue}
        onChange={handleRadioChange}
      >
        {addressList.map((item) => (
          <Cell
            key={item.id}
            style={{
              margin: 0,
            }}
          >
            <Radio value={item.id}>{item.address}</Radio>
          </Cell>
        ))}
      </Radio.Group>
    </ScrollView>
  );
};

export default AddressPanel;
