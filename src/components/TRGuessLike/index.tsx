import { getHomeGoodsGuessLikeAPI } from '@/apis/index';
import type { PageParams } from '@/types/global';
import type { GuessItem } from '@/types/index';
import { Image, Navigator, Text, View } from '@tarojs/components';
import { showToast } from '@tarojs/taro';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import style from './index.module.scss';

interface GuessLikeProps {
  // 可以添加其他props
}

export interface GuessLikeHandle {
  resetData: () => void;
  getMore: () => Promise<void>;
}

const GuessLike = forwardRef<GuessLikeHandle, GuessLikeProps>((_, ref) => {
  // 分页参数
  const [pageParams, setPageParams] = useState<Required<PageParams>>({
    page: 1,
    pageSize: 10,
  });

  // 猜你喜欢的列表
  const [guessList, setGuessList] = useState<GuessItem[]>([]);

  // 已结束标记
  const [finish, setFinish] = useState(false);

  // 获取猜你喜欢数据
  const getHomeGoodsGuessLikeData = async () => {
    // 退出分页判断
    if (finish) {
      showToast({
        icon: 'none',
        title: '没有更多数据~',
      });
      return;
    }

    try {
      const res = await getHomeGoodsGuessLikeAPI(pageParams);

      // 数组追加
      setGuessList((prev) => [...prev, ...res.result.items]);

      // 分页条件
      if (pageParams.page < res.result.pages) {
        // 页码累加
        setPageParams((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      } else {
        setFinish(true);
      }
    } catch (error) {
      console.error('获取猜你喜欢数据失败:', error);
      showToast({
        icon: 'none',
        title: '加载失败',
      });
    }
  };

  // 重置数据
  const resetData = () => {
    setPageParams({
      page: 1,
      pageSize: 10,
    });
    setGuessList([]);
    setFinish(false);
  };

  // 组件挂载完毕
  useEffect(() => {
    getHomeGoodsGuessLikeData();
  }, []);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    resetData,
    getMore: getHomeGoodsGuessLikeData,
  }));

  return (
    <>
      {/* 猜你喜欢 */}
      <View className={style['caption']}>
        <Text className={style['text']}>猜你喜欢</Text>
      </View>

      <View className={style['guess']}>
        {guessList.map((item) => (
          <Navigator
            key={item.id}
            className={style['guess-item']}
            url={`/pages/goods/goods?id=${item.id}`}
          >
            <Image
              className={style['image']}
              mode='aspectFill'
              src={item.picture}
            />
            <View className={style['name']}>{item.name}</View>
            <View className={style['price']}>
              <Text className={style['small']}>¥</Text>
              <Text className={style['price-text']}>{item.price}</Text>
            </View>
          </Navigator>
        ))}
      </View>
      <View className={style['loading-text']}>{finish && '没有更多数据~'}</View>
    </>
  );
});

export default GuessLike;
