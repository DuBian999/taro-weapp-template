import { deleteMemberOrderAPI, getMemberOrderAPI, putMemberOrderReceiptByIdAPI } from '@/apis/order';
import { getPayMockAPI } from '@/apis/pay';
import type { OrderItem, OrderListParams } from '@/types/order';
import { Image, Navigator, ScrollView, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';

interface OrderListProps {
  orderState: number;
}

/** 订单状态枚举 */
export enum OrderState {
  /** 待付款 */
  DaiFuKuan = 1,
  /** 待发货 */
  DaiFaHuo = 2,
  /** 待收货 */
  DaiShouHuo = 3,
  /** 待评价 */
  DaiPingJia = 4,
  /** 已完成 */
  YiWanCheng = 5,
  /** 已取消 */
  YiQuXiao = 6,
}

/** 订单状态列表 */
export const orderStateList = [
  { id: 0, text: '' },
  { id: 1, text: '待付款' },
  { id: 2, text: '待发货' },
  { id: 3, text: '待收货' },
  { id: 4, text: '待评价' },
  { id: 5, text: '已完成' },
  { id: 6, text: '已取消' },
];

const OrderList = (props: OrderListProps) => {
  const { orderState } = props;

  // 请求参数
  const [queryParams, setQueryParams] = useState<Required<OrderListParams>>({
    page: 1,
    pageSize: 5,
    orderState: orderState,
  });

  // 订单列表
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  // 是否加载中
  const [isLoading, setIsLoading] = useState(false);
  // 是否分页结束
  const [isFinish, setIsFinish] = useState(false);
  // 是否触发下拉刷新
  const [isTriggered, setIsTriggered] = useState(false);

  // 获取订单列表
  const getMemberOrderData = useCallback(
    async (reset = false) => {
      // 如果数据出于加载中，退出函数
      if (isLoading) return;
      // 退出分页判断
      if (isFinish && !reset) {
        Taro.showToast({ icon: 'none', title: '没有更多数据~' });
        return;
      }

      // 发送请求前，标记为加载中
      setIsLoading(true);

      try {
        // 使用当前 queryParams 发送请求
        const res = await getMemberOrderAPI(queryParams);

        // 数组追加或重置
        if (reset) {
          setOrderList(res.result.items);
        } else {
          setOrderList((prev) => [...prev, ...res.result.items]);
        }

        // 分页条件
        if (queryParams.page < res.result.pages) {
          // 页码累加
          setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
        } else {
          // 分页已结束
          setIsFinish(true);
        }
      } catch (error) {
        console.error('获取订单列表失败', error);
      } finally {
        setIsLoading(false);
      }
    },
    [isFinish, isLoading, queryParams]
  );

  // 订单支付
  const onOrderPay = async (id: string) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 开发环境模拟支付
        await getPayMockAPI({ orderId: id });
      } else {
        // #ifdef MP-WEIXIN
        await getPayMockAPI({ orderId: id });
        // #endif

        // #ifdef H5 || APP-PLUS
        await getPayMockAPI({ orderId: id });
        // #endif
      }

      // 成功提示
      Taro.showToast({ title: '模拟支付成功' });

      // 模拟支付提示
      setTimeout(() => {
        Taro.showModal({
          title: '温馨提示',
          content: '此交易是模拟支付，您并未付款，不会导致实际购买商品或服务',
          confirmText: '知道了',
          showCancel: false,
        });
      }, 2000);

      // 更新订单状态
      setOrderList((prev) =>
        prev.map((order) => (order.id === id ? { ...order, orderState: OrderState.DaiFaHuo } : order))
      );
    } catch (error) {
      console.error('支付失败', error);
    }
  };

  // 确认收货
  const onOrderConfirm = (id: string) => {
    Taro.showModal({
      content: '为保障您的权益，请收到货并确认无误后，再确认收货',
      confirmColor: '#27BA9B',
      success: async (res) => {
        if (res.confirm) {
          try {
            await putMemberOrderReceiptByIdAPI(id);
            Taro.showToast({ icon: 'success', title: '确认收货成功' });

            // 更新订单状态为待评价
            setOrderList((prev) =>
              prev.map((order) => (order.id === id ? { ...order, orderState: OrderState.DaiPingJia } : order))
            );
          } catch (error) {
            console.error('确认收货失败', error);
          }
        }
      },
    });
  };

  // 删除订单
  const onOrderDelete = (id: string) => {
    Taro.showModal({
      content: '你确定要删除该订单？',
      confirmColor: '#27BA9B',
      success: async (res) => {
        if (res.confirm) {
          try {
            await deleteMemberOrderAPI({ ids: [id] });
            // 删除成功，界面中删除订单
            setOrderList((prev) => prev.filter((order) => order.id !== id));
          } catch (error) {
            console.error('删除订单失败', error);
          }
        }
      },
    });
  };

  // 自定义下拉刷新
  const onRefresherrefresh = async () => {
    // 开始动画
    setIsTriggered(true);

    // 重置数据
    setQueryParams((prev) => ({ ...prev, page: 1 }));
    setOrderList([]);
    setIsFinish(false);

    // 加载数据
    await getMemberOrderData(true);

    // 关闭动画
    setIsTriggered(false);
  };

  // 当 orderState 变化时重置列表
  useEffect(() => {
    setQueryParams({
      page: 1,
      pageSize: 5,
      orderState: orderState,
    });
    setOrderList([]);
    setIsFinish(false);
    getMemberOrderData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      enableBackToTop
      scrollY
      className={styles.orders}
      refresherEnabled
      refresherTriggered={isTriggered}
      onRefresherRefresh={onRefresherrefresh}
      onScrollToLower={() => getMemberOrderData(false)}
    >
      {orderList.map((order) => (
        <View
          className={styles.card}
          key={order.id}
        >
          {/* 订单信息 */}
          <View className={styles.status}>
            <Text className={styles.date}>{order.createTime}</Text>
            {/* 订单状态文字 */}
            <Text>{orderStateList[order.orderState].text}</Text>
            {/* 待评价/已完成/已取消 状态: 展示删除订单 */}
            {order.orderState >= OrderState.DaiPingJia && (
              <Text
                className={`${styles['icon-delete']} icon-delete`}
                onClick={() => onOrderDelete(order.id)}
              />
            )}
          </View>

          {/* 商品信息，点击商品跳转到订单详情 */}
          {order.skus.map((item) => (
            <Navigator
              key={item.id}
              className={styles.goods}
              url={`/pagesOrder/detail/index?id=${order.id}`}
              hoverClass='none'
            >
              <View className={styles.cover}>
                <Image
                  className={styles.image}
                  mode='aspectFit'
                  src={item.image}
                />
              </View>
              <View className={styles.meta}>
                <View className={`${styles.name} ${styles.ellipsis}`}>{item.name}</View>
                <View className={styles.type}>{item.attrsText}</View>
              </View>
            </Navigator>
          ))}

          {/* 支付信息 */}
          <View className={styles.payment}>
            <Text className={styles.quantity}>共{order.totalNum}件商品</Text>
            <Text>实付</Text>
            <Text className={styles.amount}>
              <Text className={styles.symbol}>¥</Text>
              {order.payMoney}
            </Text>
          </View>

          {/* 订单操作按钮 */}
          <View className={styles.action}>
            {order.orderState === OrderState.DaiFuKuan ? (
              <View
                className={`${styles.button} ${styles.primary}`}
                onClick={() => onOrderPay(order.id)}
              >
                去支付
              </View>
            ) : (
              <>
                <Navigator
                  className={`${styles.button} ${styles.secondary}`}
                  url={`/pagesOrder/create/create?orderId=${order.id}`}
                  hoverClass='none'
                >
                  再次购买
                </Navigator>
                {order.orderState === OrderState.DaiShouHuo && (
                  <View
                    className={`${styles.button} ${styles.primary}`}
                    onClick={() => onOrderConfirm(order.id)}
                  >
                    确认收货
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      ))}

      {/* 底部提示文字 */}
      <View className={styles['loading-text']}>{isFinish ? '没有更多数据~' : '正在加载...'}</View>
    </ScrollView>
  );
};

export default OrderList;
