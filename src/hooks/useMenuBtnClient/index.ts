import { getMenuButtonBoundingClientRect } from '@tarojs/taro';
import { useEffect, useState } from 'react';

const useMenuBtnClient = () => {
  const [menuBtnPosition, setMenuBtnPosition] = useState({
    top: 0,
    height: 0,
    width: 0,
    right: 0,
  });

  // 获取微信-分享胶囊位置
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      const { top, height, width, right } = getMenuButtonBoundingClientRect();
      setMenuBtnPosition({ top, height, width, right });
    }
  }, []);

  return { menuBtnPosition };
};

export default useMenuBtnClient;
