import TRLayout from '@/components/TRLayout/index';
import { Button } from '@nutui/nutui-react-taro';

const Index = () => {
  return (
    <TRLayout
      title='首页'
      headerContent={<>headerContent</>}
      bodyContent={
        <>
          <Button type='danger'>测试仪</Button>
          <Button type='primary'>测试仪</Button>
        </>
      }
      footerContent={<>footerContent</>}
    />
  );
};

export default Index;
