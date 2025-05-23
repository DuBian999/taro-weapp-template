import RenderToast from '@/components/TRToast';
import { pageToLogin } from '@/utils/common';
import Taro from '@tarojs/taro';
import { HTTP_STATUS } from './config';

// 原子状态管理
let requestQueue = 0;
let loadingShown = false;

// 增强型队列操作
const atomicUpdateQueue = (delta: number) => {
  requestQueue = Math.max(requestQueue + delta, 0);
  console.debug(`[Queue] Current: ${requestQueue}`); // 调试日志
};

// 同步状态控制器
const syncLoadingImmediately = () => {
  // 需要显示 Loading 的条件
  if (requestQueue > 0 && !loadingShown) {
    Taro.showLoading({ title: '加载中', mask: true });
    loadingShown = true;
  } else if (requestQueue === 0 && loadingShown) {
    // 需要隐藏 Loading 的条件
    Taro.hideLoading();
    loadingShown = false;
  }
};

// 处理鉴权
const handleUnauthorizedAccess = (message: string) => {
  Taro.setStorageSync('Authorization', '');
  pageToLogin();
  return Promise.reject(message);
};

// 请求拦截
const customInterceptor = (chain: Taro.Chain) => {
  const requestParams = chain.requestParams;

  // 入队操作
  atomicUpdateQueue(1);
  syncLoadingImmediately();

  return chain
    .proceed(requestParams)
    .then((res) => {
      const { statusCode, data } = res;

      switch (statusCode) {
        case HTTP_STATUS.NOT_FOUND:
          return Promise.reject('请求资源不存在');

        case HTTP_STATUS.BAD_GATEWAY:
          return Promise.reject('服务端出现了问题');

        case HTTP_STATUS.FORBIDDEN:
          return handleUnauthorizedAccess('没有权限访问');

        case HTTP_STATUS.AUTHENTICATE:
          return handleUnauthorizedAccess('您的登录信息出现异常,请重新登录');

        case HTTP_STATUS.SERVER_ERROR:
          return Promise.reject('服务器异常');

        case HTTP_STATUS.SUCCESS:
          const resType = Object.prototype.toString.call(data);
          if (resType === '[object ArrayBuffer]') {
            return data;
          }
          if (!data.success) {
            return Promise.reject(data.errMessage);
          }
          return data;

        default:
          return Promise.reject('未知错误');
      }
    })
    .catch((error: string) => {
      RenderToast(error || '系统错误');
      // 错误时强制同步状态
      if (loadingShown) {
        atomicUpdateQueue(-requestQueue); // 清空当前异常队列
        syncLoadingImmediately();
      }
      return Promise.reject(error);
    })
    .finally(() => {
      // 出队操作
      atomicUpdateQueue(-1);
      syncLoadingImmediately();
    });
};

const interceptors = [customInterceptor];

export default interceptors;
