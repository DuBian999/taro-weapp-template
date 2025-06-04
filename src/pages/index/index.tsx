import TRLayout from '@/components/TRLayout/index';
import { ArrowRight } from '@nutui/icons-react-taro';
import { Cell } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import style from './index.module.scss';

const list = [
  {
    title: '自定义Confrim',
    url: '/pages/dialog/index',
  },
  {
    title: '自定义Layout',
    url: '/pages/layout/index',
  },
  {
    title: '自定义Select',
    url: '/pages/select/index',
  },
  {
    title: '自定义TimeRange',
    url: '/pages/timeRange/index',
  },
];

const Index = () => {
  return (
    <>
      <TRLayout
        title='首页'
        hideArrow
        bodyContent={
          <View className={style['home-container']}>
            {list.map(({ url, title }) => (
              <Cell
                key={url}
                title={title}
                extra={<ArrowRight />}
                onClick={() => navigateTo({ url })}
              />
            ))}
          </View>
        }
      />
    </>
  );
};

export default Index;
