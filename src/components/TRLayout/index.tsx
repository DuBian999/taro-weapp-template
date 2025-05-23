import { View } from '@tarojs/components';
import React, { ReactNode } from 'react';
import NavBar from './NavBar/index';
import style from './index.module.scss';

// Layout 组件
interface LayoutProps {
  headerContent?: ReactNode;
  bodyContent: ReactNode;
  footerContent?: ReactNode;
  title: string | ReactNode;
  showTitle?: boolean;
  contentStyle?: React.CSSProperties;
  hideArrow?: boolean;
}

const TRLayout: React.FC<LayoutProps> = ({
  headerContent,
  bodyContent,
  footerContent,
  title,
  hideArrow,
}) => {
  return (
    <View
      className={style['rt-layout']}
      id='rt-layout'
    >
      <NavBar
        title={title}
        hideArrow={hideArrow}
      />

      <View className={style['rt-layout-header']}>{headerContent}</View>
      <View className={style['rt-layout-body']}>{bodyContent}</View>
      <View className={style['rt-layout-footer']}>{footerContent}</View>
    </View>
  );
};

export default TRLayout;
