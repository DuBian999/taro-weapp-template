import { deleteMemberCartAPI, getMemberCartAPI, putMemberCartBySkuIdAPI, putMemberCartSelectedAPI } from '@/apis/cart';
import { Button, Checkbox, InputNumber, Swipe, Tag, ConfigProvider } from '@nutui/nutui-react-taro';
import { Image, Navigator, ScrollView, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useMemo, useState } from 'react';
import TRLayout from '@/components/TRLayout';
import type { CartItem } from '@/types/cart';
import { mergeClassNames } from '@/utils/common';
import style from './index.module.scss';

const checkBoxstyle = {
  '--nut-icon-width': '24px',
  '--nut-icon-height': '24px',
} as React.CSSProperties;

const CartPage: React.FC = () => {
  // 获取购物车数据
  const [cartList, setCartList] = useState<CartItem[]>([]);
  // 优化购物车空列表状态，默认展示列表
  const [showCartList, setShowCartList] = useState(true);

  // 获取购物车数据
  const getMemberCartData = async () => {
    const res = await getMemberCartAPI();
    setCartList(res.result);
    setShowCartList(res.result.length > 0);
  };

  // 初始化调用: 页面显示触发
  // useDidShow(() => {
  //   if (memberStore.profile) {
  //     getMemberCartData()
  //   }
  // })

  // 点击删除按钮
  const onDeleteCart = (skuId: string) => {
    // 弹窗二次确认
    Taro.showModal({
      content: '是否删除',
      confirmColor: '#27BA9B',
      success: async (res) => {
        if (res.confirm) {
          // 后端删除单品
          await deleteMemberCartAPI({ ids: [skuId] });
          // 重新获取列表
          getMemberCartData();
        }
      },
    });
  };

  // 修改商品数量
  const onChangeCount = (ev) => {
    putMemberCartBySkuIdAPI(ev.index, { count: ev.value });
  };

  // 修改选中状态-单品修改
  const onChangeSelected = (item: CartItem, checked: boolean) => {
    // 前端数据更新-是否选中取反
    const newItem = { ...item, selected: checked };
    setCartList((prev) => prev.map((v) => (v.skuId === item.skuId ? newItem : v)));
    // 后端数据更新
    putMemberCartBySkuIdAPI(item.skuId, { selected: newItem.selected });
  };

  // 计算全选状态
  const isSelectedAll = useMemo(() => {
    return cartList.length > 0 && cartList.every((v) => v.selected);
  }, [cartList]);

  // 修改选中状态-全选修改
  const onChangeSelectedAll = (checked: boolean) => {
    // 前端数据更新
    setCartList((prev) => prev.map((item) => ({ ...item, selected: checked })));
    // 后端数据更新
    putMemberCartSelectedAPI({ selected: checked });
  };

  // 计算选中单品列表
  const selectedCartList = useMemo(() => {
    return cartList.filter((v) => v.selected);
  }, [cartList]);

  // 计算选中总件数
  const selectedCartListCount = useMemo(() => {
    return selectedCartList.reduce((sum, item) => sum + item.count, 0);
  }, [selectedCartList]);

  // 计算选中总金额
  const selectedCartListMoney = useMemo(() => {
    return selectedCartList.reduce((sum, item) => sum + item.count * item.nowPrice, 0).toFixed(2);
  }, [selectedCartList]);

  // 结算按钮
  const gotoPayment = () => {
    if (selectedCartListCount === 0) {
      Taro.showToast({
        icon: 'none',
        title: '请选择商品',
      });
      return;
    }
    // 跳转到结算页
    Taro.navigateTo({ url: '/pagesOrder/create/create' });
  };

  // 渲染购物车列表
  const renderCartList = () => {
    return (
      <View className={style['cart-list']}>
        {/* 优惠提示 */}
        <View className={style['tips']}>
          <Tag type='success'>满减</Tag>
          <Text className={style['desc']}>满1件, 即可享受9折优惠</Text>
        </View>

        {/* 滑动操作分区 */}
        <View>
          {cartList.map((item) => (
            <Swipe
              key={item.skuId}
              rightAction={
                <Button
                  block
                  type='danger'
                  shape='square'
                  onClick={() => onDeleteCart(item.skuId)}
                  style={{
                    height: '100%',
                  }}
                >
                  删除
                </Button>
              }
            >
              <View className={style['goods']}>
                <Checkbox
                  checked={item.selected}
                  onChange={(val) => onChangeSelected(item, val)}
                  style={checkBoxstyle}
                />

                <Navigator
                  url={`/pages/goods/goods?id=${item.id}`}
                  hoverClass='none'
                  className={style['navigator']}
                >
                  <Image
                    mode='aspectFill'
                    className={style['picture']}
                    src={item.picture}
                  />
                  <View className={style['meta']}>
                    <View className={mergeClassNames(style['name'], 'ellipsis')}>{item.name}</View>
                    <View className={`${style['attrsText']} ${style['ellipsis']}`}>{item.attrsText}</View>
                    <View className={style['price']}>{item.nowPrice}</View>
                  </View>
                </Navigator>

                {/* 商品数量 */}
                <View className={style['count']}>
                  <InputNumber
                    defaultValue={item.count}
                    min={1}
                    max={item.stock}
                    onChange={onChangeCount}
                  />
                </View>
              </View>
            </Swipe>
          ))}
        </View>
      </View>
    );
  };

  return (
    <TRLayout
      navBar={{
        title: '购物车',
        hideArrow: true,
      }}
      body={{
        customRender: (
          <View className={style['host']}>
            <ScrollView
              enableBackToTop
              scrollY
              className={style['scroll-view']}
              // onScrollToLower={onScrolltolower}
            >
              {/* 已登录: 显示购物车 */}
              <>{renderCartList()}</>

              {/* // 未登录: 提示登录
          <View className={style['login-blank']}>
            <Text className={style['text']}>登录后可查看购物车中的商品</Text>
            <Navigator url='/pages/login/login' hoverClass='none'>
              <Button className={style['button']}>去登录</Button>
            </Navigator>
          </View> */}

              {/* 猜你喜欢 */}
              {/* <XtxGuess ref={guessRef} /> */}
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
            {showCartList && (
              <View className={style['toolbar']}>
                <Checkbox
                  checked={isSelectedAll}
                  onChange={(val) => onChangeSelectedAll(val)}
                  style={checkBoxstyle}
                >
                  全选
                </Checkbox>
                <Text className={style['text']}>合计:</Text>
                <Text className={style['amount']}>{selectedCartListMoney}</Text>
                <Button
                  type='primary'
                  onClick={gotoPayment}
                  className={style['button-grounp']}
                  disabled={selectedCartListCount === 0}
                >
                  去结算({selectedCartListCount})
                </Button>
              </View>
            )}
          </>
        ),
        style: {
          padding: '0 40rpx',
        },
      }}
    />
  );
};

export default CartPage;
