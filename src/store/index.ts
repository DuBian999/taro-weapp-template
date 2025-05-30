import { init, Models, RematchDispatch, RematchRootState } from '@rematch/core';
import user from './user';
import oss from './oss';

const rootModel: RootModel = { user, oss };

export interface RootModel extends Models<RootModel> {
  user: typeof user;
  oss: typeof oss;
}

const store = init({
  models: rootModel,
});
export type AppStore = typeof store;
export type AppDispatch = RematchDispatch<RootModel>;
export type AppRootState = RematchRootState<RootModel>;
export default store;
