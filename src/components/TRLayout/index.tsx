import { SafeArea } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import React, { ReactNode } from 'react';
import NavBar from './NavBar/index';
import style from './index.module.scss';

// Layout 组件
interface LayoutProps {
  headerContent?: ReactNode;
  bodyContent: ReactNode;
  footerContent?: ReactNode;
  title?: string | ReactNode;
  showTitle?: boolean;
  hideArrow?: boolean;

  headerContentStyle?: React.CSSProperties;
  bodyContentStyle?: React.CSSProperties;
  footerContentStyle?: React.CSSProperties;
}

const TRLayout: React.FC<LayoutProps> = ({
  headerContent,
  bodyContent,
  footerContent,
  title,
  hideArrow,
  headerContentStyle = {
    padding: '16px',
  },
  bodyContentStyle = {
    padding: '16px',
  },
  footerContentStyle = {
    padding: '16px',
  },
}) => {
  return (
    <View
      className={style['tr-layout']}
      id='tr-layout'
    >
      {/* 顶部安全区域 */}
      <SafeArea position='top' />

      {/* 导航栏 */}
      <NavBar
        title={title}
        hideArrow={hideArrow}
      />

      {/* 头部内容 */}
      {headerContent && (
        <View
          className={style['tr-layout-header']}
          style={headerContentStyle}
        >
          {headerContent}
        </View>
      )}

      {/* 主体内容区域 */}
      <View
        className={style['tr-layout-body']}
        style={bodyContentStyle}
      >
        {bodyContent}
      </View>

      {/* 底部内容 */}
      {footerContent && (
        <View
          className={style['tr-layout-footer']}
          style={footerContentStyle}
        >
          {footerContent}
        </View>
      )}

      <SafeArea position='bottom' />
    </View>
  );
};

export default TRLayout;
