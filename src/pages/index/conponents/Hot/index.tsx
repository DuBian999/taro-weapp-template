import { HotItem } from '@/types';
import { Image, Navigator, Text, View } from '@tarojs/components';
import style from './index.module.scss';

const Hot: React.FC<{ hotList: HotItem[] }> = ({ hotList }) => {
  return (
    <View className={style['hot']}>
      {hotList.map((item) => (
        <View
          key={item.id}
          className={style['item']}
        >
          <View className={style['title']}>
            <Text className={style['title-text']}>{item.title}</Text>
            <Text className={style['title-desc']}>{item.alt.substring(0, 5)}</Text>
          </View>
          <Navigator
            hoverClass='none'
            url={`/pages/hot/hot?type=${item.type}`}
            className={style['cards']}
          >
            {item.pictures.map((src) => (
              <Image
                key={src}
                className={style['image']}
                mode='aspectFit'
                src={src}
              />
            ))}
          </Navigator>
        </View>
      ))}
    </View>
  );
};
export default Hot;
