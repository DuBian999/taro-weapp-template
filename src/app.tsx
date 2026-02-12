import store from '@/store';
import '@/styles/index.scss';
import { useDidHide, useDidShow } from '@tarojs/taro';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

const App = (props) => {
  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return <Provider store={store}>{props.children}</Provider>;
};

export default App;
