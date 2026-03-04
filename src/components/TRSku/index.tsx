import { mergeClassNames } from '@/utils/common';
import { Button, InputNumber, ConfigProvider } from '@nutui/nutui-react-taro';
import { Image, ScrollView, Text, View } from '@tarojs/components';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';

// ---------- 类型定义 ----------
/** 商品规格名称的集合 */
export interface SkuPopupSpecItem {
  name: string;
  list: { name: string }[];
}

/** 商品SKU列表 */
export interface SkuPopupSkuItem {
  _id: string;
  goods_id: string;
  goods_name: string;
  image: string;
  /** SKU 价格 * 100, 注意：需要乘以 100 */
  price: number;
  /** SKU 规格组成, 注意：需要与 spec_list 数组顺序对应 */
  sku_name_arr: string[];
  stock: number;
}

/** 商品信息本地数据源 */
export interface SkuPopupLocaldata {
  _id: string;
  name: string;
  goods_thumb: string;
  spec_list: SkuPopupSpecItem[];
  sku_list: SkuPopupSkuItem[];
}

/** 当前选择的sku数据（事件参数） */
export interface SkuPopupEvent extends SkuPopupSkuItem {
  buy_num: number;
}

/** SKU弹出层属性 */
export interface SkuPopupProps {
  /** 关闭弹出层 */
  onClose?: () => void;
  /** 商品信息本地数据源 */
  localdata: SkuPopupLocaldata;
  /** 按钮模式 1:都显示 2:只显示购物车 3:只显示立即购买 */
  mode?: 1 | 2 | 3;
  /** 该商品已抢完时的按钮文字 */
  noStockText?: string;
  /** 库存文字 */
  stockText?: string;
  /** 点击遮罩是否关闭组件 */
  maskCloseAble?: boolean;
  /** 顶部圆角值 */
  borderRadius?: string | number;
  /** 最小购买数量 */
  minBuyNum?: number;
  /** 最大购买数量 */
  maxBuyNum?: number;
  /** 每次点击后的数量 */
  stepBuyNum?: number;
  /** 是否只能输入 step 的倍数 */
  stepStrictly?: boolean;
  /** 是否隐藏库存的显示 */
  hideStock?: boolean;
  /** 主题风格（可自行扩展样式） */
  theme?: 'default' | 'red-black' | 'black-white' | 'coffee' | 'green';
  /** 默认金额会除以100（即100=1元），若设置为0，则不会除以100（即1=1元） */
  amountType?: 1 | 0;
  /** 自定义获取商品信息的函数（已知支付宝不支持，支付宝请改用localdata属性） */
  customAction?: () => void;
  /** 是否显示右上角关闭按钮 */
  showClose?: boolean;
  /** 关闭按钮的图片地址 */
  closeImage?: string;
  /** 价格的字体颜色 */
  priceColor?: string;
  /** 立即购买 - 按钮的文字 */
  buyNowText?: string;
  /** 立即购买 - 按钮的字体颜色 */
  buyNowColor?: string;
  /** 立即购买 - 按钮的背景颜色 */
  buyNowBackgroundColor?: string;
  /** 加入购物车 - 按钮的文字 */
  addCartText?: string;
  /** 加入购物车 - 按钮的字体颜色 */
  addCartColor?: string;
  /** 加入购物车 - 按钮的背景颜色 */
  addCartBackgroundColor?: string;
  /** 商品缩略图背景颜色 */
  goodsThumbBackgroundColor?: string;
  /** 样式 - 不可点击时,按钮的样式 */
  disableStyle?: React.CSSProperties;
  /** 样式 - 按钮点击时的样式 */
  activedStyle?: React.CSSProperties;
  /** 样式 - 按钮常态的样式 */
  btnStyle?: React.CSSProperties;
  /** 字段名 - 商品表id的字段名 */
  goodsIdName?: string;
  /** 字段名 - sku表id的字段名 */
  skuIdName?: string;
  /** 字段名 - 商品对应的sku列表的字段名 */
  skuListName?: string;
  /** 字段名 - 商品规格名称的字段名 */
  specListName?: string;
  /** 字段名 - sku库存的字段名 */
  stockName?: string;
  /** 字段名 - sku组合路径的字段名 */
  skuArrName?: string;
  /** 字段名 - 商品缩略图字段名(未选择sku时) */
  goodsThumbName?: string;
  /** 被选中的值（用于外部控制默认选中） */
  selectArr?: string[];

