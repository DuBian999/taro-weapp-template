import TRLayout from '@/components/TRLayout';
import { Navigator, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

const Payment = () => {
  const router = Taro.useRouter();
  const { id } = router.params;
  return (
    <>
      <TRLayout
        navBar={{ showNavBar: false }}
        body={{
          customRender: (
            <View className={styles.viewport}>
              <View className={styles.overview}>
                <View className={`${styles.status} icon-checked`}>支付成功</View>
                <View className={styles.buttons}>
                  <Navigator
                    hoverClass='none'
                    className={`${styles.button} ${styles.navigator}`}
                    url='/pages/index/index'
                    openType='switchTab'
                  >
                    返回首页
                  </Navigator>
                  <Navigator
                    hoverClass='none'
                    className={`${styles.button} ${styles.navigator}`}
                    url={`/pagesOrder/detail/index?id=${id}`}
                    openType='redirect'
                  >
                    查看订单
                  </Navigator>
                </View>
              </View>
            </View>
          ),
          style: {
            padding: '0',
          },
        }}
      />
    </>
  );
};

export default Payment;
