import { getCategoryTopAPI } from '@/apis/category';
import TRLayout from '@/components/TRLayout/index';
import type { CategoryTopItem } from '@/types/category';
import { mergeClassNames } from '@/utils/common';
import { Grid, Image, Loading, Tabs } from '@nutui/nutui-react-taro';
import { Navigator, Text, View } from '@tarojs/components';
import { navigateTo, pxTransform } from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import Header from './Components/Header';
import CategorySkeleton from './Components/Skeleton';
import style from './index.module.scss';

export default () => {
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<CategoryTopItem[]>([]);
  const [activeSiderBar, setActiveSiderBar] = useState<string>('');

  useEffect(() => {
    getCategoryTopAPI().then((res) => {
      setCategoryList(res.result || []);
      setActiveSiderBar(res.result?.[0]?.name || '');
      setSkeletonLoading(false);
    });
  }, []);

  // 提取当前二级分类数据
  const subCategoryList = useMemo(() => {
    return categoryList.find((item) => item.name === activeSiderBar)?.children || [];
  }, [activeSiderBar, categoryList]);

  console.log(subCategoryList, 'subCategoryListsubCategoryList');

  return (
    <>
      {skeletonLoading ? (
        <CategorySkeleton />
      ) : (
        <TRLayout
          navBar={{
            title: '商品分类',
            hideArrow: true,
            style: {
              backgroundColor: '#57bea0',
            },
          }}
          header={{
            customRender: <Header />,
            style: {
              padding: `0 0 ${pxTransform(20)} 0`,
              backgroundColor: '#57bea0',
            },
          }}
          body={{
            style: {
              padding: 0,
            },
            customRender: (
              <Tabs
                value={activeSiderBar}
                onChange={(value) => {
                  setActiveSiderBar(value as string);
                }}
                style={{ height: '100%' }}
                direction='vertical'
              >
                {categoryList.map((item) => (
                  <Tabs.TabPane
                    value={item.name}
                    title={item.name}
                    key={item.name}
                  >
                    {subCategoryList.map((subCategoryItem) => {
                      if (activeSiderBar === item.name) {
                        return (
                          <View
                            className={style['panel']}
                            key={subCategoryItem.id}
                          >
                            <View className={style['title']}>
                              <Text className={style['name']}>{subCategoryItem.name}</Text>
                              <Navigator
                                className={style['more']}
                                hoverClass='none'
                              >
                                全部
                              </Navigator>
                            </View>
                            <View className={style['section']}>
                              {subCategoryItem.goods?.map((goods) => (
                                <Grid.Item
                                  columns={3}
                                  key={goods.id}
                                  text={
                                    <>
                                      <View className={mergeClassNames(style['name'], 'ellipsis')}>{goods.name}</View>
                                      <View className={style['price']}>
                                        <Text className={style['symbol']}>¥</Text>
                                        <Text className={style['number']}>{goods.price}</Text>
                                      </View>
                                    </>
                                  }
                                  onClick={() =>
                                    navigateTo({
                                      url: `/pages/goods/index?id=${goods.id}`,
                                    })
                                  }
                                >
                                  <Image
                                    src={goods.picture}
                                    style={{
                                      width: pxTransform(120),
                                      height: pxTransform(120),
                                    }}
                                    loading={<Loading />}
                                    lazyLoad
                                  />
                                </Grid.Item>
                              ))}
                            </View>
                          </View>
                        );
                      }
                      return null;
                    })}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            ),
          }}
        />
      )}
    </>
  );
};
