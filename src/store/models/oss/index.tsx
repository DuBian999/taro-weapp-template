import { IOssConfig } from './index.type';

const initialState: IOssConfig = {
  policy: '',
  'x-oss-signature-version': '',
  'x-oss-credential': '',
  'x-oss-date': '',
  'x-oss-signature': '',
  'x-oss-security-token': '',
  success_action_status: '200',
  expiration: '',
};

/** Oss文件上传全局配置*/
export default {
  name: 'oss',
  state: initialState,
  reducers: {
    setOssConfig(state: IOssConfig, payload: IOssConfig) {
      state = payload;
      return {
        ...state,
      };
    },
  },

  effects: (dispatch) => ({
    /**
     * 登录
     * */
    async getOssConfig() {
      // const { data } = await ossGetCredentialsApi();
      const { data } = { data: {} as any };
      const payload = {
        policy: data.signMap.policy,
        'x-oss-signature-version': data.signMap['x_oss_signature_version'],
        'x-oss-credential': data.signMap['x_oss_credential'],
        'x-oss-date': data.signMap['x_oss_date'],
        'x-oss-signature': data.signMap['signature'],
        'x-oss-security-token': data.securityToken!,
        success_action_status: '200',
        expiration: data.expiration,
      };
      dispatch.oss.setOssConfig(payload);
      return data;
    },
  }),
};
