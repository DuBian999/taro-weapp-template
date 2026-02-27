import { getCategoryTopAPI } from '@/apis/category';
import TRLayout from '@/components/TRLayout/index';
import type { CategoryTopItem } from '@/types/category';
import { mergeClassNames } from '@/utils/common';
import { Grid, SideBar } from '@nutui/nutui-react-taro';
import { Image, Navigator, Text, View } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import Header from './Components/Header';
import style from './index.module.scss';

export default () => {
  const [categoryList, setCategoryList] = useState<CategoryTopItem[]>([]);
  const [activeSiderBar, setActiveSiderBar] = useState<string>('');

  useEffect(() => {
    getCategoryTopAPI().then((res) => {
      setCategoryList(res.result || []);
      setActiveSiderBar(res.result?.[0]?.name || '');
    });
  }, []);

  // 提取当前二级分类数据
  const subCategoryList = useMemo(() => {
    return categoryList.find((item) => item.name === activeSiderBar)?.children || [];
  }, [activeSiderBar, categoryList]);

  return (
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
          padding: '20rpx 0',
          backgroundColor: '#57bea0',
        },
      }}
      body={{
        style: {
          padding: 0,
        },
        customRender: (
          <SideBar
            value={activeSiderBar}
            onChange={(value) => {
              setActiveSiderBar(value as string);
            }}
            style={{ height: '100%' }}
          >
            {categoryList.map((item) => (
              <SideBar.Item
                value={item.name}
                title={item.name}
                key={item.name}
                style={{}}
              >
                {subCategoryList.map((subCategoryItem) => (
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
                              width: '120rpx',
                              height: '120rpx',
                            }}
                          />
                        </Grid.Item>
                      ))}
                    </View>
                  </View>
                ))}
              </SideBar.Item>
            ))}
          </SideBar>
        ),
      }}
    />
  );
};
