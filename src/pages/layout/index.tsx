import TRLayout from '@/components/TRLayout/index';
import { Button, SearchBar } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import style from './index.module.scss';

const Index = () => {
  return (
    <>
      <TRLayout
        title='示例-Layout布局'
        headerContent={
          <SearchBar
            placeholder='麻辣烫'
            rightIn='搜索'
          />
        }
        bodyContent={
          <View className={style['home-container']}>
            <Button type='primary'>测试123</Button>
            <Button type='danger'>测试123</Button>
          </View>
        }
        footerContent={
          <Button
            block
            type='primary'
          >
            确认完成
          </Button>
        }
      />
    </>
  );
};

export default Index;
