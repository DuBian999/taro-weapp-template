import Taro from '@tarojs/taro';

/*获取当前页url*/
export const getCurrentPageUrl = () => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const url = currentPage.route;
  return url;
};

/*跳转至登录页*/
export const pageToLogin = () => {
  const path = getCurrentPageUrl();
  if (!path?.includes('login')) {
    Taro.navigateTo({
      url: '/pages/login/index',
    });
  }
};
// 合并css样式名
export const mergeClassNames = (...classNames: string[]) => {
  return classNames.join(' ');
};
