import TRLayout from '@/components/TRLayout/index';
import useConfirm from '@/hooks/useConfirm';
import { Button, Col, Row } from '@nutui/nutui-react-taro';

export default () => {
  const { DialogContext, openDialog } = useConfirm();
  return (
    <>
      <TRLayout
        body={{
          customRender: (
            <Row>
              <Col span='8'>
                <Button
                  type='danger'
                  onClick={() => openDialog('confirm', () => {})}
                >
                  测试同步
                </Button>
              </Col>

              <Col span='8'>
                <Button
                  type='primary'
                  onClick={() =>
                    openDialog('delete', async () => {
                      await new Promise((resolve) => setTimeout(resolve, 3000)); // 模拟异步操作
                    })
                  }
                >
                  测试异步
                </Button>
              </Col>
            </Row>
          ),
        }}
        navBar={{}}
        header={{}}
        footer={{}}
      />
      {DialogContext}
    </>
  );
};
