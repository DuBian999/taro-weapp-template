import { SearchBar } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import style from './index.module.scss';

const Header: React.FC<{}> = ({}) => {
  // 搜索商品
  const searchForProducts = (value: string) => {
    console.log(value, '搜索商品');
  };
  return (
    <>
      <View className={style['search']}>
        <SearchBar
          shape='round'
          placeholder='男鞋'
          style={
            {
              '--nutui-searchbar-background': 'transparent',
              '--nutui-searchbar-content-background': '#eee',
            } as React.CSSProperties
          }
          onChange={searchForProducts}
        />
      </View>
    </>
  );
};
export default Header;
