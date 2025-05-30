import TRLayout from '@/components/TRLayout/index';
import { ArrowRight } from '@nutui/icons-react-taro';
import { Cell } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import style from './index.module.scss';
import { navigateTo } from '@tarojs/taro';

const list = [
  {
    title: '二次确认弹框',
    url: '/pages/dialog/index',
  },

  {
    title: '自定义Layout布局',
    url: '/pages/layout/index',
  },

  {
    title: 'OSS上传',
    url: '',
  },

  {
    title: '文件流及压缩文件写入',
    url: '',
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
