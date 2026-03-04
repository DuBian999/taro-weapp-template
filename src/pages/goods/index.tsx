import { postMemberCartAPI } from '@/apis/cart';
import { getGoodsByIdAPI } from '@/apis/goods';
import TRLayout from '@/components/TRLayout';
import type { SkuPopupLocaldata } from '@/components/TRSku';
import SkuPanel from '@/components/TRSku';
import type { GoodsResult } from '@/types/goods';
import { mergeClassNames } from '@/utils/common';
import { IconFont } from '@nutui/icons-react-taro';
import { Button, Image, Popup, Swiper } from '@nutui/nutui-react-taro';
import { ScrollView, Text, View } from '@tarojs/components';
import { navigateTo, previewImage, pxTransform, showToast, useLoad, useRouter } from '@tarojs/taro';
import { useState } from 'react';
import AddressPanel from './components/AddressPanel';
import ServicePanel from './components/ServicePanel';
import styles from './index.module.scss';

type PopupName = 'address' | 'service' | 'sku';

export default () => {
  const titleMap = {
    address: '选择地址',
    service: '服务说明',
    sku: '选择规格',
  };
  // 获取路由参数
  const router = useRouter();
  const { id } = router?.params || {};

  // 商品详情信息
  const [goods, setGoods] = useState<GoodsResult | null>(null);

  // 选择的地址
  const [selectedAddress, setSelectedAddress] = useState<Record<string, string>>({ label: '', id: '' });

  // 轮播图当前索引
  const [current, setCurrent] = useState(0);

  // 弹出层控制
  const [popupVisible, setPopupVisible] = useState(false);

  const [popupName, setPopupName] = useState<PopupName | null>(null);

  // SKU 弹出层数据
  const [localdata, setLocaldata] = useState<SkuPopupLocaldata | null>(null);

  // 选择的规格名字
  const [selectArr, setSelectArr] = useState<string[]>([]);

  // 选中的商品信息
  const [productInfo, setProductInfo] = useState<{ _id: string; buy_num: number }>({ _id: '', buy_num: 0 });

  // 获取商品详情数据
  const getGoodsByIdData = async (goodsId: string) => {
    try {
      const res = await getGoodsByIdAPI(goodsId);
      setGoods(res.result);
      setLocaldata({
        _id: res.result.id,
        name: res.result.name,
        goods_thumb: res.result.mainPictures[0],
        spec_list: res.result.specs.map((v) => ({ name: v.name, list: v.values })),
        sku_list: res.result.skus.map((v) => ({
          _id: v.id,
          goods_id: res.result.id,
          goods_name: res.result.name,
          image: v.picture,
          price: v.price * 100, // 注意：需要乘以 100
          stock: v.inventory,
          sku_name_arr: v.specs.map((vv) => vv.valueName),
        })),
      });
    } catch (error) {
      console.error('获取商品详情失败', error);
    }
  };

  // 点击图片预览
  const handleImagePreview = (url: string) => {
    previewImage({
      current: url,
      urls: goods?.mainPictures || [],
    });
  };

  // 打开弹出层
  const openPopup = (name: PopupName) => {
    setPopupName(name);
    setPopupVisible(true);
  };

  // 关闭弹出层
  const closePopup = () => {
    setPopupVisible(false);
    setPopupName(null);
  };

  // 选择地址
  const handleSelectAddress = (v: Record<string, string>) => {
    setSelectedAddress({
      ...selectedAddress,
      ...v,
    });
    closePopup();
  };

  // 处理操作按钮点击事件
  const handleActionBtnClick = async (action: 'addCart' | 'buyNow') => {
    //  if (!selectedAddress.id) {
    //   showToast({
    //     title: '请选择地址',
    //     icon: 'none',
    //   });
    //   return;
    // }
    if (action === 'addCart') {
      if (!selectArr.length) {
        showToast({
          title: '请选择规格',
          icon: 'none',
        });
        return;
      }
      // 加入购物车逻辑
      await postMemberCartAPI({ skuId: productInfo._id, count: productInfo.buy_num });
      showToast({ title: '添加成功' });
    } else if (action === 'buyNow') {
      navigateTo({ url: `/pagesOrder/create/create?skuId=${productInfo._id}&count=${productInfo.buy_num}` });
    }
  };

  // 页面加载
  useLoad(() => {
    if (id) {
      getGoodsByIdData(id);
    }
  });
  return (
    <>
      <TRLayout
        navBar={{
          title: '商品详情',
          style: {
            paddingBottom: '10rpx',
          },
        }}
        body={{
          customRender: (
            <View className='goods-detail-page'>
              <ScrollView
                scrollY
                className='viewport'
              >
                {/* 基本信息 */}
                <View className={styles['goods']}>
                  {/* 商品主图 */}
                  <View className={styles['preview']}>
                    <Swiper
                      onChange={(e) => {
                        setCurrent(e.detail.current);
                      }}
                      indicator={
                        <View className={styles['indicator']}>
                          {current + 1}/{goods?.mainPictures?.length}
                        </View>
                      }
                      height={pxTransform(750)}
                    >
                      {goods?.mainPictures?.map((item) => (
                        <Swiper.Item
                          key={item}
                          style={{ width: '100%', height: '100%' }}
                        >
                          {item && (
                            <Image
                              onClick={() => handleImagePreview(item)}
                              src={item}
                              mode='aspectFill'
                            />
                          )}
                        </Swiper.Item>
                      ))}
                    </Swiper>
                  </View>

                  {/* 商品简介 */}
                  <View className={styles['meta']}>
                    <View className={styles['price']}>
                      <Text className={styles['symbol']}>¥</Text>
                      <Text className={styles['number']}>{goods?.price}</Text>
                    </View>
                    <View className={styles['name']}>{goods?.name}</View>
                    <View className={styles['desc']}>{goods?.desc}</View>
                  </View>

                  {/* 操作面板 */}
                  <View className={styles['action']}>
                    <View
                      onClick={() => openPopup('sku')}
                      className={mergeClassNames(styles['item'], styles['arrow'])}
                    >
                      <Text className={styles['label']}>选择</Text>
                      <Text className={styles['text']}>{selectArr.join(' ') || '请选择商品规格'}</Text>
                    </View>
                    <View
                      onClick={() => openPopup('address')}
                      className={mergeClassNames(styles['item'], styles['arrow'])}
                    >
                      <Text className={styles['label']}>送至</Text>
                      <Text className={mergeClassNames(styles['text'], 'ellipsis')}>
                        {selectedAddress.label || '请选择收获地址'}
                      </Text>
                    </View>
                    <View
                      onClick={() => openPopup('service')}
                      className={mergeClassNames(styles['item'], styles['arrow'])}
                    >
                      <Text className={styles['label']}>服务</Text>
                      <Text className={mergeClassNames(styles['text'], 'ellipsis')}>无忧退 快速退款 免费包邮</Text>
                    </View>
                  </View>
                </View>

                {/* 商品详情 */}
                <View className={mergeClassNames(styles['detail'], styles['panel'])}>
                  <View className={styles['title']}>
                    <Text>详情</Text>
                  </View>
                  <View className={styles['content']}>
                    <View className={styles['properties']}>
                      {/* 属性详情 */}
                      {goods?.details?.properties?.map((item) => (
                        <View
                          className={mergeClassNames(styles['item'], styles['properties-item'])}
                          key={item.name}
                        >
                          <Text className={styles['label']}>{item.name}</Text>
                          <Text className={styles['value']}>{item.value}</Text>
                        </View>
                      ))}
                    </View>
                    {/* 图片详情 */}
                    {goods?.details?.pictures?.map((item) => (
                      <Image
                        key={item}
                        mode='widthFix'
                        src={item}
                        className={styles['detail-image']}
                      />
                    ))}
                  </View>
                </View>

                {/* 同类推荐 */}
                <View className={mergeClassNames(styles['similar'], styles['panel'])}>
                  <View className={styles['title']}>
                    <Text>同类推荐</Text>
                  </View>
                  <View className={styles['content']}>
                    {goods?.similarProducts?.map((item) => (
                      <View
                        key={item.id}
                        className={styles['goods']}
                        onClick={() => navigateTo({ url: `/pages/goods/index?id=${item.id}` })}
                      >
                        <Image
                          className={styles['image']}
                          mode='aspectFill'
                          src={item.picture}
                        />
                        <View className={mergeClassNames(styles['name'], styles['ellipsis'])}>{item.name}</View>
                        <View className={styles['price']}>
                          <Text className={styles['symbol']}>¥</Text>
                          <Text className={styles['number']}>{item.price}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </View>
          ),
          style: {
            padding: 0,
          },
        }}
        footer={{
          customRender: (
            <>
              {/* 用户操作 */}
              <View className={styles['toolbar']}>
                <View className={styles['bar-icons']}>
                  <View className={styles['bar-item']}>
                    <Button
                      openType='contact'
                      fill='none'
                      icon={IconFont({
                        fontClassName: 'icon-heart',
                        size: 24,
                      })}
                    />
                    <View className={styles['desc']}>收藏</View>
                  </View>
                  <View className={styles['bar-item']}>
                    <Button
                      openType='contact'
                      fill='none'
                      icon={IconFont({
                        fontClassName: 'icon-handset',
                        size: 24,
                      })}
                    />
                    <View className={styles['desc']}>客服</View>
                  </View>

                  <View className={styles['bar-item']}>
                    <Button
                      openType='contact'
                      fill='none'
                      icon={IconFont({
                        fontClassName: 'icon-cart',
                        size: 24,
                      })}
                    />
                    <View className={styles['desc']}>购物车</View>
                  </View>
                </View>
                <View className={styles['bar-buttons']}>
                  <View
                    className={mergeClassNames(styles['singgle-btn'], styles['addcart'])}
                    onClick={() => handleActionBtnClick('addCart')}
                  >
                    加入购物车
                  </View>
                  <View
                    className={mergeClassNames(styles['singgle-btn'], styles['payment'])}
                    onClick={() => handleActionBtnClick('buyNow')}
                  >
                    立即购买
                  </View>
                </View>
              </View>
            </>
          ),
          style: {
            padding: '12rpx 16rpx',
          },
        }}
      />

      {/*  弹出层 */}
      <Popup
        visible={popupVisible}
        onClose={closePopup}
        position='bottom'
        style={{ backgroundColor: '#fff' }}
        title={titleMap[popupName!]}
        destroyOnClose
      >
        {popupName === 'sku' && (
          <SkuPanel
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
            selectArr={selectArr}
            onAddCart={(v) => {
              setSelectArr(v.sku_name_arr);
              setProductInfo({ _id: v._id, buy_num: v.buy_num });
              setPopupVisible(false);
            }}
            localdata={localdata!}
          />
        )}
        {popupName === 'address' && (
          <AddressPanel
            onChange={(v) => handleSelectAddress(v)}
            defaultValue={selectedAddress.id}
          />
        )}
        {popupName === 'service' && <ServicePanel />}
      </Popup>
    </>
  );
};
