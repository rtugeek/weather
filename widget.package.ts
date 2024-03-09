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
  version: '1.0.0',
  remote: {
    entry: 'https://rtugeek.gitee.io/weather',
    hash: true,
    base: '/weather',
  },
  remoteEntry: 'https://rtugeek.gitee.io/weather',
  remotePackage: 'https://rtugeek.gitee.io/weather/widget.json',
  devOptions: {
    folder: './src/widgets/',
    devUrl: 'http://localhost:5174',
  },
})
