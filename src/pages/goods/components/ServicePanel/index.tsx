import { View } from '@tarojs/components';
import React from 'react';
import styles from './index.module.scss';

const ServicePanel: React.FC = () => {
  // 服务说明数据
  const serviceItems = [
    {
      title: '无忧退货',
      description: '自收到商品之日起30天内，可在线申请无忧退货服务（食品等特殊商品除外）',
    },
    {
      title: '快速退款',
      description:
        '收到退货包裹并确认无误后，将在48小时内办理退款，退款将原路返回，不同银行处理时间不同，预计1-5个工作日到账',
    },
    {
      title: '满88元免邮费',
      description: '单笔订单金额(不含运费)满88元可免邮费，不满88元，单笔订单收取10元邮费',
    },
  ];

  return (
    <View className={styles['content']}>
      {serviceItems.map((item, index) => (
        <View
          key={index}
          className={styles['item']}
        >
          <View className={styles['dt']}>{item.title}</View>
          <View className={styles['dd']}>{item.description}</View>
        </View>
      ))}
    </View>
  );
};

export default ServicePanel;
