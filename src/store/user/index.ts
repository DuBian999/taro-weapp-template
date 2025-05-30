import { AppDispatch } from '../../store';
import type { IUserType, UserCacheCO } from './index.type';

const initialState: IUserType = { userInfo: {} };

export default {
  name: 'user',
  state: initialState,
  reducers: {
    logout(state: IUserType) {
      state.userInfo = {};
    },
    setUserInfo(state: IUserType, payload: UserCacheCO) {
      state.userInfo = payload;
      return {
        ...state,
      };
    },
  },

  effects: (dispatch: AppDispatch) => ({
    /**
     * 登录
     * */
    async getUserInfo() {
      // const { data } = await b2UserGetMySelfApi();
      // dispatch({ type: 'user/setUserInfo', payload: data });
      // return data;
    },
  }),
};
