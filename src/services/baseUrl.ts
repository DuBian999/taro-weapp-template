/**
 * 特定服务选择 baseurl
 * @param url url
 * @returns
 */
export const getUrl = (url: string): string => {
  let BASE_URL = process.env.TARO_APP_BASE_URL as string;
  if (process.env.NODE_ENV === 'development') {
    if (url.includes('biz.inspection')) {
      // BASE_URL = 'http://192.168.2.186:21113';
    } else if (url.includes('biz.document')) {
    } else if (url.includes('biz.esign')) {
      // BASE_URL = 'http://192.168.2.203:31999';
    }
  } else {
    // 生产环境
  }
  return `${BASE_URL}${url}`;
};
