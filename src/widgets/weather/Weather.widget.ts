import { Widget, WidgetKeyword } from '@widget-js/core'

// 组件关键词
const WeatherWidget = new Widget({
  name: 'cn.widgetjs.widget.weather.small',
  title: { 'zh-CN': '天气组件' },
  description: { 'zh-CN': '显示最近一小时天气情况' },
  keywords: [WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  width: 2,
  height: 2,
  minWidth: 2,
  maxWidth: 2,
  minHeight: 2,
  maxHeight: 2,
  previewImage: '/preview_small.png',
  path: '/widget/small',
  configPagePath: '/widget/config/small',
})

export default WeatherWidget
