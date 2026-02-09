# TRLayout 组件文档

## 概述

TRLayout 是一个基于 Taro 的自定义布局组件，提供了完整的页面布局解决方案，包括导航栏、头部、主体和底部内容区域。

## 类型定义

### LayoutContentProps

基础内容区域属性接口。

```typescript
interface LayoutContentProps {
  style?: React.CSSProperties;
  customRender?: ReactNode;
}
```

| 属性         | 类型                | 必填 | 默认值 | 说明           |
| ------------ | ------------------- | ---- | ------ | -------------- |
| style        | React.CSSProperties | 否   | -      | 自定义样式     |
| customRender | ReactNode           | 否   | -      | 自定义渲染内容 |

### LayoutProps

TRLayout 组件的主属性接口。

```typescript
interface LayoutProps {
  navBar: LayoutContentProps & {
    title?: string | ReactNode;
    showTitle?: boolean;
    hideArrow?: boolean;
    customRender?: (params: { top: number; height: number; width: number; right: number }) => ReactNode;
  };
  header: LayoutContentProps;
  body: LayoutContentProps;
  footer: LayoutContentProps;
}
```

#### navBar 属性

导航栏配置，继承自 `LayoutContentProps` 并扩展以下属性：

| 属性         | 类型                                                                                 | 必填 | 默认值 | 说明                                       |
| ------------ | ------------------------------------------------------------------------------------ | ---- | ------ | ------------------------------------------ |
| title        | string \| ReactNode                                                                  | 否   | -      | 导航栏标题                                 |
| showTitle    | boolean                                                                              | 否   | -      | 是否显示标题                               |
| hideArrow    | boolean                                                                              | 否   | -      | 是否隐藏返回箭头                           |
| customRender | (params: { top: number; height: number; width: number; right: number }) => ReactNode | 否   | -      | 自定义导航栏渲染函数，接收胶囊按钮位置参数 |

#### header 属性

头部内容区域配置，继承自 `LayoutContentProps`。

#### body 属性

主体内容区域配置，继承自 `LayoutContentProps`。

#### footer 属性

底部内容区域配置，继承自 `LayoutContentProps`。

## 使用示例

### 基础用法

```tsx
import TRLayout from '@/components/TRLayout/index';
import { View, Text } from '@tarojs/components';

const BasicExample = () => (
  <TRLayout
    navBar={{
      title: '页面标题',
      hideArrow: false,
    }}
    header={{
      customRender: <View>头部内容</View>,
    }}
    body={{
      customRender: <View>主体内容</View>,
    }}
    footer={{
      customRender: <View>底部内容</View>,
    }}
  />
);
```

### 自定义导航栏

使用 `customRender` 函数自定义导航栏，可以获取胶囊按钮的位置参数：

```tsx
const CustomNavBarExample = () => (
  <TRLayout
    navBar={{
      customRender: ({ top, height, width, right }) => (
        <View
          style={{
            height: `${height}px`,
            paddingTop: `${top}px`,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>返回</Text>
          <Text>自定义标题</Text>
          <View style={{ width: `${width}px` }} />
        </View>
      ),
    }}
    body={{
      customRender: <View>主体内容</View>,
    }}
  />
);
```

### 自定义样式

```tsx
const StyledExample = () => (
  <TRLayout
    navBar={{
      title: '样式示例',
      style: {
        backgroundColor: '#1890ff',
      },
    }}
    body={{
      style: {
        padding: '24px',
        backgroundColor: '#f5f5f5',
      },
      customRender: <View>主体内容</View>,
    }}
    footer={{
      style: {
        padding: '12px',
        backgroundColor: '#fff',
      },
      customRender: <View>底部内容</View>,
    }}
  />
);
```

## 功能特性

### 1. 安全区域适配

组件自动处理顶部和底部的安全区域，使用 `SafeArea` 组件确保内容不被系统 UI 遮挡。

### 2. 导航栏自定义

- 支持默认导航栏，包含返回按钮、标题和胶囊占位区
- 支持完全自定义导航栏，通过 `customRender` 函数接收胶囊按钮位置参数
- 可控制返回箭头的显示与隐藏

### 3. 灵活的内容区域

- 支持头部、主体、底部三个内容区域
- 每个区域都支持自定义样式和自定义渲染
- 默认提供统一的内边距样式

### 4. 胶囊按钮适配

自动获取微信小程序胶囊按钮的位置信息（`top`、`height`、`width`、`right`），确保导航栏与系统 UI 完美对齐。

## 注意事项

1. **customRender 优先级**：当 `customRender` 存在时，会忽略默认的导航栏渲染逻辑
2. **胶囊按钮参数**：自定义导航栏的 `customRender` 函数接收的参数来自 `getMenuButtonBoundingClientRect()`，确保在小程序环境中正常工作
3. **样式继承**：每个区域的 `style` 属性会与默认样式合并，可以覆盖默认样式
4. **响应式**：组件会根据胶囊按钮的实际位置自动调整布局

## 类型参数说明

### 胶囊按钮位置参数

`customRender` 函数接收的参数对象包含以下属性：

| 参数   | 类型   | 说明                             |
| ------ | ------ | -------------------------------- |
| top    | number | 胶囊按钮上边界距离屏幕顶部的距离 |
| height | number | 胶囊按钮的高度                   |
| width  | number | 胶囊按钮的宽度                   |
| right  | number | 胶囊按钮右边界距离屏幕右侧的距离 |

这些参数可以用于精确计算导航栏的高度、内边距和布局，确保自定义导航栏与系统 UI 完美对齐。
