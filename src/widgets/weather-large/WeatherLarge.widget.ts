import { Widget, WidgetKeyword } from '@widget-js/core'

// 组件关键词
const WeatherLargeWidget = new Widget({
  name: 'cn.widgetjs.widget.weather.large',
  title: { 'zh-CN': '和风天气组件' },
  description: { 'zh-CN': '显示最近3天气情况' },
  keywords: [WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  width: 4,
  height: 4,
  minWidth: 4,
  maxWidth: 4,
  minHeight: 4,
  categories: ['weather'],
  maxHeight: 4,
  previewImage: '/preview_large.png',
  path: '/widget/large',
  configPagePath: '/widget/config/small?transparent=false&frame=true',
})

export default WeatherLargeWidget
