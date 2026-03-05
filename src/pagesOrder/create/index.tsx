import {
  getMemberOrderPreAPI,
  getMemberOrderPreNowAPI,
  getMemberOrderRepurchaseByIdAPI,
  postMemberOrderAPI,
} from '@/apis/order';
import TRLayout from '@/components/TRLayout';
import { RootState } from '@/store';
import type { OrderPreResult } from '@/types/order';
import { ArrowRight, Location } from '@nutui/icons-react-taro';
import type { PickerOptions, PickerValue } from '@nutui/nutui-react-taro';
import { Cell, Picker, TextArea } from '@nutui/nutui-react-taro';
import { Image, Navigator, ScrollView, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

// 配送时间选项
const deliveryList = [
  { value: 1, label: '时间不限 (周一至周日)' },
  { value: 2, label: '工作日送 (周一至周五)' },
  { value: 3, label: '周末配送 (周六至周日)' },
];

const OrderConfirm = () => {
  // 订单备注
  const [buyerMessage, setBuyerMessage] = useState('');

  const [visible, setVisible] = useState(false);

  // 配送时间选项

  // 当前配送时间下标
  const [activeIndex, setActiveIndex] = useState(0);
  // 当前配送时间
  const activeDelivery = useMemo(() => deliveryList.find((v) => v.value === activeIndex), [activeIndex]);

  // 修改配送时间
  const onChangeDelivery = (_: PickerOptions, selectedValue: PickerValue[]) => {
    setActiveIndex(selectedValue[0] as number);
  };

  // 获取页面参数 (类似props)
  const router = Taro.useRouter();
  const { skuId, count, orderId } = router.params;

  // 订单预信息
  const [orderPre, setOrderPre] = useState<OrderPreResult>();

  // 获取订单信息
  const getMemberOrderPreData = useCallback(async () => {
    try {
      if (count && skuId) {
        const res = await getMemberOrderPreNowAPI({
          count: count as string,
          skuId: skuId as string,
        });
        setOrderPre(res.result);
      } else if (orderId) {
        // 再次购买
        const res = await getMemberOrderRepurchaseByIdAPI(orderId as string);
        setOrderPre(res.result);
      } else {
        const res = await getMemberOrderPreAPI();
        console.error(res, '从购物车跳转');

        setOrderPre(res.result);
      }
    } catch (error) {
      console.error('获取订单预信息失败', error);
    }
  }, [count, orderId, skuId]);

  useEffect(() => {
    getMemberOrderPreData();
  }, [count, skuId, orderId, getMemberOrderPreData]);

  const addressStore = useSelector((state: RootState) => state.address);

  const selectedAddress = useMemo(() => {
    // 如果有选中的地址则使用，否则使用默认地址
    return addressStore.selectedAddress || orderPre?.userAddresses?.find((v) => v.isDefault);
  }, [addressStore.selectedAddress, orderPre]);

  // 提交订单
  const onOrderSubmit = async () => {
    // 没有收货地址提醒
    if (!selectedAddress?.id) {
      Taro.showToast({ icon: 'none', title: '请选择收货地址' });
      return;
    }
    if (!activeDelivery?.value) {
      Taro.showToast({ icon: 'none', title: '请选择配送时间' });
      return;
    }

    if (!orderPre) return;

    try {
      const res = await postMemberOrderAPI({
        addressId: selectedAddress.id,
        buyerMessage: buyerMessage,
        deliveryTimeType: activeDelivery.value,
        goods: orderPre.goods.map((v) => ({ count: v.count, skuId: v.skuId })),
        payChannel: 2,
        payType: 1,
      });
      // 关闭当前页面，跳转到订单详情，传递订单id
      Taro.redirectTo({ url: `/pagesOrder/detail/index?id=${res.result.id}` });
    } catch (error) {
      console.error('提交订单失败', error);
    }
  };

  return (
    <>
      <TRLayout
        navBar={{
          title: '确认订单',
        }}
        body={{
          customRender: (
            <ScrollView
              enableBackToTop
              scrollY
            >
              <Cell
                title={
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Location style={{ marginRight: '5px' }} />{' '}
                    {selectedAddress ? (
                      <View>
                        <View>{`${selectedAddress?.receiver} ${selectedAddress?.contact}`}</View>
                        <View>{`${selectedAddress?.fullLocation}  ${selectedAddress?.address}`}</View>
                      </View>
                    ) : (
                      '请选择收获地址'
                    )}
                  </View>
                }
                extra={<ArrowRight />}
                onClick={() => Taro.navigateTo({ url: '/pagesMember/address/index' })}
              />
              {/* 商品信息 */}
              <View className={styles.goods}>
                {orderPre?.goods.map((item) => (
                  <Navigator
                    key={item.skuId}
                    url={`/pages/goods/index?id=${item.id}`}
                    className={styles.item}
                    hoverClass='none'
                  >
                    <Image
                      className={styles.picture}
                      src={item.picture}
                    />
                    <View className={styles.meta}>
                      <View className={`${styles.name} ${styles.ellipsis}`}> {item.name} </View>
                      <View className={styles.attrs}>{item.attrsText}</View>
                      <View className={styles.prices}>
                        <View className={`${styles['pay-price']} ${styles.symbol}`}>{item.payPrice}</View>
                        <View className={`${styles.price} ${styles.symbol}`}>{item.price}</View>
                      </View>
                      <View className={styles.count}>x{item.count}</View>
                    </View>
                  </Navigator>
                ))}
              </View>

              {/* 配送及支付方式 */}

              <Cell.Group className='mt-20'>
                <Cell
                  title='配送时间'
                  extra={
                    <>
                      <Text>{activeDelivery?.label || '请选择配送时间'}</Text>
                      <ArrowRight />
                    </>
                  }
                  onClick={() => setVisible(true)}
                />

                <Cell title='备注:' />
                <TextArea
                  placeholder='建议留言前先与商家沟通确认'
                  value={buyerMessage}
                  onChange={(e) => setBuyerMessage(e)}
                />
              </Cell.Group>

              <Cell.Group className='mt-20'>
                <Cell
                  title='商品总价:'
                  extra={<Text>¥ {orderPre?.summary.totalPrice.toFixed(2)}</Text>}
                />

                <Cell
                  title='运费:'
                  extra={<Text>¥ {orderPre?.summary.postFee.toFixed(2)}</Text>}
                />
              </Cell.Group>
            </ScrollView>
          ),
        }}
        footer={{
          customRender: (
            <View className={styles.toolbar}>
              <View className={`${styles['total-pay']}`}>
                <Text className={styles.number}>¥ {orderPre?.summary.totalPayPrice.toFixed(2)}</Text>
              </View>
              <View
                className={`${styles.button} ${!selectedAddress?.id ? styles.disabled : ''}`}
                onClick={onOrderSubmit}
              >
                提交订单
              </View>
            </View>
          ),
          style: {
            padding: '0',
          },
        }}
      />
      <Picker
        title='请选择配送时间'
        visible={visible}
        options={[deliveryList]}
        onConfirm={onChangeDelivery}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export default OrderConfirm;
