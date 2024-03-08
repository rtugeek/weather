import { Widget, WidgetKeyword } from '@widget-js/core'

const name = 'cn.widgetjs.widget.weather.weather'
// 组件标题
const title = { 'zh-CN': '天气组件' }
// 组件描述
const description = { 'zh-CN': '' }
// 组件关键词
const keywords = [WidgetKeyword.RECOMMEND]
// 组件路由地址
const path = '/widget/weather'
// 配置页路由地址
const configPagePath = '/widget/config/weather'
// 组件关键词
const WeatherWidget = new Widget({
  name,
  title,
  description,
  keywords,
  lang: 'zh-CN',
  width: 4,
  height: 4,
  minWidth: 2,
  maxWidth: 4,
  minHeight: 2,
  maxHeight: 2,
  previewImage: '修改为组件预览图地址',
  path,
  configPagePath,
})

export default WeatherWidget
