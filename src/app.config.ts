export default defineAppConfig({
  tabBar: {
    color: '#333',
    selectedColor: '#27ba9b',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        text: '首页',
        pagePath: 'pages/index/index',
        iconPath: 'static/tabs/home_default.png',
        selectedIconPath: 'static/tabs/home_selected.png',
      },
      {
        text: '分类',
        pagePath: 'pages/category/index',
        iconPath: 'static/tabs/category_default.png',
        selectedIconPath: 'static/tabs/category_selected.png',
      },
      {
        text: '购物车',
        pagePath: 'pages/cart/index',
        iconPath: 'static/tabs/cart_default.png',
        selectedIconPath: 'static/tabs/cart_selected.png',
      },
      {
        text: '我的',
        pagePath: 'pages/my/index',
        iconPath: 'static/tabs/user_default.png',
        selectedIconPath: 'static/tabs/user_selected.png',
      },
    ],
  },
  pages: ['pages/index/index', 'pages/my/index', 'pages/cart/index', 'pages/category/index', 'pages/login/index'],
  subPackages: [
    {
      root: 'pagesMember',
      pages: ['settings/index', 'profile/index'],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
