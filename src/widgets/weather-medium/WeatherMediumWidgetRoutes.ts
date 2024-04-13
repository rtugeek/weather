import type { RouteRecordRaw } from 'vue-router'
import WeatherMediumWidget from './WeatherMedium.widget'

const path = WeatherMediumWidget.path
const name = WeatherMediumWidget.name

const WeatherMediumWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "cn.widgetjs.widget.weather.weather_medium" */ './WeatherMediumWidgetView.vue'
      ),
  },
  {
    path: WeatherMediumWidget.configPagePath!,
    name: `${name}.config`,
    component: () =>
      import(
        /* webpackChunkName: "cn.widgetjs.widget.weather.weather_medium.config" */ '../weather/WeatherConfigView.vue'
      ),
  },
]

export default WeatherMediumWidgetRoutes
