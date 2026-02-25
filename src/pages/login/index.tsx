import { postLoginAPI, postLoginWxMinAPI } from '@/apis/login';
import TRLayout from '@/components/TRLayout';
import type { Dispatch } from '@/store';
import { LoginResult } from '@/types/member';
import { Button, Divider, Input, Row } from '@nutui/nutui-react-taro';
import { Image, Text, View } from '@tarojs/components';
import { login, navigateBack, showToast, setStorageSync } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';

const Login: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const [account, setAccount] = useState('13123456789');
  const [password, setPassword] = useState('123456');
  const [code, setCode] = useState('');

  const handleLoginSuccess = () => {
    // 成功提示
    showToast({ icon: 'success', title: '登录成功' });
    setTimeout(() => {
      // 页面跳转
      navigateBack();
    }, 500);
  };

  // 账号密码登录
  const handleLogin = async () => {
    if (!account || !password) {
      showToast({
        title: '请输入用户名和密码',
        icon: 'none',
      });
      return;
    }
    await dispatch.member.handleAccountLogin({ account, password });
    handleLoginSuccess();
  };

  // 手机快捷登录
  const handleSimpleLogin = async (ev) => {
    const { encryptedData, iv } = ev.detail;
    await postLoginWxMinAPI({ code, encryptedData, iv });
    handleLoginSuccess();
  };

  useEffect(() => {
    login({}).then((res) => {
      setCode(res.code);
    });
  }, []);

  return (
    <>
      <TRLayout
        navBar={{
          title: '登录',
        }}
        body={{
          customRender: (
            <View>
              {/* Logo 和标题 */}
              <View className={styles.header}>
                <Image
                  className={styles.logoPlaceholder}
                  src='https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png'
                />
              </View>

              {/* 表单区域 */}
              <View>
                <Input
                  className={styles.input}
                  placeholder='请输入用户名/手机号码'
                  type='text'
                  clearable
                  value={account}
                  onChange={setAccount}
                />
                <Input
                  className={styles.input}
                  placeholder='请输入密码'
                  type='password'
                  clearable
                  value={password}
                  onChange={setPassword}
                />

                {/* 登录按钮 */}
                <Button
                  type='primary'
                  size='large'
                  block
                  className='mb-100'
                  onClick={handleLogin}
                >
                  登录
                </Button>

                <Divider>其他方式登录</Divider>

                <View>
                  <Row justify='center'>
                    <Text
                      className='icon icon-phone'
                      style={{
                        fontSize: '60rpx',
                      }}
                    />
                  </Row>

                  <Row justify='center'>
                    <Button
                      fill='none'
                      openType='getPhoneNumber'
                      onClick={handleSimpleLogin}
                    >
                      快捷登录
                    </Button>
                  </Row>
                </View>
              </View>
            </View>
          ),
        }}
        footer={{
          customRender: <Row justify='center'>登录/注册即视为你同意《服务条款》</Row>,
          style: {
            padding: '20rpx 0',
            backgroundColor: 'transparent',
          },
        }}
      />
    </>
  );
};

export default Login;
