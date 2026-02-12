import GuessLike from '@/components/TRGuessLike';
import TRLayout from '@/components/TRLayout/index';
import { mergeClassNames } from '@/utils/common';
import { Image, Navigator, Text, View } from '@tarojs/components';
import style from './index.module.scss';

// 订单选项
const orderTypes = [
  { type: 1, text: '待付款', icon: 'icon-currency' },
  { type: 2, text: '待发货', icon: 'icon-gift' },
  { type: 3, text: '待收货', icon: 'icon-check' },
  { type: 4, text: '待评价', icon: 'icon-comment' },
  { type: 5, text: '售后', icon: 'icon-handset' },
];

export default () => {
  return (
    <>
      <TRLayout
        navBar={{
          customRender: ({ top, height }) => (
            <View
              className={style['profile']}
              style={{
                paddingTop: `${top}px`,
                paddingBottom: `10px`,
              }}
            >
              {/* 情况1：已登录 */}
              {false ? (
                <View className={style['overview']}>
                  <Navigator
                    url='/pagesMember/profile/profile'
                    hoverClass='none'
                  >
                    <Image
                      src='https://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png'
                      mode='aspectFill'
                      className={style['avatar']}
                    />
                  </Navigator>
                  <View className={style['meta']}>
                    <View className={style['nickname']}>
                      呵呵呵呵
                      {/* {memberStore.profile.nickname || memberStore.profile.account} */}
                    </View>
                    <Navigator
                      className={style['extra']}
                      url='/pagesMember/profile/profile'
                      hoverClass='none'
                    >
                      <Text className={style['update']}>更新头像昵称</Text>
                    </Navigator>
                  </View>
                </View>
              ) : (
                /* 情况2：未登录 */
                <View className={style['overview']}>
                  <Navigator
                    url='/pages/login/login'
                    hoverClass='none'
                  >
                    <Image
                      className={`${style['avatar']} ${style['gray']}`}
                      mode='aspectFill'
                      src='https://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png'
                    />
                  </Navigator>
                  <View className={style['meta']}>
                    <Navigator
                      url='/pages/login/login'
                      hoverClass='none'
                      className={style['nickname']}
                    >
                      未登录
                    </Navigator>
                    <View className={style['extra']}>
                      <Text className={style['tips']}>点击登录账号</Text>
                    </View>
                  </View>
                </View>
              )}
              <Navigator
                className={style['settings']}
                url='/pagesMember/settings/settings'
                hoverClass='none'
                style={{
                  top: `${top + height + 10}px`,
                }}
              >
                设置
              </Navigator>
            </View>
          ),
          hideArrow: true,
          title: '我的',
        }}
        header={{
          customRender: (
            <>
              {/* 我的订单 */}
              <View className={style['orders']}>
                <View className={style['title']}>
                  我的订单
                  <Navigator
                    className={style['navigator']}
                    url='/pagesOrder/list/list?type=0'
                    hoverClass='none'
                  >
                    查看全部订单<Text className='icon-right'></Text>
                  </Navigator>
                </View>
                <View className={style['section']}>
                  {/* 订单 */}
                  {orderTypes.map((item) => (
                    <Navigator
                      key={item.type}
                      className={mergeClassNames(style['navigator'], item.icon)}
                      url={`/pagesOrder/list/list?type=${item.type}`}
                      hoverClass='none'
                    >
                      {item.text}
                    </Navigator>
                  ))}
                </View>
              </View>
            </>
          ),
          style: {
            backgroundColor: 'var(--primary)',
            padding: '0  40rpx 20rpx 40rpx',
          },
        }}
        body={{
          customRender: <GuessLike />,
        }}
        footer={{}}
      />
    </>
  );
};
