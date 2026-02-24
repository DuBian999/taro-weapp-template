import type { RootState } from '@/store';
import { useSelector } from 'react-redux';

const useMemberStore = () => {
  // 读取状态（对应 Pinia 的 profile）
  const member = useSelector((state: RootState) => state.member);
  const isLogin = Boolean(member.token);
  return {
    isLogin,
    member,
  };
};

export default useMemberStore;
