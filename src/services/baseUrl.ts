/**
 * 特定服务选择 baseurl
 * @param url url
 * @returns
 */
export const getUrl = (url: string): string => {
  // let BASE_URL = process.env.TARO_APP_BASE_URL as string;
  let BASE_URL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net';
  return `${BASE_URL}${url}`;
};
