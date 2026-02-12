import { ArrowLeft } from '@nutui/icons-react-taro';
import { SafeArea } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { getMenuButtonBoundingClientRect, navigateBack } from '@tarojs/taro';
import React, { ReactNode } from 'react';
import style from './index.module.scss';

interface LayoutContentProps {
  style?: React.CSSProperties;
  customRender?: ReactNode;
}

interface LayoutProps {
  navBar?: {
    style?: React.CSSProperties;
    title?: string | ReactNode;
    showTitle?: boolean;
    hideArrow?: boolean;
    customRender?: (params: { top: number; height: number; width: number; right: number }) => ReactNode;
  };
  header?: LayoutContentProps;
  body?: LayoutContentProps;
  footer?: LayoutContentProps;
}

const defaultContentStyle = {
  padding: '16px',
};

const TRLayout: React.FC<LayoutProps> = ({ navBar, header, body, footer }) => {
  // 微信-分享胶囊位置
  const { top, height, width, right } = getMenuButtonBoundingClientRect();

  const { title, hideArrow, style: navBarStyle = {}, customRender: NavBar } = navBar || {};
  const { style: headerContentStyle = defaultContentStyle, customRender: Header } = header || {};
  const { style: bodyContentStyle = defaultContentStyle, customRender: Body } = body || {};
  const { style: footerContentStyle = defaultContentStyle, customRender: Footer } = footer || {};

  return (
    <View
      className={style['tr-layout']}
      id='tr-layout'
    >
      {/* 顶部安全区域 */}
      <SafeArea position='top' />
      {
        // 自定义导航栏 或者 默认导航栏
        NavBar ? (
          NavBar({ top, height, width, right })
        ) : (
          <View
            className={style['custom-navbar']}
            style={{
              height: `${height}px`,
              paddingTop: `${top}px`,
              ...navBarStyle,
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
        )
      }

      {/* 头部内容 */}
      {Header && (
        <View
          className={style['tr-layout-header']}
          style={headerContentStyle}
        >
          {Header}
        </View>
      )}

      {/* 主体内容区域 */}
      <View
        className={style['tr-layout-body']}
        style={bodyContentStyle}
      >
        {Body}
      </View>

      {/* 底部内容 */}
      {Footer && (
        <View
          className={style['tr-layout-footer']}
          style={footerContentStyle}
        >
          {Footer}
        </View>
      )}

      <SafeArea position='bottom' />
    </View>
  );
};

export default TRLayout;
