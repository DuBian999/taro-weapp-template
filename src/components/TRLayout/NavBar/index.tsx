import { ArrowLeft } from '@nutui/icons-react-taro';
import { View } from '@tarojs/components';
import { getMenuButtonBoundingClientRect, navigateBack } from '@tarojs/taro';
import style from './index.module.scss';

interface IProps {
  title: string | React.ReactNode;
  hideArrow?: boolean;
}

const CustomNavbar = ({ title, hideArrow }: IProps) => {
  // 微信-分享胶囊位置
  const { top, height, width, right } = getMenuButtonBoundingClientRect();

  // 右侧留空计算
  return (
    <View
      className={style['custom-navbar']}
      style={{
        height: `${height}px`,
        paddingTop: `${top}px`,
      }}
    >
      {/* 返回按钮 */}
      {!hideArrow && (
        <View
          className={style['arrow-left']}
          onClick={() => navigateBack()}
        >
          <ArrowLeft size={20} />
        </View>
      )}
      {/* 居中标题 */}
      <View className={style['title']}>{title}</View>
      {/* 胶囊占位区 */}
      <View
        style={{
          width: `${width}px`,
          height: `${height}px`,
          marginRight: `calc(100% - ${right}px)`,
        }}
      />
    </View>
  );
};

export default CustomNavbar;
