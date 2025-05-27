import { mergeClassNames } from '@/utils/common';
import { Text, View } from '@tarojs/components';
import { render, unmountComponentAtNode } from '@tarojs/react';
import { document, TaroElement } from '@tarojs/runtime';
import { getCurrentPages } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import style from './index.module.scss';

// 组件 Props
interface IProps {
  message: string;
  duration?: number;
}

// 使用 WeakMap 存储页面与容器的映射关系
const pageContainers = new WeakMap<object, TaroElement>();

const CustomToast = ({ message, duration = 2000 }: IProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) {
    return null;
  }

  return (
    <View className={mergeClassNames(style['custom-toast'], style['show'])}>
      <Text className={style['toast-message']}>{message} </Text>
    </View>
  );
};

const getPageContainer = () => {
  const currentPage = getCurrentPages().pop();
  if (!currentPage) return null;

  // 如果已经存在容器则直接返回
  if (pageContainers.has(currentPage)) {
    return pageContainers.get(currentPage);
  }

  // 创建新的容器
  const container = document.createElement('view');
  const pageElement = document.getElementById(currentPage.$taroPath);
  pageElement?.appendChild(container);

  // 监听页面卸载事件清理容器
  const originalOnUnload = currentPage.onUnload;
  currentPage.onUnload = function () {
    pageContainers.delete(currentPage);
    unmountComponentAtNode(container);
    container.remove();
    originalOnUnload?.call(this);
  };

  pageContainers.set(currentPage, container);
  return container;
};

const RenderToast = (message: string) => {
  const container = getPageContainer();
  if (!container) return;
  // 清理已有 Toast
  unmountComponentAtNode(container);
  render(
    React.createElement(CustomToast, { message, key: Date.now().toString() }),
    container,
    () => {}
  );
};

export default RenderToast;
