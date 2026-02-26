import { deleteMemberAddressByIdAPI, getMemberAddressAPI } from '@/apis/address';
import TRLayout from '@/components/TRLayout';
import { Dispatch } from '@/store';
import type { AddressItem } from '@/types/address';
import { Button, Swipe } from '@nutui/nutui-react-taro';
import { Navigator, ScrollView, Text, View } from '@tarojs/components';
import { navigateBack, showModal, useDidShow, navigateTo } from '@tarojs/taro';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';

export default () => {
  const dispatch = useDispatch<Dispatch>();
  // 获取收货地址列表数据
  const [addressList, setAddressList] = useState<AddressItem[]>([]);

  const getMemberAddressData = async () => {
    const res = await getMemberAddressAPI();
    setAddressList(res.result);
  };

  // 初始化调用(页面显示)
  useDidShow(() => {
    getMemberAddressData();
  });

  // 删除收货地址
  const onDeleteAddress = (id: string) => {
    // 二次确认
    showModal({
      title: '提示',
      content: '删除地址?',
      confirmText: '确定',
      cancelText: '取消',
      success: async (res) => {
        if (res.confirm) {
          await deleteMemberAddressByIdAPI(id);
          // 重新获取收货地址列表
          getMemberAddressData();
        }
      },
    });
  };

  // 修改收货地址
  const onChangeAddress = (item: AddressItem) => {
    // 修改地址
    dispatch.address.changeSelectedAddress(item);
    // 返回上一页
    navigateBack();
  };

  return (
    <TRLayout
      navBar={{
        title: '地址管理',
      }}
      body={{
        customRender: (
          <>
            <ScrollView
              enableBackToTop
              className={styles['scroll-view']}
              scrollY
            >
              {addressList.length ? (
                <View className={styles['address']}>
                  {addressList.map((item) => (
                    <Swipe
                      key={item.id}
                      className={styles['address-list']}
                      rightAction={
                        <Button
                          onClick={() => onDeleteAddress(item.id)}
                          type='danger'
                          shape='square'
                          block
                        >
                          删除
                        </Button>
                      }
                    >
                      <View
                        className={styles['item-content']}
                        onClick={() => onChangeAddress(item)}
                      >
                        <View className={styles['user']}>
                          {item.receiver}
                          <Text className={styles['contact']}>{item.contact}</Text>
                          {item.isDefault && <Text className={styles['badge']}>默认</Text>}
                        </View>
                        <View className={styles['locate']}>
                          {item.fullLocation} {item.address}
                        </View>
                        <Navigator
                          className={styles['edit']}
                          hoverClass='none'
                          url={`/pagesMember/addressDetail/index?id=${item.id}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          修改
                        </Navigator>
                      </View>
                    </Swipe>
                  ))}
                </View>
              ) : (
                <View className={styles['blank']}>暂无收货地址</View>
              )}
            </ScrollView>
          </>
        ),
      }}
      footer={{
        customRender: (
          <Button
            type='primary'
            block
            onClick={() =>
              navigateTo({
                url: '/pagesMember/addressDetail/index',
              })
            }
          >
            新建地址
          </Button>
        ),
      }}
    />
  );
};
