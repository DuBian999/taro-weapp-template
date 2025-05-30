import { useEffect, useRef, useCallback } from 'react';
import type { AppDispatch, AppRootState } from '@/store';
import { IOssConfig } from '@/store/oss/index.type';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

const EXPIRATION_BUFFER = 5; // 过期缓冲时间（分钟）

// 获取全局Oss Store,当前时间与过期时间差小于5分钟时重新获取Oss最新认证信息
const useOssConfig = () => {
  const ossConfig = useSelector<AppRootState, IOssConfig>((state) => state.oss);
  const dispatch = useDispatch<AppDispatch>();
  const isRefreshing = useRef(false);

  // 计算剩余时间（使用useCallback优化）
  const getTimeRemaining = useCallback(() => {
    return dayjs(ossConfig.expiration).diff(dayjs(), 'minute');
  }, [ossConfig.expiration]);

  // 刷新配置的核心逻辑
  const refreshConfig = useCallback(async () => {
    if (isRefreshing.current) return;

    const remaining = getTimeRemaining();

    if (!ossConfig['x-oss-signature'] || remaining < EXPIRATION_BUFFER) {
      try {
        isRefreshing.current = true;
        await dispatch.oss.getOssConfig();
      } finally {
        isRefreshing.current = false;
      }
    }
  }, [dispatch.oss, getTimeRemaining, ossConfig]);

  // 定时检查逻辑
  useEffect(() => {
    // 初始化检查
    refreshConfig();
  }, [refreshConfig, getTimeRemaining]);

  return ossConfig;
};

export default useOssConfig;
