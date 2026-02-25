import { postLoginAPI, postLoginWxMinAPI } from '@/apis/login';
import { LoginResult } from '@/types/member';
import { setStorageSync, clearStorageSync } from '@tarojs/taro';

const initialState: Partial<LoginResult> = {};

export default {
  name: 'member',
  state: initialState,
  reducers: {
    // 设置会员信息
    setMemberInfo(state: Partial<LoginResult>, payload: Partial<LoginResult>) {
      setStorageSync('Authorization', payload.token);
      return {
        ...state,
        ...payload,
      };
    },
    // 清除会员信息
    clearMemberInfo() {
      clearStorageSync();
      return {};
    },
  },

  effects: (dispatch) => ({
    // 手机快捷登录
    async handleSimpleLogin(payload: { ev: any; code: string }) {
      const { ev, code } = payload;
      const { encryptedData, iv } = ev.detail;
      const res = await postLoginWxMinAPI({ code, encryptedData, iv });
      dispatch.member.setMemberInfo(res.result);
    },

    // 账号登录
    async handleAccountLogin(payload: { account: string; password: string }) {
      const { account, password } = payload;
      const res = await postLoginAPI({ account, password });
      dispatch.member.setMemberInfo(res.result);
      return Promise.resolve(res.result);
    },
  }),
};
