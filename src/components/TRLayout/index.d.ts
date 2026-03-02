import type { ReactNode } from 'react';

// 定义暴露给外部的类型
export interface TRLayoutRef {
  menuBtnPosition: {
    top: number;
    height: number;
    width: number;
    right: number;
  };
}

export interface LayoutContentProps {
  style?: React.CSSProperties;
  customRender?: ReactNode;
}

export interface LayoutProps {
  navBar?: {
    title?: string | ReactNode;
    style?: React.CSSProperties;
    showNavBar?: boolean;
    hideArrow?: boolean;
  };
  header?: LayoutContentProps;
  body?: LayoutContentProps;
  footer?: LayoutContentProps;
}
