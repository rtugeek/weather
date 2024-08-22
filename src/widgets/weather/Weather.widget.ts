import { Widget, WidgetKeyword } from '@widget-js/core'

// 组件关键词
const WeatherWidget = new Widget({
  name: 'cn.widgetjs.widget.weather.small',
  title: { 'zh-CN': '天气组件' },
  description: { 'zh-CN': '显示最近1小时天气情况' },
  keywords: [WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  width: 2,
  height: 2,
  resizable: false,
  previewImage: '/preview_small.png',
  path: '/widget/small',
  categories: ['weather'],
  configPagePath: '/widget/config/small?transparent=false&frame=true',
})

export default WeatherWidget
