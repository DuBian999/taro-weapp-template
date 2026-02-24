import { postLoginAPI, postLoginWxMinAPI } from '@/apis/login';
import { LoginResult } from '@/types/member';

const initialState: Partial<LoginResult> = {};

export default {
  name: 'member',
  state: initialState,
  reducers: {
    setMemberInfo(state: LoginResult, payload: LoginResult) {
      return {
        ...state,
        ...payload,
      };
    },
  },

  // 修正：指定 effects 的返回类型
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
