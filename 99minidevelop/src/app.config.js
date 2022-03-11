export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/list/index',
    'pages/detail/index',
    'pages/my/index',
    'pages/about/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#cdcdcd',
    selectedColor: '#333333',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/images/icon_home.png',
        selectedIconPath: './assets/images/icon_home_chk.png',
      },
      {
        pagePath: 'pages/list/index',
        text: '发现',
        iconPath: './assets/images/icon_list.png',
        selectedIconPath: './assets/images/icon_list_chk.png',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './assets/images/icon_my.png',
        selectedIconPath: './assets/images/icon_my_chk.png',
      }
    ]
  }
})
