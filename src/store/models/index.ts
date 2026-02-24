// store/models/index.ts
import member from './member';
import oss from './oss';

// 组合 models 对象
const models = {
  member,
  oss,
};

// 从 models 对象直接推导出 RootModel 类型
export type RootModel = typeof models;

export default models;
