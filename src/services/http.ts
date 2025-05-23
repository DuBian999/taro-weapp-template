import Taro from '@tarojs/taro';
import interceptors from './interceptors';
import { getUrl } from './baseUrl';

interceptors.forEach((i) => Taro.addInterceptor(i));

class Http {
  request(params: Taro.request.Option) {
    const { url } = params;
    const option = {
      ...params,
      header: {
        'content-type': params.header?.contentType || 'application/json',
        Authorization: Taro.getStorageSync('Authorization'),
        traceId: `${Date.now()}${Math.random()}`,
      },
      url: getUrl(url),
    };
    return Taro.request(option);
  }
}

const { request } = new Http();
export default Http;
export { request };
