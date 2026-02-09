import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/apis/index';
import type { GuessLikeHandle } from '@/components/TRGuessLike/index';
import TRGuessLike from '@/components/TRGuessLike/index';
import TRLayout from '@/components/TRLayout/index';
import { BannerItem, CategoryItem, HotItem } from '@/types';
import { InfiniteLoading } from '@nutui/nutui-react-taro';
import { useCallback, useEffect, useRef, useState } from 'react';
import Category from './conponents/Category';
import Header from './conponents/Header';
import Hot from './conponents/Hot';
import NavBar from './conponents/NavBar';

const Index = () => {
  // banner轮播列表
  const [bannerList, setBannerList] = useState<BannerItem[]>([]);
  // 分类列表
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  // 推荐列表
  const [hotList, setHotList] = useState<HotItem[]>([]);
  // 猜你喜欢组件实例
  const guessLikeRef = useRef<GuessLikeHandle>(null);
  // 获取banner轮播数据
  const getHomeBannerData = async () => {
    const res = await getHomeBannerAPI();
    setBannerList(res.result || []);
  };

  // 获取分类列表数据
  const getCateGoryData = async () => {
    const res = await getHomeCategoryAPI();
    setCategoryList(res.result || []);
  };

  // 获取热门列表
  const getHotData = async () => {
    const res = await getHomeHotAPI();
    setHotList(res.result);
  };

  const initData = useCallback(() => {
    getHomeBannerData();
    getCateGoryData();
    getHotData();
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <>
      <TRLayout
        navBar={{
          title: <NavBar />,
          hideArrow: true,
          style: {
            backgroundColor: '#57bea0',
          },
        }}
        header={{
          customRender: <Header bannerList={bannerList} />,
          style: {
            padding: 0,
          },
        }}
        body={{
          customRender: (
            <>
              <InfiniteLoading
                pullRefresh
                onRefresh={async () => {
                  initData();
                  guessLikeRef.current?.resetData();
                }}
                onLoadMore={async () => {
                  guessLikeRef.current?.getMore();
                }}
              >
                <Category categoryList={categoryList} />
                <Hot hotList={hotList} />
                <TRGuessLike ref={guessLikeRef} />
              </InfiniteLoading>
            </>
          ),
        }}
        footer={{}}
      />
    </>
  );
};

export default Index;
