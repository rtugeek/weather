import type { RouteRecordRaw } from 'vue-router'
import WeatherLargeWidget from './WeatherLarge.widget'

const path = WeatherLargeWidget.path
const name = WeatherLargeWidget.name

const WeatherLargeWidgetRoutes: RouteRecordRaw[] = [
  {
    path,
    name: `${name}`,
    component: () =>
      import(
        /* webpackChunkName: "cn.widgetjs.widget.weather.weather_large" */ './WeatherLargeWidgetView.vue'
      ),
  },
]

export default WeatherLargeWidgetRoutes
