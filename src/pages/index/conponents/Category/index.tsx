import { CategoryItem } from '@/types';
import { Grid } from '@nutui/nutui-react-taro';
import { Image } from '@tarojs/components';
import { pxTransform } from '@tarojs/taro';

const Category: React.FC<{ categoryList: CategoryItem[] }> = ({ categoryList }) => {
  return (
    <Grid
      columns={categoryList.length / 2}
      style={
        {
          '--nutui-grid-item-content-padding': '0rpx',
          '--nutui-grid-item-text-margin': '0rpx',
        } as React.CSSProperties
      }
    >
      {categoryList.map((item) => (
        <Grid.Item
          key={item.id}
          text={item.name}
        >
          <Image
            src={item.icon}
            style={{
              width: pxTransform(100),
              height: pxTransform(100),
            }}
          />
        </Grid.Item>
      ))}
    </Grid>
  );
};
export default Category;
