import type { RouteRecordRaw } from 'vue-router'
import WeatherWidget from './Weather.widget'

const path = WeatherWidget.path
const name = WeatherWidget.name

const configPagePath = WeatherWidget.configPagePath!.split('?')[0]

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
