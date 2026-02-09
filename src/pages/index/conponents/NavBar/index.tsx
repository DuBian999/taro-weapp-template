import Logo from '@/static/images/logo.png';
import { Image, Text, View } from '@tarojs/components';
import style from './index.module.scss';

const NavBar = () => {
  return (
    <View className={style['nav-bar']}>
      <View className={style['logo']}>
        <Image
          className={style['logo-image']}
          src={Logo}
        />
        <Text className={style['logo-text']}>新鲜 · 亲民 · 快捷</Text>
      </View>
    </View>
  );
};
export default NavBar;
