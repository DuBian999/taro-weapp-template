import { mergeClassNames } from '@/utils/common';
import { Text, View } from '@tarojs/components';
import { render } from '@tarojs/react';
import { document, TaroElement } from '@tarojs/runtime';
import { getCurrentPages } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import style from './index.module.scss';

let toastContainer: TaroElement | null;

// 组件 Props
interface IProps {
  message: string;
  duration?: number;
}

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

const RenderToast = (message: string) => {
  const currentPages = getCurrentPages();
  const currentPage = currentPages[currentPages.length - 1]; // 获取当前页面对象
  const path = currentPage.$taroPath;
  const pageElement = document.getElementById(path);
  if (!toastContainer) {
    toastContainer = document.createElement('view');
    pageElement!.appendChild(toastContainer);
  }
  // 通过key值强制重新挂载组件
  render(
    React.createElement(CustomToast, { message, key: Date.now().toString() }),
    toastContainer,
    () => {}
  );
};

export default RenderToast;
