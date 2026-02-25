import TRLayout from '@/components/TRLayout';
import { ArrowRight } from '@nutui/icons-react-taro';
import { Button, Cell } from '@nutui/nutui-react-taro';
import { useDispatch } from 'react-redux';
import { navigateBack, showModal } from '@tarojs/taro';
import type { Dispatch } from '@/store';

type FillType = 'none' | 'solid' | 'outline'; // 根据 NutUI Button 的实际类型调整

interface BtnProps {
  openType?: 'openSetting' | 'feedback' | 'contact';
  fill?: FillType;
  onClick?: () => void;
  [key: string]: any;
}

export default () => {
  const dispatch = useDispatch<Dispatch>();

  const listConfig: BtnProps[][] = [
    // 第一组
    [
      {
        title: '我的收货地址',
        extra: true,
        btnProps: {
          fill: 'none',
          onClick: () => {},
        },
      },
    ],
    // 第二组
    [
      {
        title: '授权管理',
        extra: true,
        btnProps: {
          openType: 'openSetting',
          fill: 'none',
        },
      },
      {
        title: '问题管理',
        extra: true,
        btnProps: {
          openType: 'feedback',
          fill: 'none',
        },
      },
      {
        title: '联系我们',
        extra: true,
        btnProps: {
          openType: 'contact',
          fill: 'none',
        },
      },
    ],
    // 第三组
    [
      {
        title: '关于我们',
        extra: true,
        btnProps: {
          fill: 'none',
        },
      },
    ],
  ];

  const handleLoginOut = () => {
    showModal({
      content: '是否退出登录？',
      success: (res) => {
        if (res.confirm) {
          // 清理用户信息
          dispatch.member.clearMemberInfo();
          // 返回上一页
          navigateBack();
        }
      },
    });
  };

  return (
    <TRLayout
      navBar={{
        title: '设置',
      }}
      body={{
        customRender: (
          <>
            {listConfig.map((group, groupIndex) => (
              <Cell.Group key={groupIndex}>
                {group.map((item, itemIndex) => (
                  <Cell
                    key={`${groupIndex}-${itemIndex}`}
                    title={<Button {...item.btnProps}>{item.title}</Button>}
                    align='center'
                    extra={item.extra ? <ArrowRight /> : null}
                    style={{ padding: '10rpx' }}
                  />
                ))}
              </Cell.Group>
            ))}

            <Cell.Group>
              <Cell
                style={{ padding: '10rpx 0' }}
                onClick={handleLoginOut}
              >
                <Button
                  block
                  fill='none'
                >
                  退出登录
                </Button>
              </Cell>
            </Cell.Group>
          </>
        ),
      }}
    />
  );
};
