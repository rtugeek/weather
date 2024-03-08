import type { RouteRecordRaw } from 'vue-router'
import WeatherWidgetDefine from './Weather.widget'

const path = WeatherWidgetDefine.path
const name = WeatherWidgetDefine.name

const configPagePath = WeatherWidgetDefine.configPagePath!

const WeatherWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "cn.widgetjs.widget.weather.weather" */ './WeatherWidgetView.vue'
      ),
  },
  {
    path: configPagePath,
    name: `${name}.config`,
    component: () =>
      import(
        /* webpackChunkName: "cn.widgetjs.widget.weather.weather.config" */ './WeatherConfigView.vue'
      ),
  },
]

export default WeatherWidgetRoutes
