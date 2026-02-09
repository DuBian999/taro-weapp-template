import Taro from '@tarojs/taro';
import { getUrl } from './baseUrl';
import interceptors from './interceptors';

interceptors.forEach((i) => Taro.addInterceptor(i));

type Data<T> = {
  code: string;
  msg: string;
  result: T;
};

class Http {
  request<T>(params: Taro.request.Option): Promise<Data<T>> {
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
    return Taro.request(option) as unknown as Promise<Data<T>>;
  }
}

const { request: http } = new Http();
export default Http;
export { http };
