# taro-weapp-template

基于taro+nutui+webpack构建的小程序应用模板


## 项目结构

```
lib/
├── config /          # 打包文件配置
├── src/              # 项目主文件
├──├── components/       # 通用组件
├──├── hooks/            # hooks
├──├── pages/            # 页面文件
├──├── services/         # services
├──├── store/            # 全局状态
├──├── styles/           # 样式文件
├──├── utils/            # 工具函数
├──├── app.config.ts     # app配置文件
├──├── app.tsx           # 页面入口
├── .env.development     # 开发环境变量
├── .env.production      # 生产环境变量
├── .env.test            # 测试环境变量
└── 
```

### 各目录说明

- **config/**: 打包文件配置
- **src/components/**: 通用组件
- **src/hooks/**: hooks
- **src/pages/**: 页面文件
- **src/services/**: 与服务端的数据交互接口
- **src/store/**: 应用状态管理
- **src/styles/**: 样式文件
- **src/app.config.ts**: app配置文件
- **src/app.tsx**: 页面入口
- **src/.env.development**: 开发环境变量
- **src/.env.production**: 生产环境变量
- **src/.env.test**: 测试环境变量

