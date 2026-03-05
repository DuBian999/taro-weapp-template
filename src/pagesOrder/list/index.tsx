import TRLayout from '@/components/TRLayout/index';
import { Tabs } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useMemo, useState } from 'react';
import OrderList from './components/OrderList';
import styles from './index.module.scss';

export default () => {
  // 获取页面参数
  const router = Taro.useRouter();
  const { type } = router.params;

  // tabs 数据
  const orderTabs = useMemo(
    () => [
      { orderState: 0, title: '全部' },
      { orderState: 1, title: '待付款' },
      { orderState: 2, title: '待发货' },
      { orderState: 3, title: '待收货' },
      { orderState: 4, title: '待评价' },
    ],
    []
  );

  // 当前选中的 tab 下标
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = orderTabs.findIndex((v) => v.orderState === Number(type));
    return index >= 0 ? index : 0;
  });

  // 当前选中的订单状态
  const orderState = useMemo(() => orderTabs[activeIndex].orderState, [activeIndex, orderTabs]);

  console.log(orderState, activeIndex);

  return (
    <>
      <TRLayout
        navBar={{
          title: '订单列表',
        }}
        body={{
          customRender: (
            <View className={styles.tabsContainer}>
              <Tabs
                value={activeIndex}
                onChange={(index) => setActiveIndex(index as number)}
                className={styles.tabs}
                activeType='smile'
              >
                {orderTabs.map((tab) => (
                  <Tabs.TabPane
                    key={tab.orderState}
                    title={tab.title}
                  />
                ))}
              </Tabs>

              {orderTabs.map((tab) => {
                if (tab.orderState === activeIndex) {
                  return (
                    <OrderList
                      orderState={orderState}
                      key={tab.orderState}
                    />
                  );
                }
              })}
            </View>
          ),
          style: {
            padding: 0,
          },
        }}
      />
    </>
  );
};
