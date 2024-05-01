import { WidgetPackage } from '@widget-js/core'

export default new WidgetPackage({
  author: 'Neo Fu',
  description: {
    'zh-CN': '天气组件包',
  },
  entry: '/',
  hash: true,
  homepage: '',
  name: 'cn.widgetjs.widget.weather',
  title: {
    'zh-CN': '天气组件包',
  },
  remote: {
    entry: 'https://widgetjs.cn/weather',
    hash: true,
    base: '/weather',
    hostname: 'widgetjs.cn',
  },
  remoteEntry: 'https://widgetjs.cn/weather',
  remotePackage: 'https://widgetjs.cn/weather/widget.json',
  devOptions: {
    folder: './src/widgets/',
    devUrl: 'http://localhost:5174',
  },
})
