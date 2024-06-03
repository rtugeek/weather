import { Widget, WidgetKeyword } from '@widget-js/core'

// 组件关键词
const WeatherMediumWidget = new Widget({
  name: 'cn.widgetjs.widget.weather.medium',
  title: { 'zh-CN': '和风天气组件' },
  description: { 'zh-CN': '显示最近1小时天气情况' },
  keywords: [WidgetKeyword.RECOMMEND],
  lang: 'zh-CN',
  width: 4,
  height: 2,
  categories: ['weather'],
  resizable: false,
  previewImage: '/preview_medium.png',
  path: '/widget/medium',
  configPagePath: '/widget/config/small',
})

export default WeatherMediumWidget
