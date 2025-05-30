import TRLayout from '@/components/TRLayout/index';
import { View } from '@tarojs/components';
import style from './index.module.scss';

const Index = () => {
  return (
    <>
      <TRLayout
        title='自定义Layout布局'
        bodyContent={<View className={style['home-container']}></View>}
      />
    </>
  );
};

export default Index;
