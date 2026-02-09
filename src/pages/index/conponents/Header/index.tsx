import { BannerItem } from '@/types';
import { Scan } from '@nutui/icons-react-taro';
import { SearchBar, Swiper } from '@nutui/nutui-react-taro';
import { Image, View } from '@tarojs/components';
import style from './index.module.scss';

const Header: React.FC<{ bannerList: BannerItem[] }> = ({ bannerList }) => {
  // 搜索商品
  const searchForProducts = (value: string) => {
    console.log(value, '搜索商品');
  };
  return (
    <>
      <View className={style['search']}>
        <SearchBar
          shape='round'
          placeholder='搜索商品'
          rightIn={
            <Scan
              color='#888B94'
              onClick={() => console.log('拍照购')}
            />
          }
          style={
            {
              '--nutui-searchbar-background': 'transparent',
              '--nutui-searchbar-content-background': '#eee',
            } as React.CSSProperties
          }
          onChange={searchForProducts}
        />
      </View>
      <View className={style['home-container']}>
        <Swiper
          defaultValue={2}
          autoplay
          indicator
        >
          {bannerList.map((item) => (
            <Swiper.Item key={item.id}>
              <Image
                style={{ width: '100%', height: '100%' }}
                src={item.imgUrl}
              />
            </Swiper.Item>
          ))}
        </Swiper>
      </View>
    </>
  );
};
export default Header;
