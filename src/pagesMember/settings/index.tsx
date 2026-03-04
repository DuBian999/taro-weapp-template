import TRLayout from '@/components/TRLayout';
import { ArrowRight } from '@nutui/icons-react-taro';
import { Button, Cell } from '@nutui/nutui-react-taro';
import { useDispatch } from 'react-redux';
import { navigateBack, showModal, navigateTo, openSetting, pxTransform } from '@tarojs/taro';
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
        btnProps: {
          fill: 'none',
          onClick: () => {
            navigateTo({
              url: '/pagesMember/address/index',
            });
          },
        },
      },
    ],
    // 第二组
    [
      {
        title: '授权管理',
        btnProps: {
          openType: 'openSetting',
          fill: 'none',
        },
      },
      {
        title: '问题管理',
        btnProps: {
          openType: 'feedback',
          fill: 'none',
        },
      },
      {
        title: '联系我们',
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
                    title={<Button fill='none'>{item.title}</Button>}
                    align='center'
                    extra={
                      <Button {...item.btnProps}>
                        <ArrowRight />
                      </Button>
                    }
                    style={{ padding: pxTransform(10) }}
                  />
                ))}
              </Cell.Group>
            ))}

            <Cell.Group>
              <Cell
                style={{ padding: `${pxTransform(10)}` }}
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
