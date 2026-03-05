import type { LogisticItem, OrderResult } from '@/types/order';
import { Image, Navigator, ScrollView, Text, View } from '@tarojs/components';
import Taro, { pxTransform } from '@tarojs/taro';
import { useCallback, useEffect, useState } from 'react';
import {
  deleteMemberOrderAPI,
  getMemberOrderByIdAPI,
  getMemberOrderCancelByIdAPI,
  getMemberOrderConsignmentByIdAPI,
  getMemberOrderLogisticsByIdAPI,
  putMemberOrderReceiptByIdAPI,
} from '@/apis/order';
import { getPayMockAPI } from '@/apis/pay';
import TRLayout from '@/components/TRLayout';
import { Check } from '@nutui/icons-react-taro';
import { CountDown, Popup, Radio } from '@nutui/nutui-react-taro';
import styles from './index.module.scss';

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

const OrderDetail = () => {
  const { statusBarHeight } = Taro.getWindowInfo();

  const [popupVisible, setPopupVisible] = useState(false);

  // 取消原因列表
  const reasonList = ['商品无货', '不想要了', '商品信息填错了', '地址信息填写错误', '商品降价', '其它'];
  // 订单取消原因
  const [reason, setReason] = useState('');

  // 复制内容
  const onCopy = (id: string) => {
    Taro.setClipboardData({ data: id });
  };

  // 获取页面参数
  const router = Taro.useRouter();
  const { id } = router.params;

  // 获取页面栈 (用于导航栏返回判断)
  const pages = Taro.getCurrentPages();
  const isFirstPage = pages.length <= 1;

  // 订单详情数据
  const [order, setOrder] = useState<OrderResult | null>(null);
  // 物流信息
  const [logisticList, setLogisticList] = useState<LogisticItem[]>([]);

  // 获取物流信息
  const getMemberOrderLogisticsByIdData = useCallback(async () => {
    if (!id) return;
    try {
      const res = await getMemberOrderLogisticsByIdAPI(id);
      setLogisticList(res.result.list);
    } catch (error) {
      console.error('获取物流信息失败', error);
    }
  }, [id]);

  // 获取订单详情
  const getMemberOrderByIdData = useCallback(async () => {
    if (!id) return;
    try {
      const res = await getMemberOrderByIdAPI(id);
      setOrder(res.result);
      if ([OrderState.DaiShouHuo, OrderState.DaiPingJia, OrderState.YiWanCheng].includes(res.result.orderState)) {
        getMemberOrderLogisticsByIdData();
      }
    } catch (error) {
      console.error('获取订单详情失败', error);
    }
  }, [getMemberOrderLogisticsByIdData, id]);

  useEffect(() => {
    getMemberOrderByIdData();
  }, [getMemberOrderByIdData, id]);

  // 倒计时结束事件
  const onTimeup = () => {
    if (order) {
      setOrder({ ...order, orderState: OrderState.YiQuXiao });
    }
  };

  // 是否为开发环境
  const isDev = process.env.NODE_ENV === 'development';

  // 订单支付
  const onOrderPay = async () => {
    if (!id) return;
    try {
      if (isDev) {
        // 开发环境模拟支付
        await getPayMockAPI({ orderId: id });
      } else {
        // 微信小程序支付
        // #ifdef MP-WEIXIN
        await getPayMockAPI({ orderId: id });
        // #endif

        // #ifdef H5 || APP-PLUS
        await getPayMockAPI({ orderId: id });
        // #endif
      }
      Taro.redirectTo({ url: `/pagesOrder/payment/index?id=${id}` });
    } catch (error) {
      console.error('支付失败', error);
    }
  };

  // 模拟发货
  const onOrderSend = async () => {
    if (!id) return;
    try {
      await getMemberOrderConsignmentByIdAPI(id);
      Taro.showToast({ icon: 'success', title: '模拟发货完成' });
      if (order) {
        setOrder({ ...order, orderState: OrderState.DaiShouHuo });
      }
    } catch (error) {
      console.error('模拟发货失败', error);
    }
  };

  // 确认收货
  const onOrderConfirm = () => {
    Taro.showModal({
      content: '为保障您的权益，请收到货并确认无误后，再确认收货',
      confirmColor: '#27BA9B',
      success: async (res) => {
        if (res.confirm && id) {
          try {
            const result = await putMemberOrderReceiptByIdAPI(id);
            setOrder(result.result);
          } catch (error) {
            console.error('确认收货失败', error);
          }
        }
      },
    });
  };

  // 删除订单
  const onOrderDelete = () => {
    Taro.showModal({
      content: '是否删除订单',
      confirmColor: '#27BA9B',
      success: async (res) => {
        if (res.confirm && id) {
          try {
            await deleteMemberOrderAPI({ ids: [id] });
            Taro.redirectTo({ url: '/pagesOrder/list/list' });
          } catch (error) {
            console.error('删除订单失败', error);
          }
        }
      },
    });
  };

  // 取消订单
  const onOrderCancel = async () => {
    if (!id || !reason) return;
    try {
      const res = await getMemberOrderCancelByIdAPI(id, { cancelReason: reason });
      setOrder(res.result);
      setPopupVisible(false);
      Taro.showToast({ icon: 'none', title: '订单取消成功' });
    } catch (error) {
      console.error('取消订单失败', error);
    }
  };

  // 渲染顶部操作按钮组
  const renderOverviewButtons = () => {
    if (!order) return null;
    switch (order.orderState) {
      case OrderState.DaiFuKuan:
        return (
          <View
            className={styles.button}
            onClick={onOrderPay}
          >
            去支付
          </View>
        );
      default:
        return (
          <View className={styles['button-group']}>
            <Navigator
              className={styles.button}
              url={`/pagesOrder/create/index?orderId=${id}`}
              hoverClass='none'
            >
              再次购买
            </Navigator>
            {isDev && order.orderState === OrderState.DaiFaHuo && (
              <View
                className={styles.button}
                onClick={onOrderSend}
              >
                模拟发货
              </View>
            )}
            {order.orderState === OrderState.DaiShouHuo && (
              <View
                className={styles.button}
                onClick={onOrderConfirm}
              >
                确认收货
              </View>
            )}
          </View>
        );
    }
  };

  // 渲染底部操作栏
  const renderToolbar = () => {
    if (!order) return null;
    switch (order.orderState) {
      case OrderState.DaiFuKuan:
        return (
          <>
            <View
              className={`${styles.button} ${styles.primary}`}
              onClick={onOrderPay}
            >
              去支付
            </View>
            <View
              className={styles.button}
              onClick={() => setPopupVisible(true)}
            >
              取消订单
            </View>
          </>
        );
      case OrderState.DaiShouHuo:
        return (
          <>
            <Navigator
              className={`${styles.button} ${styles.secondary}`}
              url={`/pagesOrder/create/index?orderId=${id}`}
              hoverClass='none'
            >
              再次购买
            </Navigator>
            <View
              className={`${styles.button} ${styles.primary}`}
              onClick={onOrderConfirm}
            >
              确认收货
            </View>
          </>
        );
      case OrderState.DaiPingJia:
        return (
          <>
            <Navigator
              className={`${styles.button} ${styles.secondary}`}
              url={`/pagesOrder/create/index?orderId=${id}`}
              hoverClass='none'
            >
              再次购买
            </Navigator>
            <View className={styles.button}>去评价</View>
            <View
              className={`${styles.button} ${styles.delete}`}
              onClick={onOrderDelete}
            >
              删除订单
            </View>
          </>
        );
      case OrderState.YiWanCheng:
      case OrderState.YiQuXiao:
        return (
          <>
            <Navigator
              className={`${styles.button} ${styles.secondary}`}
              url={`/pagesOrder/create/index?orderId=${id}`}
              hoverClass='none'
            >
              再次购买
            </Navigator>
            <View
              className={`${styles.button} ${styles.delete}`}
              onClick={onOrderDelete}
            >
              删除订单
            </View>
          </>
        );
      default:
        return (
          <Navigator
            className={`${styles.button} ${styles.secondary}`}
            url={`/pagesOrder/create/index?orderId=${id}`}
            hoverClass='none'
          >
            再次购买
          </Navigator>
        );
    }
  };

  return (
    <>
      <TRLayout
        navBar={{ showNavBar: false }}
        header={{
          customRender: (
            <>
              {/* 订单状态 */}
              {order && (
                <View
                  className={styles.overview}
                  style={{ paddingTop: `${statusBarHeight}px` }}
                >
                  <View className={styles.navbar}>
                    <View className={styles.wrap}>
                      {!isFirstPage ? (
                        <Navigator
                          openType='navigateBack'
                          className={`${styles.back} icon-left`}
                        />
                      ) : (
                        <Navigator
                          url='/pages/index/index'
                          openType='switchTab'
                          className={`${styles.back} icon-home`}
                        />
                      )}
                      <View className={styles.title}>订单详情</View>
                    </View>
                  </View>
                  {order.orderState === OrderState.DaiFuKuan ? (
                    <>
                      <View className={`${styles.status} icon-clock`}>等待付款</View>
                      <View className={styles.tips}>
                        <Text className={styles.money}>应付金额: ¥ {order.payMoney}</Text>
                        <Text className={styles.time}>支付剩余</Text>
                        <CountDown
                          endTime={Date.now() + order.countdown * 1000}
                          format='mm:ss'
                          onEnd={onTimeup}
                        />
                      </View>
                      {renderOverviewButtons()}
                    </>
                  ) : (
                    <>
                      <View className={styles.status}> {orderStateList[order.orderState].text} </View>
                      {renderOverviewButtons()}
                    </>
                  )}
                </View>
              )}
            </>
          ),
          style: {
            backgroundColor: 'transparent',
            padding: 0,
          },
        }}
        body={{
          customRender: (
            <ScrollView
              enableBackToTop
              scrollY
              className={styles.viewport}
              id='scroller'
            >
              {order ? (
                <>
                  {/* 配送状态 */}
                  <View className={styles.shipment}>
                    {logisticList.map((item) => (
                      <View
                        key={item.id}
                        className={styles.item}
                      >
                        <View className={styles.message}>{item.text}</View>
                        <View className={styles.date}> {item.time} </View>
                      </View>
                    ))}
                    <View className={styles.locate}>
                      <View className={styles.user}>
                        {order.receiverContact} {order.receiverMobile}
                      </View>
                      <View className={styles.address}> {order.receiverAddress} </View>
                    </View>
                  </View>

                  {/* 商品信息 */}
                  <View className={styles.goods}>
                    <View className={styles.item}>
                      {order.skus.map((item) => (
                        <Navigator
                          key={item.id}
                          className={styles.navigator}
                          url={`/pages/goods/index?id=${item.spuId}`}
                          hoverClass='none'
                        >
                          <Image
                            className={styles.cover}
                            src={item.image}
                          />
                          <View className={styles.meta}>
                            <View className={`${styles.name} ${styles.ellipsis}`}>{item.name}</View>
                            <View className={styles.type}>{item.attrsText}</View>
                            <View className={styles.price}>
                              <View className={styles.actual}>
                                <Text className={styles.symbol}>¥</Text>
                                <Text>{item.curPrice}</Text>
                              </View>
                            </View>
                            <View className={styles.quantity}>x{item.quantity}</View>
                          </View>
                        </Navigator>
                      ))}
                      {order.orderState === OrderState.DaiPingJia && (
                        <View className={styles.action}>
                          <View className={`${styles.button} ${styles.primary}`}>申请售后</View>
                          <Navigator className={styles.button}>去评价</Navigator>
                        </View>
                      )}
                    </View>
                    {/* 合计 */}
                    <View className={styles.total}>
                      <View className={styles.row}>
                        <View className={styles.text}>商品总价: </View>
                        <View className={styles.symbol}>{order.totalMoney}</View>
                      </View>
                      <View className={styles.row}>
                        <View className={styles.text}>运费: </View>
                        <View className={styles.symbol}>{order.postFee}</View>
                      </View>
                      <View className={styles.row}>
                        <View className={styles.text}>应付金额: </View>
                        <View className={`${styles.symbol} ${styles.primary}`}>{order.payMoney}</View>
                      </View>
                    </View>
                  </View>

                  {/* 订单信息 */}
                  <View className={styles.detail}>
                    <View className={styles.title}>订单信息</View>
                    <View className={styles.row}>
                      <View className={styles.item}>
                        订单编号: {id}
                        <Text
                          className={styles.copy}
                          onClick={() => onCopy(id!)}
                        >
                          复制
                        </Text>
                      </View>
                      <View className={styles.item}>下单时间: {order.createTime}</View>
                    </View>
                  </View>

                  {/* 底部占位 */}
                  <View className={styles['toolbar-height']} />
                </>
              ) : (
                <></>
              )}
            </ScrollView>
          ),
        }}
        footer={{
          customRender: <View className={styles.toolbar}>{renderToolbar()}</View>,
        }}
      />

      {/* 取消订单弹窗 - 使用 AtActionSheet 或自定义弹窗 */}

      <Popup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        position='bottom'
        closeable
        round
        title='订单取消'
        description='请选择取消订单的原因'
      >
        <View className={styles['popup-content']}>
          <Radio.Group
            style={{ width: '100%' }}
            labelPosition='left'
            onChange={(v) => setReason(v as string)}
          >
            {reasonList.map((item) => (
              <Radio
                key={item}
                icon={<Check />}
                activeIcon={<Check style={{ color: 'red' }} />}
                value={item}
                style={{ padding: `${pxTransform(20)} 0`, borderBottom: `${pxTransform(1)} solid #f5f5f5` }}
              >
                {item}
              </Radio>
            ))}
          </Radio.Group>

          <View className={styles.footer}>
            <View
              className={styles.button}
              onClick={() => setPopupVisible(false)}
            >
              取消
            </View>
            <View
              className={`${styles.button} ${styles.primary}`}
              onClick={onOrderCancel}
            >
              确认
            </View>
          </View>
        </View>
      </Popup>
    </>
  );
};

export default OrderDetail;
