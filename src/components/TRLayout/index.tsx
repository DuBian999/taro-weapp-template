import useMenuBtnClient from '@/hooks/useMenuBtnClient';
import { ArrowLeft } from '@nutui/icons-react-taro';
import { NavBar, SafeArea } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { navigateBack } from '@tarojs/taro';
import React, { useMemo } from 'react';
import type { LayoutProps } from './index.d';
import style from './index.module.scss';

const defaultContentStyle = {
  padding: '16px',
};

const TRLayout: React.FC<LayoutProps> = ({ navBar, header, body, footer }) => {
  const { menuBtnPosition } = useMenuBtnClient();

  const { title, hideArrow, style: navBarStyle = {}, showNavBar = true } = navBar || {};
  const { style: headerContentStyle = defaultContentStyle, customRender: Header } = header || {};
  const { style: bodyContentStyle = defaultContentStyle, customRender: Body } = body || {};
  const { style: footerContentStyle = defaultContentStyle, customRender: Footer } = footer || {};

  // 导航栏基础样式适配H5和微信小程序
  const navBarBasicStyle = useMemo(() => {
    if (process.env.TARO_ENV === 'weapp') {
      return {
        '--nutui-navbar-height': `${menuBtnPosition.height + menuBtnPosition.top + 10}px`,
        paddingTop: `${menuBtnPosition.top - 10}px`,
        background: 'transparent',
      } as React.CSSProperties;
    }
    return {};
  }, [menuBtnPosition.height, menuBtnPosition.top]);

  return (
    <View
      className={style['tr-layout']}
      id='tr-layout'
    >
      <SafeArea position='top' />
      {showNavBar && (
        <NavBar
          back={hideArrow ? undefined : <ArrowLeft />}
          style={{ ...navBarBasicStyle, ...navBarStyle }}
          onBackClick={() => navigateBack()}
        >
          {title}
        </NavBar>
      )}

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