  /** 打开弹出层 */
  onOpen?: () => void;
  /** 点击加入购物车时（需选择完SKU才会触发）*/
  onAddCart?: (event: SkuPopupEvent) => void;
  /** 点击立即购买时（需选择完SKU才会触发）*/
  onBuyNow?: (event: SkuPopupEvent) => void;
}

// ---------- 组件 ----------
const SkuPopup: React.FC<SkuPopupProps> = (props) => {
  const {
    onClose,
    localdata,
    mode = 1,
    noStockText = '该商品已抢完',
    stockText = '库存',
    minBuyNum = 1,
    maxBuyNum = 99999,
    stepBuyNum = 1,
    hideStock = false,
    amountType = 1,
    showClose = false,
    closeImage,
    priceColor = '#fa2c19',
    buyNowText = '立即购买',
    addCartText = '加入购物车',
    goodsThumbBackgroundColor = '#f5f5f5',
    disableStyle,
    activedStyle,
    btnStyle,
    stockName = 'stock',
    skuArrName = 'sku_name_arr',
    goodsThumbName = 'goods_thumb',
    selectArr = [],
    onAddCart,
    onBuyNow,
  } = props;

  // 内部状态：选中的规格索引（用二维数组表示：第一维是规格组索引，第二维是选项索引）
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  // 购买数量
  const [buyNum, setBuyNum] = useState(minBuyNum);
  // 当前选中的SKU对象
  const [currentSku, setCurrentSku] = useState<SkuPopupSkuItem | null>(null);

  // 当localdata变化时重置选中状态
  useEffect(() => {
    // 如果有外部传入的 selectArr，尝试匹配
    if (selectArr.length > 0 && localdata?.spec_list.length === selectArr.length) {
      const indexes = selectArr.map((val, groupIndex) => {
        // 在当前规格组的 list 中查找匹配的选项
        const optionIndex = localdata?.spec_list[groupIndex].list.findIndex((option) => option.name === val);
        // 如果找不到，返回0（默认选第一个）
        return optionIndex !== -1 ? optionIndex : 0;
      });
      setSelectedIndexes(indexes);
    } else {
      // 默认全选第一个选项
      const initial = localdata?.spec_list?.map(() => 0) || [];
      setSelectedIndexes(initial);
    }
  }, [localdata?.spec_list, selectArr]);

  // 根据选中的规格索引，查找匹配的SKU
  useEffect(() => {
    if (!localdata?.sku_list || !selectedIndexes.length) {
      setCurrentSku(null);
      return;
    }
    // 构建选中的规格名称数组
    const selectedSpecNames = localdata.spec_list.map((spec, idx) => {
      const optionIndex = selectedIndexes[idx];
      return spec.list[optionIndex]?.name;
    });
    // 在 sku_list 中查找完全匹配的项
    const matched = localdata.sku_list.find((sku) => {
      return sku[skuArrName].every((name, i) => name === selectedSpecNames[i]);
    });
    setCurrentSku(matched || null);
    // 重置购买数量为最小值
    setBuyNum(minBuyNum);
  }, [selectedIndexes, localdata, skuArrName, minBuyNum]);

  // 处理规格点击
  const handleSpecClick = (specIndex: number, optionIndex: number) => {
    setSelectedIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[specIndex] = optionIndex;
      return newIndexes;
    });
  };

  // 判断规格选项是否可点击（根据库存逻辑，通常只要存在对应的SKU即可点击，这里简化）
  const isOptionAvailable = (specIndex: number, optionIndex: number): boolean => {
    // 可以基于现有选择，判断选择该选项后是否有库存 > 0 的SKU
    // 这里暂不实现复杂联动，直接返回 true
    return true;
  };

  // 计算价格显示
  const displayPrice = useMemo(() => {
    if (currentSku) {
      const price = amountType === 1 ? currentSku.price / 100 : currentSku.price;
      return price.toFixed(2);
    }
    // 无选中SKU时，显示商品默认价格？可以从localdata中取第一个SKU的价格
    if (localdata?.sku_list?.length) {
      const price = amountType === 1 ? localdata.sku_list[0].price / 100 : localdata.sku_list[0].price;
      return price.toFixed(2);
    }
    return '0.00';
  }, [currentSku, localdata, amountType]);

  // 库存显示
  const stock = currentSku?.[stockName] || 0;

  // 商品图片
  const goodsImage = currentSku?.image || localdata?.[goodsThumbName] || '';

  // 判断是否可以选择（是否有库存）
  const canBuy = currentSku && stock > 0;

  // 处理加入购物车
  const handleAddCart = () => {
    if (!canBuy || !onAddCart) return;
    onAddCart({
      ...currentSku!,
      buy_num: buyNum,
    });
  };

  // 处理立即购买
  const handleBuyNow = () => {
    if (!canBuy || !onBuyNow) return;
    onBuyNow({
      ...currentSku!,
      buy_num: buyNum,
    });
  };

  // 渲染规格选项
  const renderSpecs = () => {
    if (!localdata?.spec_list) return null;
    return localdata.spec_list.map((spec, specIdx) => (
      <View
        key={specIdx}
        className={styles.specGroup}
      >
        <Text className={styles.specName}>{spec.name}</Text>
        <View className={styles.options}>
          {spec.list.map((option, optIdx) => {
            const selected = selectedIndexes[specIdx] === optIdx;
            const available = isOptionAvailable(specIdx, optIdx);
            return (
              <View
                key={optIdx}
                className={mergeClassNames(
                  styles.option,
                  selected ? styles.selected : '',
                  !available ? styles.disabled : ''
                )}
                onClick={() => available && handleSpecClick(specIdx, optIdx)}
                style={selected ? activedStyle : btnStyle}
              >
                <Text>{option.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    ));
  };

  // 渲染底部按钮
  const renderButtons = () => {
    if (!canBuy) {
      return (
        <Button
          block
          disabled
          style={disableStyle}
        >
          {noStockText}
        </Button>
      );
    }

    const buttons: React.ReactNode[] = [
      <Button
        key='addCart'
        type='primary'
        block
        onClick={handleAddCart}
      >
        选择
      </Button>,
    ];
    // if (mode === 1 || mode === 2) {
    //   buttons.push(
    //     <Button
    //       key='addCart'
    //       block={mode === 2}
    //       type='primary'
    //       style={{
    //         marginRight: mode === 1 ? '10px' : 0,
    //         flex: mode === 1 ? 1 : 'none',
    //       }}
    //       onClick={handleAddCart}
    //     >
    //       {addCartText}
    //     </Button>
    //   );
    // }
    // if (mode === 1 || mode === 3) {
    //   buttons.push(
    //     <Button
    //       key='buyNow'
    //       block={mode === 3}
    //       type='primary'
    //       style={{
    //         flex: mode === 1 ? 1 : 'none',
    //       }}
    //       onClick={handleBuyNow}
    //     >
    //       {buyNowText}
    //     </Button>
    //   );
    // }
    return <View className={styles.buttonGroup}>{buttons}</View>;
  };

  return (
    <View className={styles.skuPopup}>
      {/* 头部 - 商品信息 */}
      <View className={styles.header}>
        <View
          className={styles.thumb}
          style={{ backgroundColor: goodsThumbBackgroundColor }}
        >
          <Image
            src={goodsImage}
            mode='aspectFill'
          />
        </View>
        <View className={styles.info}>
          <Text
            className={styles.price}
            style={{ color: priceColor }}
          >
            ¥ {displayPrice}
          </Text>
          {!hideStock && (
            <Text className={styles.stock}>
              {stockText}：{stock}
            </Text>
          )}
        </View>
        {showClose && (
          <View
            className={styles.close}
            onClick={onClose}
          >
            {closeImage ? (
              <Image
                src={closeImage}
                mode='aspectFit'
              />
            ) : (
              <Text className={styles.closeIcon}>×</Text>
            )}
          </View>
        )}
      </View>

      {/* 规格列表 */}
      <ScrollView
        scrollY
        className={styles.specs}
      >
        {renderSpecs()}
      </ScrollView>

      {/* 数量选择 */}
      <View className={styles.quantity}>
        <Text className={styles.label}>数量</Text>

        <ConfigProvider
          theme={{
            nutuiInputnumberButtonWidth: '32px',
            nutuiInputnumberButtonHeight: '32px',
            nutuiInputnumberButtonBorderRadius: '2px',
            nutuiInputnumberButtonBackgroundColor: `#f4f4f4`,
            nutuiInputnumberInputHeight: '32px',
            nutuiInputnumberInputMargin: '0 2px',
          }}
        >
          <InputNumber
            min={minBuyNum}
            max={maxBuyNum}
            step={stepBuyNum}
            value={buyNum}
            onChange={(val) => setBuyNum(val as number)}
            disabled={!canBuy}
            // stepStrictly={stepStrictly}
          />
        </ConfigProvider>
      </View>

      {/* 底部按钮 */}
      {renderButtons()}
    </View>
  );
};

export default SkuPopup;
