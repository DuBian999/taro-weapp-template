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
  contentStyle?: React.CSSProperties;
  hideArrow?: boolean;
  headerPadding?: string;
  bodyPadding?: string;
  footerPadding?: string;
}

const TRLayout: React.FC<LayoutProps> = ({
  headerContent,
  bodyContent,
  footerContent,
  title,
  hideArrow,
  headerPadding = '16px',
  bodyPadding = '16px',
  footerPadding = '16px',
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
          style={{
            padding: headerPadding,
          }}
        >
          {headerContent}
        </View>
      )}

      {/* 主体内容区域 */}
      <View
        className={style['tr-layout-body']}
        style={{
          padding: bodyPadding,
        }}
      >
        {bodyContent}
      </View>

      {/* 底部内容 */}
      {footerContent && (
        <View
          className={style['tr-layout-footer']}
          style={{
            padding: footerPadding,
          }}
        >
          {footerContent}
          <SafeArea position='bottom' />
        </View>
      )}

      {/* 如果没有底部内容，确保底部安全区域仍存在 */}
      {!footerContent && <SafeArea position='bottom' />}
    </View>
  );
};

export default TRLayout;
